import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

const handleAuthCallback = async (req: VercelRequest, res: VercelResponse) => {
  const { state } = req.query;
  if (!state) {
    return res.status(400).send('Missing state param');
  }

  const db = await connectToDatabase();
  const filter = {
    twitch_id: state,
  };
  const resp = await db.collection('youtube_tokens').findOne(filter);
  // in the future we should ALSO check if the refresh token is valid. Right now we are ONLY checking if it exists
  return resp ? res.send(200) : res.send(401);
};

export default handleAuthCallback;
