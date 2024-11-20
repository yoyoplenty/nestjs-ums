import { ObjectId } from 'mongodb';
import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface INewCustomer {
  origin: string; // Optional field
  customerId: string; // Required field
  storeId: ObjectId; // Required field
  meta?: any; // Optional field
}

export type IQueryNewCustomer = Partial<INewCustomer> & Partial<IBaseSchema>;
