import fetch from 'node-fetch';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';

const connectToDatabase = require('../_connectToDatabase');

const { TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET } = process.env;

const callback = async (req: VercelRequest, res: VercelResponse) => {
  const { code, state } = req.query;

  if (!state) return res.status(400).send(`Missing state parameter`);

  const { id: twitchId } = await getTwitchUserData(state);

  if (!code) {
    return res.status(400).send('Missing code');
  }

  const url = `https://open-api.tiktok.com/oauth/access_token/?client_key=${TIKTOK_CLIENT_KEY}&client_secret=${TIKTOK_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&grant_type=authorization_code`;

  const response = await fetch(url, {
    method: 'POST',
  });

  if (!response.ok) {
    return res.status(400).send(`Error: ${response.statusText}`);
  }

  const { data } = await response.json();

  const db = await connectToDatabase();

  const users = db.collection('users');

  const { modifiedCount } = await users.updateOne(
    {
      twitch_id: twitchId,
    },
    {
      $set: {
        tiktok: data,
        twitch_id: twitchId,
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

export default callback;
