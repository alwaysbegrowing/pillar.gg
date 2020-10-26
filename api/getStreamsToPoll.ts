import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');

const getStreamsToPoll = async (req: NowRequest, res: NowResponse) => {
  try {
    if (req.body.server_token === process.env.NUMBERCRUNCH_TOKEN) {
      const db = await connectToDatabase();
      const results = await db.collection('users').find({}).toArray();
      res.status(200).json({ results });
    } else {
      res.status(401).send('Incorrect server token');
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getStreamsToPoll;
