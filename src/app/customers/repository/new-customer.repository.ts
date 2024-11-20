import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewCustomer, NewCustomerDocument } from '../schemas/new-customer.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewCustomerRepository extends BaseRepository<NewCustomerDocument> {
  constructor(@InjectModel(NewCustomer.name, 'new') private customerModel: Model<NewCustomerDocument>) {
    super(customerModel);
  }
}
