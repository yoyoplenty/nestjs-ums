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
  constructor(private readonly transactionRepository: TransactionRepository) {
    super(transactionRepository, 'transaction');
  }

  async export(): Promise<any> {
    const transactions = await this.transactionRepository.find({});

    const data = transactions.map((transaction) => {
      return {
        _id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        description: transaction.description,
        storeId: transaction.storeId,
        gatewayId: transaction.gatewayId,
        vendorId: transaction.vendorId,
        domain: transaction.domain,
        status: transaction.status,
        reference: transaction.reference,
        gatewayResponse: transaction.gatewayResponse,
        paidAt: transaction.paidAt,
        currency: transaction.currency,
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
      const transactions: any[] = getFileTransactionDetails(file);

      const transactionCreationPromises = transactions.map((transaction) => {
        const { firstName, lastName, email } = transaction;

        return createVendor({ email, firstName, lastName });
      });

      await Promise.all(transactionCreationPromises);

      return { data: null, message: 'Migrated sent successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
