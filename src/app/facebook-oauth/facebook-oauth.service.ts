import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from './../../config';

const appId = config.facebook.appId;
const appSecret = config.facebook.appSecret;
const redirectUri = config.facebook.redirectUrl;

@Injectable()
export class FacebookOauthService {
  async getFbAuth() {
    try {
      const scope = [
        'email',
        'publish_video',
        'catalog_management',
        'pages_show_list',
        'read_page_mailboxes',
        'ads_management',
        'business_management',
        'pages_messaging',
        'instagram_basic',
        'instagram_manage_insights',
        'instagram_content_publish',
        'instagram_manage_messages',
        'pages_read_engagement',
        'pages_manage_metadata',
        'pages_read_user_content',
        'pages_manage_posts',
        'public_profile',
        'instagram_manage_comments',
        'pages_manage_engagement',
        'instagram_shopping_tag_products',
        'instagram_branded_content_brand',
        'instagram_branded_content_creator',
        'instagram_manage_events',
        'attribution_read',
      ].join(',');

      return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}`;
    } catch (err) {
      console.log(err);
    }
  }

  async getAccessToken(code: string | any) {
    if (!code) throw new BadRequestException('Auth code not specified');

    // const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;
    // const response = await axios.get(tokenUrl);

    return { data: code, message: `user authenticated successfully` };
    // return { data: response.data, message: `user authenticated successfully` };
  }

  async getIdFromToken(accessToken: string): Promise<string> {
    if (!accessToken) throw new BadRequestException('Access token not provided');

    const tokenUrl = `https://graph.facebook.com/v18.0/me/adaccounts?access_token=${accessToken}`;

    const response = await axios.get(tokenUrl);
    const adAccounts = response.data.data;

    const adAccountIds = adAccounts.map((account) => account.id);

    return adAccountIds[0];
  }
}
