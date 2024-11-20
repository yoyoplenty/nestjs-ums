import { ObjectId } from 'mongodb';
import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface INewOrder {
  orderNo: string; // Required field
  amount: number; // Required field
  transactionId?: string; // Optional field
  transactionRef?: string; // Optional field
  storeCustomerId: ObjectId; // Required field
  storeId: ObjectId; // Required field
  addressId: string; // Required field
  paymentMethod?: string; // Optional field
  products?: Record<string, string>; // Optional field
  couponCode?: string; // Optional field
  status: string; // Required field
  note?: string; // Optional field
  paid: boolean; // Required field
  meta?: any; // Optional field
  invoiceUrl?: string; // Optional field
  receiptUrl?: string;
}

export type IQueryNewOrder = Partial<INewOrder> & Partial<IBaseSchema>;
