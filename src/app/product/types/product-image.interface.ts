import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IProductImage {
  storeId: string;
  productId: string;
  src: string;
  width?: number;
  height?: number;
  position?: number;
}

export type IQueryProductImage = Partial<IProductImage> & Partial<IBaseSchema>;
