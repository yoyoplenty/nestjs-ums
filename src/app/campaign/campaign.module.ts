import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { FacebookOauthModule } from '../facebook-oauth/facebook-oauth.module';

@Module({
  imports: [FacebookOauthModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
