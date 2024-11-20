import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewAddress, NewAddressDocument } from '../schemas/new-address.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewAddressRepository extends BaseRepository<NewAddressDocument> {
  constructor(@InjectModel(NewAddress.name, 'new') private addressModel: Model<NewAddressDocument>) {
    super(addressModel);
  }
}
