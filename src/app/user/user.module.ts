/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import StoreModule from '../stores/store.module';
import SubscriptionModule from '../subscription/subscription.module';
import PlanModule from '../plan/plan.module';
import ProductModule from '../product/product.module';
import TransactionModule from '../transaction/transaction.module';
import CustomerModule from '../customers/customer.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: User.name,
          useFactory: () => {
            UserSchema.plugin(require('mongoose-autopopulate'));

            UserSchema.pre('save', function () {
              console.log('Hello from pre save');
              console.log(this.password);
              //TODO, Hash password and create verification token
              // if (!this.isModified("password")) return next();
              // const salt = await bcrypt.genSalt(10);
              // this.password = await bcrypt.hash(this.password, salt);
              // this.confirm_token = await utility.generateToken();
            });

            return UserSchema;
          },
        },
      ],
      'old',
    ),
    NestjsFormDataModule,
    PlanModule,
    StoreModule,
    ProductModule,
    CustomerModule,
    TransactionModule,
    SubscriptionModule,
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export default class UserModule {}
