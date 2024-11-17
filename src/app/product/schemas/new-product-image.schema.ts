import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INewProductImage } from '../types/new-product-image.interface';

export type NewProductImageDocument = HydratedDocument<NewProductImage>;

@Schema({ collection: 'productImages', versionKey: false, timestamps: false })
export class NewProductImage implements INewProductImage {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: any;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  productId: any;

  @Prop()
  type: string;

  @Prop()
  src: string;

  @Prop()
  width?: number;

  @Prop()
  height?: number;

  @Prop()
  position?: number;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewProductImageSchema = SchemaFactory.createForClass(NewProductImage);
