import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { BankRepository } from './bank.repository';
import { Bank, BankSchema } from './schemas/bank.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema }], 'new'), NestjsFormDataModule],
  controllers: [BankController],
  providers: [BankRepository, BankService],
  exports: [BankRepository, BankService],
})
export default class BankModule {}
