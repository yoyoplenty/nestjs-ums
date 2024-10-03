import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProductImage } from '../types/product-image.interface';

export type ProductImageDocument = HydratedDocument<ProductImage>;

@Schema({ collection: 'productImages', versionKey: false, timestamps: true })
export class ProductImage implements IProductImage {
  @Prop()
  storeId: string;

  @Prop()
  productId: string;

  @Prop()
  src: string;

  @Prop()
  width?: number;

  @Prop()
  height?: number;

  @Prop()
  position?: number;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);