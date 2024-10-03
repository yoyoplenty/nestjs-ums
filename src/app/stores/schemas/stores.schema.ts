import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IStore } from '../types/store.interface';

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

  @Prop()
  socialMedia: any;

  @Prop()
  counters: any;

  @Prop()
  meta: any;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
