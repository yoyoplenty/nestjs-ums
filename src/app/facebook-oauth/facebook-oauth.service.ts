import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FacebookOauthService {
  async getFbAuth() {
    const clientID = process.env.FB_APP_ID;
    const redirectUri = process.env.REDIRECT_URL;

    return `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientID}&redirect_uri=${redirectUri}&scope=email`;
  }

  async getRedirect(code) {
    const clientID = process.env.FB_APP_ID;
    const clientSecret = process.env.FB_SECRET_KEY;
    const redirectUri = process.env.REDIRECT_URL;

    if (!code) throw new BadRequestException('Auth code not specified');

    const tokenUrl = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${clientID}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`;
    const response = await axios.get(tokenUrl);

    return { data: response.data, message: `user authenticated successfully` };
  }
}
