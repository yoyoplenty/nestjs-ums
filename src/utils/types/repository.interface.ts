import { ObjectId } from 'mongodb';
import { IQueryFilter, IQueryPaginate } from './filter.interface';

export interface IBaseRepository<T> {
  create(payload: Partial<T>): Promise<T>;

  find(query?: IQueryFilter<T> | unknown): Promise<T[]>;

  paginate(query: IQueryPaginate<T> | unknown): Promise<T[]>;

  aggregate(query: Array<any> | unknown): Promise<T[]>;

  findById(id: ObjectId): Promise<T>;

  findOne(query: IQueryFilter<T>): Promise<T>;

  updateOne(
    query: Record<string, unknown>,
    payload: Partial<T>,
    projection?: Record<string, unknown>,
  ): Promise<unknown>;

  updateById(id: ObjectId, payload: Partial<T>): Promise<T>;

  deleteOne(query?: Record<string, unknown>): Promise<unknown>;

  deleteById(id: ObjectId): Promise<unknown>;
}
