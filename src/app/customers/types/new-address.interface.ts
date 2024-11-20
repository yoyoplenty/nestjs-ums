import { ObjectId } from 'mongodb';
import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface INewAddress {
  storeId: ObjectId; // Required field
  storeCustomerId: ObjectId;
  address: string; // Required field
  city: string; // Required field
  state: string; // Required field
  country: string; // Required field
  phone: string; // Required field
  postalCode: string; // Required field
  userType: string; // Required field
  shippingMethod: any; // Required field
  regionGroup: any; // Required field
  meta?: any; // Optional field
}

export type IQueryNewAddress = Partial<INewAddress> & Partial<IBaseSchema>;
