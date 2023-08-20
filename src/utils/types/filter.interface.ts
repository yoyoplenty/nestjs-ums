export interface IPaginate {
  offset: number;
  limit: number;
  order?: number;
}

export type IQueryFilter<T> = Partial<T>;

export type IQueryPaginate<T> = IQueryFilter<T> & Partial<IPaginate>;
