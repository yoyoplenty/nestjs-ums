import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from './../../config';

// const appId = config.facebook.appId;
// const appSecret = config.facebook.appSecret;
// const redirectUri = config.facebook.redirectUrl;

const clientId = config.twitch.clientId;
const clientSecret = config.twitch.clientSecret;
const redirectUri = config.twitch.redirectUrl;

@Injectable()
export class FacebookOauthService {
  async getFbAuth() {
    const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=channel:manage:schedule`;
    // return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email`;
    return url;
  }

  async getAccessToken(code: string | any) {
    if (!code) throw new BadRequestException('Auth code not specified');

    // const url = 'https://id.twitch.tv/oauth2/token';

    // const payload = {
    //   client_id: clientId,
    //   client_secret: clientSecret,
    //   code,
    //   grant_type: 'authorization_code',
    //   redirect_uri: redirectUri,
    // };

    // const response = await axios.post(url, payload);

    //Get Both Access and Refresh Token, Save Refresh Token in the database, under user

    return { data: code, message: `user authenticated successfully` };
  }

  async getUserDetails(token: string): Promise<any> {
    const twitchApiUrl = `https://api.twitch.tv/helix/users`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Client-Id': clientId,
    };

    const response = await axios.get(twitchApiUrl, { headers });

    return { data: response.data, message: `user authenticated successfully` };
  }

  async getUserBroadcasts(token: string): Promise<any> {
    const twitchApiUrl = `https://api.twitch.tv/helix/schedule?broadcaster_id=988354550`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Client-Id': clientId,
    };

    try {
      const response = await axios.get(twitchApiUrl, { headers });

      return { data: response.data, message: `user authenticated successfully` };
    } catch (err) {
      console.log(err);
    }
  }

  async createBroadcasts(token: string): Promise<any> {
    //TODO Get token from refresh token under the user account;

    const twitchApiUrl = 'https://api.twitch.tv/helix/schedule/segment?broadcaster_id=988354550';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Client-Id': clientId,
    };

    const payload = {
      start_time: '2023-11-14T07:00:00Z',
      duration: 45,
      timezone: 'Africa/Lagos',
      title: 'Broadcast Schedule test',
      is_recurring: true,
      category_id: 509658,
    };

    try {
      const response = await axios.post(twitchApiUrl, payload, { headers });

      console.log(response);

      return { data: response.data, message: `user authenticated successfully` };
    } catch (err) {
      console.log(err);
    }
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
