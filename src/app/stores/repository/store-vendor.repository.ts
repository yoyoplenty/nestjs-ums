import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StoreVendor, StoreVendorDocument } from '../schemas/store-vendor.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class StoreVendorRepository extends BaseRepository<StoreVendorDocument> {
  constructor(@InjectModel(StoreVendor.name, 'old') private storeVendorModel: Model<StoreVendorDocument>) {
    super(storeVendorModel);
  }
}
