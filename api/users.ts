import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');

const users = async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase();
  const userIds = await db
    .collection('users')
    .find({})
    .project({ twitch_id: 1, display_name: 1 })
    .toArray();
  res.json(userIds);
};

module.exports = users;
