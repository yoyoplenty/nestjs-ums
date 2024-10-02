import { Injectable } from '@nestjs/common';
import { BaseService } from '../../services/base-service';
import { TransactionRepository } from './transaction.repository';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { getFileTransactionDetails } from './helpers/transaction';
import { createVendor } from 'src/services/aws/cognito';

@Injectable()
export class TransactionService extends BaseService<TransactionRepository, null, null, null> {
  constructor(private readonly storeRepository: TransactionRepository) {
    super(storeRepository, 'store');
  }

  async export(): Promise<any> {
    const stores = await this.storeRepository.find({});

    const data = stores.map((store) => {
      return {};
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
      const stores: any[] = getFileTransactionDetails(file);

      const storeCreationPromises = stores.map((store) => {
        const { firstName, lastName, email } = store;

        return createVendor({ email, firstName, lastName });
      });

      await Promise.all(storeCreationPromises);

      return { data: null, message: 'Migrated sent successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
