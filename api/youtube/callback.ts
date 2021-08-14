import type { VercelRequest, VercelResponse } from '@vercel/node';

const { google } = require('googleapis');

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YOUTUBE_REDIRECT_URL } = process.env;
const oauth2Client = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET, YOUTUBE_REDIRECT_URL);
const scopes = ['https://www.googleapis.com/auth/youtube'];

const handleAuthCallback = async (req: VercelRequest, res: VercelResponse) => {
  const { code, state } = req.query;
  if (!state) return res.status(400).send(`Missing state parameter`);

  if (!code) {
    const url = oauth2Client.generateAuthUrl({
      // 'offline' needs to be specified to get a refresh token
      access_type: 'offline',

      scope: scopes,
      state,
    });
    return res.redirect(url);
  }

  const { tokens } = await oauth2Client.getToken(code);
  console.log(state, tokens);

  return res.redirect('/');
};

export default handleAuthCallback;
