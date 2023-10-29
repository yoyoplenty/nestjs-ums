import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from './../../config';

const appId = config.facebook.appId;
const appSecret = config.facebook.appSecret;
const redirectUri = config.facebook.redirectUrl;

@Injectable()
export class FacebookOauthService {
  async getFbAuth() {
    return `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email`;
  }

  async getAccessToken(code: string | any) {
    if (!code) throw new BadRequestException('Auth code not specified');

    const tokenUrl = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;
    const response = await axios.get(tokenUrl);

    return { data: response.data, message: `user authenticated successfully` };
  }

  async getIdFromToken(accessToken: string): Promise<string> {
    if (!accessToken) throw new BadRequestException('Access token not provided');

    const tokenUrl = `https://graph.facebook.com/me?access_token=${accessToken}`;

    const response = await axios.get(tokenUrl);
    const accountId = response.data.id;

    return accountId;
  }
}
