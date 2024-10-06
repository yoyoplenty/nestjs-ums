import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IPlan {
  name: string;
  slug: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
}

export type IQueryPlan = Partial<IPlan> & Partial<IBaseSchema>;
