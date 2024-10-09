import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewProductImage, NewProductImageDocument } from '../schemas/new-product-image.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewProductImageRepository extends BaseRepository<NewProductImageDocument> {
  constructor(
    @InjectModel(NewProductImage.name, 'new') private productImageImageModel: Model<NewProductImageDocument>,
  ) {
    super(productImageImageModel);
  }
}
