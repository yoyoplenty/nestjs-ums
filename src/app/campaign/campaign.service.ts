import { Injectable } from '@nestjs/common';
import * as bizSdk from 'facebook-nodejs-business-sdk';

import { CreateCampaignDto } from './dto/create-campaign.dto';
import { FacebookOauthService } from '../facebook-oauth/facebook-oauth.service';

const AdAccount = bizSdk.AdAccount;

@Injectable()
export class CampaignService {
  constructor(private readonly facebookService: FacebookOauthService) {}

  async create(createCampaignDto: CreateCampaignDto, accessToken: string) {
    const api = bizSdk.FacebookAdsApi.init(accessToken);

    const showDebugingInfo = true;
    if (showDebugingInfo) api.setDebug(true);

    const accountId = await this.facebookService.getIdFromToken(accessToken);
    const data = await new AdAccount(accountId).createCampaign([], createCampaignDto);

    return { data, message: `campaign created successfully` };
  }

  findAll() {
    return `This action returns all campaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }
}
