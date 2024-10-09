import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './repository/order.repository';
import { Order, OrderSchema } from './schemas/orders.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { NewOrder, NewOrderSchema } from './schemas/new-orders.schema';
import { NewOrderRepository } from './repository/new-order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }], 'old'),
    MongooseModule.forFeature([{ name: NewOrder.name, schema: NewOrderSchema }], 'new'),
    NestjsFormDataModule,
  ],
  controllers: [OrderController],
  providers: [OrderRepository, NewOrderRepository, OrderService],
  exports: [OrderRepository, NewOrderRepository, OrderService],
})
export default class OrderModule {}
