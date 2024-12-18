import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import LoggerMiddleware from './middlewares/logger.middleware';
import { HttpExceptionFilter } from './handlers/exceptions/http-exception.filter';
import UserModule from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { FacebookOauthModule } from './app/facebook-oauth/facebook-oauth.module';
import { CampaignModule } from './app/campaign/campaign.module';
import StoreModule from './app/stores/store.module';
import OrderModule from './app/orders/order.module';
import TransactionModule from './app/transaction/transaction.module';
import ProductModule from './app/product/product.module';
import BankModule from './app/bank/bank.module';
import PlanModule from './app/plan/plan.module';
import SubscriptionModule from './app/subscription/subscription.module';
import CustomerModule from './app/customers/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, { connectionName: 'old' }),
    MongooseModule.forRoot(process.env.NEW_MONGO_URI, { connectionName: 'new' }),
    UserModule,
    AuthModule,
    FacebookOauthModule,
    CampaignModule,
    StoreModule,
    OrderModule,
    TransactionModule,
    ProductModule,
    BankModule,
    PlanModule,
    CustomerModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
