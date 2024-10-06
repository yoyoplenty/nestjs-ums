import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { Plan, PlanSchema } from './schemas/plan.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }], 'new'), NestjsFormDataModule],
  controllers: [PlanController],
  providers: [PlanRepository, PlanService],
  exports: [PlanRepository, PlanService],
})
export default class PlanModule {}
