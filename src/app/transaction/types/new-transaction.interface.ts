import { ObjectId } from 'mongodb';
import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface INewTransaction {
  gatewayId: number;
  storeId: ObjectId;
  vendorId: string;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  source: string;
  gatewayResponse: string;
  paidAt: string;
  currency: string;
  type: string;
  description: string;
}

export type IQueryNewTransaction = Partial<INewTransaction> & Partial<IBaseSchema>;
