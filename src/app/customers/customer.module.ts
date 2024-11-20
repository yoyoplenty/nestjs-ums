import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repository/customer.repository';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { NewCustomer, NewCustomerSchema } from './schemas/new-customer.schema';
import { NewCustomerRepository } from './repository/new-customer.repository';
import { NewAddress, NewAddressSchema } from './schemas/new-address.schema';
import { NewAddressRepository } from './repository/new-address.repository';
import StoreModule from '../stores/store.module';
import OrderModule from '../orders/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }], 'old'),
    MongooseModule.forFeature([{ name: NewCustomer.name, schema: NewCustomerSchema }], 'new'),
    MongooseModule.forFeature([{ name: NewAddress.name, schema: NewAddressSchema }], 'new'),
    StoreModule,
    OrderModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerRepository, NewCustomerRepository, NewAddressRepository, CustomerService],
  exports: [CustomerRepository, NewCustomerRepository, NewAddressRepository, CustomerService],
})
export default class CustomerModule {}
