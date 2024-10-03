import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bank, BankDocument } from './schemas/bank.schema';
import { BaseRepository } from '../../repositories/base-repository';

export class BankRepository extends BaseRepository<BankDocument> {
  constructor(@InjectModel(Bank.name) private bankModel: Model<BankDocument>) {
    super(bankModel);
  }
}
