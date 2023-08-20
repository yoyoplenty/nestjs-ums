import { ObjectId } from 'mongodb';
import { NotFoundException } from '@nestjs/common';

export class BaseService<R, Q, C, U> {
  private repository: R | any;
  private name: string;

  constructor(repository: R, name: string) {
    this.repository = repository;
    this.name = name;
  }

  async create(payload: C): Promise<{ data: any; message: string }> {
    const data = this.repository.create(payload);

    return { data, message: `${this.name} successfully created` };
  }

  async find(query?: Q): Promise<{ data: any; message: string }> {
    const data = await this.repository.find(query);
    if (!data || data.length < 1) throw new NotFoundException(`${this.name} not found`);

    return { data, message: `${this.name} successfully fetched` };
  }

  async findById(id: string): Promise<{ data: any; message: string }> {
    const mongoId = new ObjectId(id);

    const data = await this.repository.findById(mongoId);
    if (!data) throw new NotFoundException(`${this.name} not found`);

    return { data, message: `${this.name} successfully fetched` };
  }

  async update(id: string, payload: U): Promise<{ data: any; message: string }> {
    const mongoId = new ObjectId(id);

    const data = await this.repository.updateById(mongoId, payload);
    if (!data) throw new NotFoundException(`${this.name} not found`);

    return { data, message: `${this.name} successfully updated` };
  }

  async delete(id: string): Promise<unknown> {
    const mongoId = new ObjectId(id);

    await this.repository.deleteById(mongoId);

    return { data: null, message: `${this.name} successfully updated` };
  }
}
