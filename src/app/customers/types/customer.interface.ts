import { ObjectId } from 'mongodb';
import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface ICustomer {
  _id?: ObjectId;
  storeId: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  telephone: string;
  gender: string;
  dob: string;
  address: string;
}

export type IQueryCustomer = Partial<ICustomer> & Partial<IBaseSchema>;
