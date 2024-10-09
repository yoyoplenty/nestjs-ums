import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewProduct, NewProductDocument } from '../schemas/new-product.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewProductRepository extends BaseRepository<NewProductDocument> {
  constructor(@InjectModel(NewProduct.name, 'new') private productModel: Model<NewProductDocument>) {
    super(productModel);
  }
}
