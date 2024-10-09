import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INewProduct } from '../types/new-product.interface';

export type NewProductDocument = HydratedDocument<NewProduct>;

@Schema({ collection: 'products', versionKey: false, timestamps: false })
export class NewProduct implements INewProduct {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: any;

  @Prop()
  vendorId: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description?: string;

  @Prop()
  shortId?: string;

  @Prop()
  quantity?: number;

  @Prop()
  outOfStock?: boolean;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewProductSchema = SchemaFactory.createForClass(NewProduct);
