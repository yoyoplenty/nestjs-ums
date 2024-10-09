import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IStore } from '../types/store.interface';
import { ObjectId } from 'mongodb';

export type StoreDocument = HydratedDocument<Store>;

@Schema({ collection: 'stores', versionKey: false, timestamps: true })
export class Store implements IStore {
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
  favicon: string;

  @Prop()
  logo: string;

  @Prop()
  referralCode: string;

  @Prop()
  aboutUs: string;

  @Prop()
  privacyPolicy: string;

  @Prop()
  termsAndConditions: string;

  @Prop({ type: SchemaTypes.ObjectId, required: false })
  oldId?: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  categoryId?: ObjectId;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  socialMedia: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  counters: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
