import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBank } from '../types/bank.interface';

export type BankDocument = HydratedDocument<Bank>;

@Schema({ collection: 'banks', versionKey: false, timestamps: true })
export class Bank implements IBank {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  longCode: string;

  @Prop()
  code: string;

  @Prop()
  gateway: string;

  @Prop()
  type: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
