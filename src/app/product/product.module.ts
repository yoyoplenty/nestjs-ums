import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { Product, ProductSchema } from './schemas/product.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ProductImage, ProductImageSchema } from './schemas/product-image.schema';
import { ProductImageRepository } from './repository/product-image.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema },
        { name: ProductImage.name, schema: ProductImageSchema },
      ],
      'new',
    ),
    NestjsFormDataModule,
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductImageRepository, ProductService],
  exports: [ProductRepository, ProductImageRepository, ProductService],
})
export default class ProductModule {}
