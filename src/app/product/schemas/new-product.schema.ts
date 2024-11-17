import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INewProduct } from '../types/new-product.interface';
import { ObjectId } from 'mongodb';

export type NewProductDocument = HydratedDocument<NewProduct>;

@Schema({ collection: 'products', versionKey: false, timestamps: false })
export class NewProduct implements INewProduct {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: any;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  categoryId: any;

  @Prop()
  vendorId: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  brand?: string;

  @Prop()
  description?: string;

  @Prop()
  shortId?: string;

  @Prop()
  quantity?: number;

  @Prop()
  outOfStock?: boolean;

  @Prop()
  isDraft?: boolean;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  variants: ObjectId[];

  @Prop({ type: SchemaTypes.Mixed, required: false })
  collectionIds: ObjectId[];

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewProductSchema = SchemaFactory.createForClass(NewProduct);
