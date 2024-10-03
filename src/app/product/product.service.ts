import { Injectable } from '@nestjs/common';
import { BaseService } from '../../services/base-service';
import { ProductRepository } from './repository/product.repository';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { getFileProductDetails } from './helpers/product';
import { createVendor } from 'src/services/aws/cognito';
import { ProductImageRepository } from './repository/product-image.repository';

@Injectable()
export class ProductService extends BaseService<ProductRepository, null, null, null> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productImageRepository: ProductImageRepository,
  ) {
    super(productRepository, 'product');
  }

  async export(): Promise<any> {
    const products = await this.productRepository.find({});

    const data = products.map((product) => {
      return {
        _id: product._id,
        shortId: product.shortId,
        storeId: product.storeId,
        vendorId: product.vendorId,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
      };
    });

    const rows = [];
    data.forEach((application) => rows.push(Object.values(application)));

    const book = new Workbook();
    const sheet = book.addWorksheet('Application Sheet');

    rows.unshift(Object.keys(data[0]));
    sheet.addRows(rows);

    return await saveTempFile(book, 'Application Sheet');
  }

  async exportImages(): Promise<any> {
    const products = await this.productImageRepository.find({});

    const data = products.map((product) => {
      return {
        _id: product._id,
        storeId: product.storeId,
        productId: product.productId,
        src: product.src,
        width: product.width,
        height: product.height,
        position: product.position,
      };
    });

    const rows = [];
    data.forEach((application) => rows.push(Object.values(application)));

    const book = new Workbook();
    const sheet = book.addWorksheet('Application Sheet');

    rows.unshift(Object.keys(data[0]));
    sheet.addRows(rows);

    return await saveTempFile(book, 'Application Sheet');
  }

  async migrate(filePayload: FileDto): Promise<{ data: any; message: string }> {
    try {
      const { file } = filePayload;
      const products: any[] = getFileProductDetails(file);

      const productCreationPromises = products.map((product) => {
        const { firstName, lastName, email } = product;

        return createVendor({ email, firstName, lastName });
      });

      await Promise.all(productCreationPromises);

      return { data: null, message: 'Migrated sent successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
