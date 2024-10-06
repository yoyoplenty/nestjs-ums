import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IStoreVendor {
  vendorId: string;
  storeId: string;
  role: string;
  meta: Record<string, any>;
}

export type IQueryStoreVendor = Partial<IStoreVendor> & Partial<IBaseSchema>;
