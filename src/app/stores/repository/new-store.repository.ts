import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewStore, NewStoreDocument } from '../schemas/new-stores.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewStoreRepository extends BaseRepository<NewStoreDocument> {
  constructor(@InjectModel(NewStore.name, 'new') private storeModel: Model<NewStoreDocument>) {
    super(storeModel);
  }
}
