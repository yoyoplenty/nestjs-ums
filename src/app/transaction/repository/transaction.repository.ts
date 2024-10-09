import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class TransactionRepository extends BaseRepository<TransactionDocument> {
  constructor(@InjectModel(Transaction.name, 'old') private transactionModel: Model<TransactionDocument>) {
    super(transactionModel);
  }
}
