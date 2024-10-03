import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class ProductRepository extends BaseRepository<ProductDocument> {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    super(productModel);
  }
}
