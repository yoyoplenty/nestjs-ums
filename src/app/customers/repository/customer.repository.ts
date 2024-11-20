import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class CustomerRepository extends BaseRepository<CustomerDocument> {
  constructor(@InjectModel(Customer.name, 'old') private customerModel: Model<CustomerDocument>) {
    super(customerModel);
  }
}
