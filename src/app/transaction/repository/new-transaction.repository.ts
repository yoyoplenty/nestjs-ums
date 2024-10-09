import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewTransaction, NewTransactionDocument } from '../schemas/new-transaction.schema';
import { BaseRepository } from '../../../repositories/base-repository';

export class NewTransactionRepository extends BaseRepository<NewTransactionDocument> {
  constructor(@InjectModel(NewTransaction.name, 'new') private transactionModel: Model<NewTransactionDocument>) {
    super(transactionModel);
  }
}
