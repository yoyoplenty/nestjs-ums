import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IStore {
  name: string;
  tagline: string;
  businessType: string;
  color: string;
  theme: string;
  domain: string;
  favicon: string;
  logo: string;
  referralCode: string;
  aboutUs: string;
  privacyPolicy: string;
  termsAndConditions: string;
  socialMedia: Record<string, any>;
  counters: Record<string, any>;
  meta: Record<string, any>;
}

export type IQueryStore = Partial<IStore> & Partial<IBaseSchema>;
