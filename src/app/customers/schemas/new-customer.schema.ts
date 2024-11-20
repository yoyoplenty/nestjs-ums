import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INewCustomer } from '../types/new-customer.interface';
import { ObjectId } from 'mongodb';

export type NewCustomerDocument = HydratedDocument<NewCustomer>;

@Schema({ collection: 'storeCustomers', versionKey: false, timestamps: false })
export class NewCustomer implements INewCustomer {
  @Prop()
  origin: string; // Optional field

  @Prop()
  customerId: string; // Required field

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: ObjectId; // Required field

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewCustomerSchema = SchemaFactory.createForClass(NewCustomer);
