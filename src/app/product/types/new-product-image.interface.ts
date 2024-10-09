import { ObjectId } from 'mongoose';
import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface INewProductImage {
  storeId: ObjectId;
  productId: ObjectId;
  src: string;
  type: string;
  width?: number;
  height?: number;
  position?: number;
}

export type IQueryNewProductImage = Partial<INewProductImage> & Partial<IBaseSchema>;
