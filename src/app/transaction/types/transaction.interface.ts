import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface ITransaction {
  gatewayId: number; // Required field
  storeId: string; // Required field
  vendorId: string; // Assuming ObjectID is represented as a string
  domain: string; // Required field
  status: string; // Required field
  reference: string; // Required field
  amount: number; // Required field
  gatewayResponse: string; // Required field
  paidAt: string; // Required field (assuming it's a string timestamp)
  currency: string; // Required field
  type: string; // Required field
  description: string; // Required field
}

export type IQueryTransaction = Partial<ITransaction> & Partial<IBaseSchema>;
