import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IOrder {
  orderNo: string; // Required field
  amount: number; // Required field
  transactionId?: string; // Optional field
  transactionRef?: string; // Optional field
  customerId: string; // Required field
  storeId: string; // Required field
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

export type IQueryOrder = Partial<IOrder> & Partial<IBaseSchema>;
