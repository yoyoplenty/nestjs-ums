import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { Product, ProductSchema } from './schemas/product.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ProductImage, ProductImageSchema } from './schemas/product-image.schema';
import { ProductImageRepository } from './repository/product-image.repository';
import { NewProduct, NewProductSchema } from './schemas/new-product.schema';
import { NewProductImage, NewProductImageSchema } from './schemas/new-product-image.schema';
import { NewProductRepository } from './repository/new-product.repository';
import { NewProductImageRepository } from './repository/new-product-image.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema },
        { name: ProductImage.name, schema: ProductImageSchema },
      ],
      'old',
    ),
    MongooseModule.forFeature(
      [
        { name: NewProduct.name, schema: NewProductSchema },
        { name: NewProductImage.name, schema: NewProductImageSchema },
      ],
      'new',
    ),
    NestjsFormDataModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    NewProductRepository,
    ProductImageRepository,
    NewProductImageRepository,
  ],
  exports: [ProductRepository, ProductImageRepository, NewProductRepository, NewProductImageRepository, ProductService],
})
export default class ProductModule {}
