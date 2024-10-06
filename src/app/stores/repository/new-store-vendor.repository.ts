import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewStoreVendor, NewStoreVendorDocument } from '../schemas/new-store-vendor.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewStoreVendorRepository extends BaseRepository<NewStoreVendorDocument> {
  constructor(@InjectModel(NewStoreVendor.name, 'new') private storeVendorModel: Model<NewStoreVendorDocument>) {
    super(storeVendorModel);
  }
}
