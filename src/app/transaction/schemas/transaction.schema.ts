import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITransaction } from '../types/transaction.interface';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ collection: 'transactions', versionKey: false, timestamps: true })
export class Transaction implements ITransaction {
  @Prop()
  gatewayId: number;

  @Prop()
  storeId: string;

  @Prop()
  vendorId: string;

  @Prop()
  domain: string;

  @Prop()
  status: string;

  @Prop()
  reference: string;

  @Prop()
  amount: number;

  @Prop()
  gatewayResponse: string;

  @Prop()
  paidAt: string;

  @Prop()
  currency: string;

  @Prop()
  type: string;

  @Prop()
  description: string;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
