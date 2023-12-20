import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  facebook: {
    appId: process.env.FB_APP_ID,
    appSecret: process.env.FB_APP_SECRET,
    redirectUrl: process.env.FB_REDIRECT_URL,
  },
  stripe: {
    privateKey: process.env.STRIPE_PRIVATE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  google: {
    scopes: ['https://www.googleapis.com/auth/calendar'],
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECTION_URL,
  },
};
