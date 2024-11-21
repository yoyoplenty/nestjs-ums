import { listAllCustomers } from 'src/services/aws/cognito';

export const isValidObjectId = (value: string): boolean => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(value);
};

export function convertToUserObject(userAttributes: any[]): Record<string, any> {
  const userObject: Record<string, string> = {};

  userAttributes.forEach((attribute) => {
    userObject[attribute.Name] = attribute.Value;
  });

  return userObject;
}

export function convertUserToTokenObject(userObject: Record<string, any>): any {
  const user: any = {
    userId: userObject.id,
    type: userObject['custom:type'],
    storeId: userObject['custom:storeId'] || userObject['custom:store_id'],
    email: userObject.email,
    firstName: userObject.given_name,
    lastName: userObject.family_name,
    telephone: userObject.phone_number,
    address: userObject.address,
    bio: userObject.profile,
    verified: userObject.email_verified,
    verifiedAt: userObject.verifiedAt,
    fbAccessToken: userObject['custom:fbToken'],
    instagram: userObject['custom:instagram'],
    whatsapp: userObject['custom:whatsapp'],
  };

  return user;
}

export const filterUsers = (users: any[], filter?: Record<string, any>) => {
  if (!filter) {
    return users;
  }

  let filteredUsers = users;

  if (filter) {
    filteredUsers = filteredUsers.filter((user) => {
      return Object.entries(filter).every(([key, value]) => {
        if (key === 'search' && value) {
          const normalizedSearchTerm = value.toLowerCase();

          return Object.values(user).some((fieldValue: any) => {
            if (typeof fieldValue === 'string') {
              return fieldValue.toLowerCase().includes(normalizedSearchTerm);
            }

            return false;
          });
        } else if (value && typeof value === 'string' && user[key] && typeof user[key] === 'string') {
          const regex = new RegExp(value, 'i');

          return regex.test(user[key]);
        } else {
          return user[key] === value;
        }
      });
    });
  }

  return filteredUsers;
};

export const meta = {
  createdAt: new Date(),
  active: true,
  activatedAt: new Date(),
  deactivatedAt: null,
  updatedAt: null,
};

export function convertCustomerToTokenObject(userObject: Record<string, any>): any {
  const user: any = {
    userId: userObject.id,
    type: userObject['custom:type'],
    email: userObject.email,
    firstName: userObject.given_name,
    lastName: userObject.family_name,
    telephone: userObject.phone_number,
    address: userObject.address,
    bio: userObject.profile,
    verified: userObject.email_verified,
    verifiedAt: userObject.verifiedAt,
    fbAccessToken: userObject['custom:fbToken'],
    instagram: userObject['custom:instagram'],
    whatsapp: userObject['custom:whatsapp'],
    facebook: userObject['custom:facebook'],
  };

  return user;
}

export const buildCognitoFilter = (filter: Record<string, any> = {}): string => {
  if (filter.email) return `email = "${filter.email}"`;
  if (filter.firstName) return `given_name = "${filter.firstName}"`;
  if (filter.lastName) return `family_name = "${filter.lastName}"`;
  if (filter.search) return `email ^= "${filter.search}"`;
  if (filter?.storeId) return `name = "${filter.storeId}"`;
  if (filter?.activeStoreId) return `name = "${filter.activeStoreId}"`;
  if (filter?.userId) return `sub = "${filter.userId}"`;

  return '';
};

export const buildSearchFilter = (filter: Record<string, any> = {}): string[] => {
  const filters: string[] = [];

  if (filter.email) filters.push(`email = "${filter.email}"`);
  if (filter.firstName) filters.push(`given_name = "${filter.firstName}"`);
  if (filter.lastName) filters.push(`family_name = "${filter.lastName}"`);
  if (filter?.storeId) filters.push(`name = "${filter.storeId}"`);
  if (filter?.activeStoreId) filters.push(`name = "${filter.activeStoreId}"`);
  if (filter?.userId) filters.push(`sub = "${filter.userId}"`);

  if (filter.search) {
    filters.push(`email ^= "${filter.search}"`);
    filters.push(`given_name ^= "${filter.search}"`);
    filters.push(`family_name ^= "${filter.search}"`);
  }

  return filters;
};

export const fetchAllCustomersWithPagination = async (filterKey?: string, filterValue?: string) => {
  const allCustomers = [];
  let paginationToken = '';
  let lastToken = '';

  do {
    const { allUsersObject, nextToken } = await listAllCustomers({
      filter: filterKey && filterValue ? buildCognitoFilter({ [filterKey]: filterValue }) : '',
      limit: 60,
      paginationToken,
    });

    allCustomers.push(...allUsersObject);
    lastToken = nextToken;
    paginationToken = nextToken;
  } while (paginationToken);

  return { allCustomers, lastToken };
};

export const getUniqueCustomers = (users: any[]) => {
  return [...new Map(users.map((item) => [item.Username, item])).values()];
};

export const intersectResults = (arrays: any[][]) => {
  if (arrays.length === 0) return [];

  return arrays.reduce((acc, array) => {
    return acc.filter((item) => array.some((other) => other.Username === item.Username));
  });
};

export const filterAndIntersectCustomers = (
  customersPerFilter: Record<string, any[]>,
  filters: string[],
  filter?: Record<string, any>,
) => {
  const isSearch = filters.some((f) => f.includes('^='));

  console.log(isSearch);

  let uniqueCustomers;

  if (isSearch) {
    uniqueCustomers = getUniqueCustomers(Object.values(customersPerFilter).flat());

    if (filter?.storeId) {
      uniqueCustomers = uniqueCustomers.filter(
        (customer) => customer.Attributes.find((attr) => attr.Name === 'name')?.Value === filter.storeId,
      );
    }
  } else {
    uniqueCustomers =
      filters.length > 0
        ? intersectResults(Object.values(customersPerFilter))
        : getUniqueCustomers(customersPerFilter.default);
  }

  return uniqueCustomers;
};

export function generateRandomPassword(length: number = 10): string {
  if (length < 4) throw new Error('Password length must be at least 4 to include all character types.');

  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + symbols;

  const randomUpperCase = upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
  const randomLowerCase = lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

  let password = randomUpperCase + randomLowerCase + randomNumber + randomSymbol;

  for (let i = 4; i < length; i++) {
    const randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
    password += randomCharacter;
  }

  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
}
