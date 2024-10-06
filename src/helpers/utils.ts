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
