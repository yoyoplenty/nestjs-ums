import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { oAuth2Client, scope } from '../../utils';

@Injectable()
export class GoogleOauthService {
  private oAuth2Client = oAuth2Client;

  async getGoogleAuth() {
    return await this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
    });
  }

  async getAccessToken(code: string | any): Promise<any> {
    if (!code) throw new BadRequestException('Auth code not specified');

    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);

    const googleToken = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };

    return { data: googleToken, message: `user authenticated successfully` };
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
