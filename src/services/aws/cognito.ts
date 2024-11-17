import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  ListUsersCommand,
  AdminUpdateUserAttributesCommand,
  AdminCreateUserCommand,
  AdminInitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

import { convertToUserObject, convertUserToTokenObject, filterUsers } from '../../helpers/utils';
import { config } from 'src/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwkToPem = require('jwk-to-pem');

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 *
 * USER (VENDOR)
 */

const listAllUsers = async () => {
  const params = {
    UserPoolId: config.aws.userPoolId,
  };

  const command = new ListUsersCommand(params);
  const { Users: allUsersObject } = await cognitoIdentityServiceProvider.send(command);

  return allUsersObject;
};

export const getAllUsers = async (filter?: Record<string, any>) => {
  try {
    const allUsersObject = await listAllUsers();

    const modifiedUsers = allUsersObject.map((user) => {
      const modifiedUser = {
        ...convertToUserObject(user.Attributes),
        id: user.Username,
        verifiedAt: user.UserLastModifiedDate,
      };

      return convertUserToTokenObject(modifiedUser);
    });

    const users = filter ? filterUsers(modifiedUsers, filter) : modifiedUsers;

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (userSubId: string) => {
  const params = {
    UserPoolId: config.aws.userPoolId,
    Username: userSubId,
  };

  try {
    const command = new AdminGetUserCommand(params);
    const data = await cognitoIdentityServiceProvider.send(command);

    const userObject = convertToUserObject(data.UserAttributes);

    userObject.id = data.Username;
    userObject.verifiedAt = data.UserLastModifiedDate;

    const user = convertUserToTokenObject(userObject);

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userSubId: string, key: string, value: string) => {
  const input = {
    UserPoolId: config.aws.userPoolId,
    Username: userSubId,
    ClientMetadata: { string: 'string' },
    UserAttributes: [
      {
        Name: key,
        Value: value,
      },
    ],
  };

  try {
    const command = new AdminUpdateUserAttributesCommand(input);
    const data = await cognitoIdentityServiceProvider.send(command);

    return data;
  } catch (error) {
    throw error;
  }
};

export const validateUserCredentials = async (username: string, password: string): Promise<any> => {
  const input = {
    AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
    ClientId: config.aws.appClientId,
    UserPoolId: config.aws.userPoolId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const command = new AdminInitiateAuthCommand(input);

    const data = await cognitoIdentityServiceProvider.send(command);

    return data;
  } catch (error) {
    return false;
  }
};

export const verifyCognitoToken = async (token: string): Promise<any> => {
  const cognitoIssuer = `https://cognito-idp.${config.aws.region}.amazonaws.com/${config.aws.userPoolId}`;
  const keysUrl = `${cognitoIssuer}/.well-known/jwks.json`;

  try {
    const { data } = await axios.get(keysUrl);
    const keys = data.keys;

    const decodedToken: any = jwt.decode(token, { complete: true });
    const kid = decodedToken.header.kid;

    const keyIndex = keys.findIndex((key) => key.kid === kid);
    const jwk = keys[keyIndex];

    const pem = jwkToPem(jwk);

    const jwtUser = jwt.verify(token, pem, { algorithms: ['RS256'] });
    const user = await getUserById(jwtUser.username);

    return user;
  } catch (error) {
    console.log(error);
    throw new Error(`Invalid token provided: ${error.message}`);
  }
};

/**
 * USER (VENDOR)
 */

export const createVendor = async ({ email, firstName, lastName }) => {
  const input = {
    UserPoolId: config.aws.userPoolId,
    Username: email,
    TemporaryPassword: 'Password@123',
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'true' },
      { Name: 'family_name', Value: lastName },
      { Name: 'given_name', Value: firstName },
      { Name: 'custom:type', Value: 'vendor' },
    ],
  };

  try {
    const {
      User: { Username },
    } = await cognitoIdentityServiceProvider.send(new AdminCreateUserCommand(input));

    return {
      username: Username,
      userId: Username,
      email,
      firstName,
      lastName,
    };
  } catch (error) {
    throw error;
  }
};
