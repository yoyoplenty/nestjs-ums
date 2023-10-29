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
};
