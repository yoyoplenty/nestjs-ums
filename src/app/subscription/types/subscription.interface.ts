import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface ISubscription {
  planId: string;
  vendorId: string;
  from: Date;
  to: Date;
  type: string;
  status: string;
  transactionId?: string;
  card?: Record<string, any>;
  meta?: Record<string, any>;
}

export type IQuerySubscription = Partial<ISubscription> & Partial<IBaseSchema>;
