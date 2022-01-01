import fetch from 'node-fetch';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';

const connectToDatabase = require('../_connectToDatabase');

const { TIKTOK_CLIENT_KEY } = process.env;

const refresh = async (req: VercelRequest, res: VercelResponse) => {
  const { state } = req.query;

  if (!state) return res.status(400).send(`Missing state parameter`);

  const { id: twitchId } = await getTwitchUserData(state);

  const db = await connectToDatabase();

  const users = db.collection('users');

  const user = await users.findOne(
    {
      twitch_id: twitchId,
    },
    { projection: { tiktok: 1 } },
  );

  if (!user) {
    return res.status(500).send('Failed to find user');
  }

  const { tiktok } = user;

  const { refresh_token } = tiktok;

  let url_refresh_token = 'https://open-api.tiktok.com/oauth/refresh_token/';
  url_refresh_token += '?client_key=' + TIKTOK_CLIENT_KEY;
  url_refresh_token += '&grant_type=refresh_token';
  url_refresh_token += '&refresh_token=' + refresh_token;

  const response = await fetch(url_refresh_token, {
    method: 'POST',
  });

  if (!response.ok) {
    return res.status(400).send(`Error: ${response.statusText}`);
  }

  const data = await response.json();

  const { modifiedCount } = await users.updateOne(
    {
      twitch_id: twitchId,
    },
    {
      $set: {
        tiktok: data,
      },
    },
    { upsert: true },
  );

  if (modifiedCount === 0) {
    return res.status(500).send('Failed to update user');
  }

  if (req.method === 'POST') {
    return res.status(200).json(data);
  }

  return res.redirect('/AuthSuccess');
};

export default refresh;
