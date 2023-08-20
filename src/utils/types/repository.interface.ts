import { ObjectId } from 'mongodb';
import { IQueryFilter, IQueryPaginate } from './filter.interface';

export interface IBaseRepository<T> {
  // find(query?: Record<string, unknown>): Promise<T[]>;
  find(query?: IQueryFilter<T>): Promise<T[]>;

  paginate(query: IQueryPaginate<T>): Promise<T[]>;

  create(payload: Partial<T>): Promise<T>;

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
