import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

const { google } = require('googleapis');

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YOUTUBE_REDIRECT_URL } = process.env;
const oauth2Client = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET, YOUTUBE_REDIRECT_URL);
const scopes = ['https://www.googleapis.com/auth/youtube.upload'];

const updateTokens = async (tokens: any, state: any) => {
  const db = await connectToDatabase();
  const filter = {
    twitch_id: state,
  };
  const options = { upsert: true };

  const updatedoc = {
    $set: { ...tokens, twitch_id: state },
  };
  const resp = await db.collection('youtube_tokens').updateOne(filter, updatedoc, options);
  // eslint-disable-next-line no-console
  console.log(resp);
  return resp;
};

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

  await updateTokens(tokens, state);

  return res.redirect('/AuthSuccess');
};

export default handleAuthCallback;
