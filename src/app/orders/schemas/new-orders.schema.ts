import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export type NewOrderDocument = HydratedDocument<NewOrder>;

@Schema({ collection: 'orders', versionKey: false, timestamps: false })
export class NewOrder {
  @Prop({ type: String, required: true })
  orderNo: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: false })
  salesChannels: string;

  @Prop({ type: String, enum: ['INCOMING', 'ACCEPTED', 'PROCESSED', 'COMPLETED'], required: true })
  status: string;

  @Prop({ type: String, required: false, default: 'PAID' })
  paymentStatus: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeCustomerId: ObjectId;

  @Prop({ type: SchemaTypes.Mixed, required: true })
  products: any;

  @Prop({ type: String, default: null })
  note: string;

  @Prop({ type: Number, default: null })
  amountPaid: number | null;

  @Prop({ type: String, default: null })
  couponCode: string | null;

  @Prop({ type: [String], default: [] })
  discountIds: string[];

  @Prop({ type: Number, default: null })
  shippingFee: number | null;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewOrderSchema = SchemaFactory.createForClass(NewOrder);
