import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/orders.schema';
import { BaseRepository } from '../../repositories/base-repository';

export class OrderRepository extends BaseRepository<OrderDocument> {
  constructor(@InjectModel(Order.name, 'new') private orderModel: Model<OrderDocument>) {
    super(orderModel);
  }
}
