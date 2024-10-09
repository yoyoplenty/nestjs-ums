import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INewOrder } from '../types/new-order.interface';

export type NewOrderDocument = HydratedDocument<NewOrder>;

@Schema({ collection: 'orders', versionKey: false, timestamps: true })
export class NewOrder implements INewOrder {
  @Prop()
  orderNo: string; // Required field

  @Prop()
  amount: number; // Required field

  @Prop()
  transactionId?: string; // Optional field

  @Prop()
  transactionRef?: string; // Optional field

  @Prop()
  customerId: string; // Required field

  @Prop()
  storeId: string; // Required field

  @Prop()
  addressId: string; // Required field

  @Prop()
  paymentMethod?: string; // Optional field

  @Prop()
  couponCode?: string; // Optional field

  @Prop()
  status: string; // Required field

  @Prop()
  note?: string; // Optional field

  @Prop()
  paid: boolean; // Required field

  @Prop()
  invoiceUrl?: string; // Optional field

  @Prop()
  receiptUrl?: string;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  products?: Record<string, string>; // Optional field

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewOrderSchema = SchemaFactory.createForClass(NewOrder);
