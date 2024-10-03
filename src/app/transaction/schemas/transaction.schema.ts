import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITransaction } from '../types/transaction.interface';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ collection: 'transactions', versionKey: false, timestamps: true })
export class Transaction implements ITransaction {
  @Prop()
  gatewayId: number; // Required field

  @Prop()
  storeId: string; // Required field

  @Prop()
  vendorId: string; // Assuming ObjectID is represented as a string

  @Prop()
  domain: string; // Required field

  @Prop()
  status: string; // Required field

  @Prop()
  reference: string; // Required field

  @Prop()
  amount: number; // Required field

  @Prop()
  gatewayResponse: string; // Required field

  @Prop()
  paidAt: string; // Required field (assuming it's a string timestamp)

  @Prop()
  currency: string; // Required field

  @Prop()
  type: string; // Required field

  @Prop()
  description: string; // Required field

  @Prop()
  meta?: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
