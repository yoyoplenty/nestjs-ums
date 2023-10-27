import { Module } from '@nestjs/common';
import { FacebookOauthService } from './facebook-oauth.service';
import { FacebookOauthController } from './facebook-oauth.controller';

@Module({
  controllers: [FacebookOauthController],
  providers: [FacebookOauthService],
})
export class FacebookOauthModule {}
