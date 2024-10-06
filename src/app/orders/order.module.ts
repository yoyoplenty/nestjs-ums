import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { Order, OrderSchema } from './schemas/orders.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }], 'new'), NestjsFormDataModule],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
  exports: [OrderRepository, OrderService],
})
export default class OrderModule {}
