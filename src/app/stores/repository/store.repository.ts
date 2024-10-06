import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Store, StoreDocument } from '../schemas/stores.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class StoreRepository extends BaseRepository<StoreDocument> {
  constructor(@InjectModel(Store.name, 'old') private storeModel: Model<StoreDocument>) {
    super(storeModel);
  }
}
