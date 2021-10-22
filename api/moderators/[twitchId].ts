import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

const moderators = async (req: VercelRequest, res: VercelResponse) => {
  const {
    query: { twitchId },
  } = req;

  const db = await connectToDatabase();

  const moderatorIds = await db.collection('moderators').findOne({ twitch_id: twitchId });

  if (!moderatorIds) {
    res.status(200);
    return;
  }

  res.json(moderatorIds);
};

module.exports = moderators;
