import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IQueryFilter, IQueryPaginate } from 'src/utils/types/filter.interface';
import { IBaseRepository } from './../utils/types/repository.interface';

export class BaseRepository<T> implements IBaseRepository<T> {
  repository: Model<T>;

  constructor(repository: Model<T, Record<string, never>, Record<string, never>>) {
    this.repository = repository;
  }

  async find(query?: IQueryFilter<T>): Promise<T[]> {
    console.log(query);

    return await this.repository.find(query);
  }

  async paginate(query: IQueryPaginate<T>): Promise<T[]> {
    const { offset, limit, order, ...filter } = query;

    console.log(query);
    console.log(filter);

    return await this.repository.find({}).skip(offset).limit(limit);
  }

  async findById(id: ObjectId): Promise<T> {
    return await this.repository.findById(id);
  }

  async create(payload: Partial<T>): Promise<T> {
    return this.repository.create(payload);
  }

  async findOne(query: IQueryFilter<T>): Promise<T> {
    return await this.repository.findOne(query);
  }

  // async findOne(query?: Record<string, unknown>): Promise<T> {
  //   return await this.repository.findById(query);
  // }

  async updateOne(query: Record<string, unknown>, payload: Partial<T>, projection?): Promise<unknown> {
    return await this.repository.updateOne(query, payload, projection);
  }

  async updateById(id: ObjectId, payload: Partial<T>): Promise<T> {
    return await this.repository.findByIdAndUpdate(id, payload);
  }

  async deleteOne(query?: Record<string, unknown>): Promise<unknown> {
    return await this.repository.deleteOne(query);
  }

  async deleteById(id: ObjectId): Promise<unknown> {
    return await this.repository.findByIdAndDelete(id);
  }
}
