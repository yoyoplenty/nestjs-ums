import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INewTransaction } from '../types/new-transaction.interface';

export type NewTransactionDocument = HydratedDocument<NewTransaction>;

@Schema({ collection: 'transactions', versionKey: false, timestamps: false })
export class NewTransaction implements INewTransaction {
  @Prop()
  gatewayId: number;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: any;

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

export const NewTransactionSchema = SchemaFactory.createForClass(NewTransaction);
