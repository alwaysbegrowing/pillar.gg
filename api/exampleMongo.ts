import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');

const example = async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase();
  const results = await db.collection('users').find({}).toArray();
  res.json({ results });
};

module.exports = example;
