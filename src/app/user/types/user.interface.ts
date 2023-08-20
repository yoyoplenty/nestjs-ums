import { ROLE } from './../../../enums/role.enum';

export interface IUser {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  role: ROLE;
}

export type IQueryUser = Partial<IUser>;
