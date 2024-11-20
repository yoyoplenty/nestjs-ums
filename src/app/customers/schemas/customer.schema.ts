import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICustomer } from '../types/customer.interface';
import { ObjectId } from 'mongodb';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ collection: 'customers', versionKey: false, timestamps: true })
export class Customer implements ICustomer {
  @Prop()
  storeId: ObjectId; // Required field

  @Prop()
  email: string; // Required field

  @Prop()
  firstName: string; // Optional field

  @Prop()
  lastName: string; // Optional field

  @Prop()
  middleName: string; // Required field

  @Prop()
  telephone: string; // Optional field

  @Prop()
  gender: string; // Optional field

  @Prop()
  dob: string;

  @Prop()
  address: string; // Optional field

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
