import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface ITransaction {
  name: string;
  tagline: string;
  businessType: string; //HAS CHANGED
  color: string;
  theme: string; //HAS CHANGED
  domain: string;
  favicon: String;
  logo: String;
  referralCode: String;
  aboutUs: String;
  privacyPolicy: String;
  termsAndConditions: String;
  socialMedia: any;
  counters: any;
  meta: any;
}

export type IQueryTransaction = Partial<ITransaction> & Partial<IBaseSchema>;
