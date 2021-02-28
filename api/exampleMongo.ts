import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');

const example = async (req: NowRequest, res: NowResponse) => {
  const db = await connectToDatabase();
  const results = await db.collection('users').find({}).toArray();
  res.json({ results });
};

module.exports = example;
