import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IStore {
  name: string;
  tagline: string;
  businessType: string; //HAS CHANGED
  color: string;
  theme: string; //HAS CHANGED
  domain: string;
  favicon: string;
  logo: string;
  referralCode: string;
  aboutUs: string;
  privacyPolicy: string;
  termsAndConditions: string;
  socialMedia: any;
  counters: any;
  meta: any;
}

export type IQueryStore = Partial<IStore> & Partial<IBaseSchema>;
