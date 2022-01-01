import type { VercelRequest, VercelResponse } from '@vercel/node';

// ripped right out of their docs
// https://developers.tiktok.com/doc/login-kit-web

const SCOPE = 'user.info.basic,share.sound.create,video.upload';
// const { TIKTOK_CLIENT_KEY, NODE_ENV } = process.env;

const { TIKTOK_CLIENT_KEY } = process.env;

// when developing locally
// you will have to get the code from the browser
const REDIRECT_URI = 'https://app.pillar.gg/api/tiktok/callback';

const oauth = async (req: VercelRequest, res: VercelResponse) => {
  const { state } = req.query;

  let url = 'https://open-api.tiktok.com/platform/oauth/connect/';

  url += `?client_key=${TIKTOK_CLIENT_KEY}`;
  url += '&scope=' + SCOPE;
  url += '&response_type=code';
  url += '&redirect_uri=' + REDIRECT_URI;
  url += '&state=' + state;

  res.redirect(url);
};

export default oauth;
