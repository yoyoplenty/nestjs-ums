import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductImage, ProductImageDocument } from '../schemas/product-image.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class ProductImageRepository extends BaseRepository<ProductImageDocument> {
  constructor(@InjectModel(ProductImage.name, 'new') private productImageImageModel: Model<ProductImageDocument>) {
    super(productImageImageModel);
  }
}
