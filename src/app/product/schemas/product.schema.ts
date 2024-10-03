import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProduct } from '../types/product.interface';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'products', versionKey: false, timestamps: true })
export class Product implements IProduct {
  @Prop()
  storeId: string; // Assuming ObjectID is represented as a string

  @Prop()
  vendorId: string; // Assuming ObjectID is represented as a string

  @Prop()
  name: string;

  @Prop()
  images?: any; // Optional array of ProductImage

  @Prop()
  price: number;

  @Prop()
  description?: string; // Optional field

  @Prop()
  shortId?: string; // Optional field

  @Prop()
  discount?: number; // Optional field (percentage discount)

  @Prop()
  quantity?: number; // Optional field

  @Prop()
  weight?: string; // Optional field

  @Prop()
  outOfStock?: boolean; // Optional field

  @Prop()
  reviews?: any; // Optional array of reviews

  @Prop()
  meta?: any; // Optional field

  @Prop()
  tags?: any; // Optional array of tags

  @Prop()
  properties?: any;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
