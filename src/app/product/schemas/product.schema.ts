import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProduct } from '../types/product.interface';
import { ObjectId } from 'mongodb';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'products', versionKey: false, timestamps: true })
export class Product implements IProduct {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: any;

  @Prop()
  vendorId: string; // Assuming ObjectID is represented as a string

  @Prop()
  name: string;

  @Prop({ type: [SchemaTypes.Mixed], required: false })
  images?: Record<string, any>[];

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

  @Prop({ type: [SchemaTypes.Mixed], required: false })
  reviews?: Record<string, any>[];

  @Prop({ type: [SchemaTypes.Mixed], required: false })
  tags: Record<string, any>[];

  @Prop({ type: [SchemaTypes.Mixed], required: false })
  properties?: Record<string, any>[];

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
