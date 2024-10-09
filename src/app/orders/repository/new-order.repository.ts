import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewOrder, NewOrderDocument } from '../schemas/new-orders.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewOrderRepository extends BaseRepository<NewOrderDocument> {
  constructor(@InjectModel(NewOrder.name, 'new') private orderModel: Model<NewOrderDocument>) {
    super(orderModel);
  }
}
