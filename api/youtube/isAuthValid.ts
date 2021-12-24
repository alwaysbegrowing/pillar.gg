import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';

const connectToDatabase = require('../_connectToDatabase');

const handleAuthCallback = async (req: VercelRequest, res: VercelResponse) => {
  const { state } = req.query;
  if (!state) {
    return res.status(400).send('Missing state param');
  }

  const { id: twitchId } = await getTwitchUserData(state);

  const db = await connectToDatabase();
  const filter = {
    twitch_id: twitchId,
  };
  const resp = await db.collection('youtube_tokens').findOne(filter);
  // in the future we should ALSO check if the refresh token is valid. Right now we are ONLY checking if it exists
  return resp ? res.status(200).send(null) : res.status(401).send(null);
};

export default handleAuthCallback;
