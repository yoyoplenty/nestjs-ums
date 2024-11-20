import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INewAddress } from '../types/new-address.interface';
import { ObjectId } from 'mongodb';

export type NewAddressDocument = HydratedDocument<NewAddress>;

@Schema({ collection: 'addresses', versionKey: false, timestamps: false })
export class NewAddress implements INewAddress {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: ObjectId; // Required field

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeCustomerId: ObjectId; // Required field

  @Prop()
  address: string; // Optional field

  @Prop()
  city: string; // Required field

  @Prop()
  state: string; // Optional field

  @Prop()
  country: string; // Required field

  @Prop()
  phone: string; // Optional field

  @Prop()
  postalCode: string; // Required field

  @Prop()
  userType: string; // Optional field

  @Prop()
  regionGroup: string; // Required field

  @Prop({ type: SchemaTypes.Mixed, required: false })
  shippingMethod: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewAddressSchema = SchemaFactory.createForClass(NewAddress);
