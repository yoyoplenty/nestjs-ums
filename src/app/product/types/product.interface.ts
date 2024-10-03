import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IProduct {
  storeId: string; // Assuming ObjectID is represented as a string
  vendorId: string; // Assuming ObjectID is represented as a string
  name: string;
  images?: any; // Optional array of ProductImage
  price: number;
  description?: string; // Optional field
  shortId?: string; // Optional field
  discount?: number; // Optional field (percentage discount)
  quantity?: number; // Optional field
  weight?: string; // Optional field
  outOfStock?: boolean; // Optional field
  reviews?: any; // Optional array of reviews
  meta?: any; // Optional field
  tags?: any; // Optional array of tags
  properties?: any;
}

export type IQueryProduct = Partial<IProduct> & Partial<IBaseSchema>;
