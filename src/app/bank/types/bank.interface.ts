import { IBaseSchema } from '../../../utils/types/schema.interface';

export interface IBank {
  id: number;
  name: string;
  slug: string;
  longCode: string;
  code: string;
  gateway: string;
  type: string;
}

export type IQueryBank = Partial<IBank> & Partial<IBaseSchema>;
