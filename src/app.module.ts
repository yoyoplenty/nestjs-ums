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
import { AvailabilityModule } from './app/availability/availability.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    FacebookOauthModule,
    CampaignModule,
    AvailabilityModule,
    AuthModule,
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
