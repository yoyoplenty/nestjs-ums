import { Injectable } from '@nestjs/common';
import { BaseService } from '../../services/base-service';
import { StoreRepository } from './repository/store.repository';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { getFileStoreDetails } from './helpers/stores';
import { createVendor } from 'src/services/aws/cognito';
import { QueryUserDto } from '../user/dto/query-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class StoreService extends BaseService<StoreRepository, QueryUserDto, CreateUserDto, UpdateUserDto> {
  // constructor(private readonly storeRepository: StoreRepository) {
  //   super(storeRepository, 'store');
  // }
  // async export(): Promise<any> {
  //   const stores = await this.storeRepository.find({});
  //   const data = stores.map((store) => {
  //     return {
  //       _id: store.name,
  //       domain: store.domain,
  //       tagline: store.tagline,
  //       businessType: store.businessType,
  //       'counters.products': store.counters.product,
  //       'counters.orders': store.counters.orders,
  //       'counters.customers': store.counters.customers,
  //     };
  //   });
  //   const rows = [];
  //   data.forEach((application) => rows.push(Object.values(application)));
  //   const book = new Workbook();
  //   const sheet = book.addWorksheet('Application Sheet');
  //   rows.unshift(Object.keys(data[0]));
  //   sheet.addRows(rows);
  //   return await saveTempFile(book, 'Application Sheet');
  // }
  // async migrate(filePayload: FileDto): Promise<{ data: any; message: string }> {
  //   try {
  //     const { file } = filePayload;
  //     const stores: any[] = getFileStoreDetails(file);
  //     const storeCreationPromises = stores.map((store) => {
  //       const { firstName, lastName, email } = store;
  //       return createVendor({ email, firstName, lastName });
  //     });
  //     await Promise.all(storeCreationPromises);
  //     return { data: null, message: 'Migrated sent successfully' };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
