import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IBaseRepository } from './../utils/types/repository.interface';
import { IQueryFilter, IQueryPaginate } from 'src/utils/types/filter.interface';

export class BaseRepository<T> implements IBaseRepository<T> {
  repository: Model<T>;

  constructor(repository: Model<T, Record<string, never>, Record<string, never>>) {
    this.repository = repository;
  }

  async create(payload: Partial<T>): Promise<T> {
    return this.repository.create(payload);
  }

  async find(query?: IQueryFilter<T> | any): Promise<T[]> {
    const { offset, limit, order, ...filter } = query;

    return await this.repository.find(filter);
  }

  async paginate(query: IQueryPaginate<T> | any): Promise<T[]> {
    const { offset, limit, order, ...filter } = query;

    return await this.repository.find(filter).skip(offset).limit(limit).sort({ createdAt: order });
  }

  async aggregate(query: Array<any>): Promise<T[]> {
    return await this.repository.aggregate(query);
  }

  async findById(id: ObjectId): Promise<T> {
    return await this.repository.findById(id);
  }

  async findOne(query: IQueryFilter<T>): Promise<T> {
    return await this.repository.findOne(query);
  }

  async updateOne(query: Record<string, unknown>, payload: Partial<T>, projection?): Promise<unknown> {
    return await this.repository.updateOne(query, payload, projection);
  }

  async updateById(id: ObjectId, payload: Partial<T>): Promise<T> {
    return await this.repository.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteOne(query?: Record<string, unknown>): Promise<unknown> {
    return await this.repository.deleteOne(query);
  }

  async deleteById(id: ObjectId): Promise<unknown> {
    return await this.repository.findByIdAndDelete(id);
  }
}
