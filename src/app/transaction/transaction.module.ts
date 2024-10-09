import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './repository/transaction.repository';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { NewTransaction, NewTransactionSchema } from './schemas/new-transaction.schema';
import { NewTransactionRepository } from './repository/new-transaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }], 'old'),
    MongooseModule.forFeature([{ name: NewTransaction.name, schema: NewTransactionSchema }], 'new'),
    NestjsFormDataModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionRepository, NewTransactionRepository, TransactionService],
  exports: [TransactionRepository, NewTransactionRepository, TransactionService],
})
export default class TransactionModule {}
