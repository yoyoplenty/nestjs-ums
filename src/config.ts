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
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    userPoolId: process.env.AWS_USER_POOL_ID,
    appClientId: process.env.AWS_APP_CLIENT_ID,
    customerPoolId: process.env.AWS_CUSTOMER_POOL_ID,
  },
  stripe: {
    privateKey: process.env.STRIPE_PRIVATE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  zoom: {
    zoomAddress: process.env.ZOOM_EMAIL_ADDRESS,
    clientId: process.env.ZOOM_CLIENT_ID,
    clientSecret: process.env.ZOOM_CLIENT_SECRET,
    redirectUrl: process.env.ZOOM_REDIRECT_URL,
  },
  google: {
    scopes: ['https://www.googleapis.com/auth/calendar'],
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECTION_URL,
  },
};
