import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITransaction } from '../types/transaction.interface';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ collection: 'transactions', versionKey: false, timestamps: true })
export class Transaction implements ITransaction {
  @Prop()
  name: string;

  @Prop()
  tagline: string;

  @Prop()
  businessType: string;

  @Prop()
  color: string;

  @Prop()
  theme: string;

  @Prop()
  domain: string;

  @Prop()
  favicon: String;

  @Prop()
  logo: String;

  @Prop()
  referralCode: String;

  @Prop()
  aboutUs: String;

  @Prop()
  privacyPolicy: String;

  @Prop()
  termsAndConditions: String;

  @Prop()
  socialMedia: any;

  @Prop()
  counters: any;

  @Prop()
  meta: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
