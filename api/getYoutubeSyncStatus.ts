import { NowRequest, NowResponse } from '@vercel/node';

// eslint-disable-next-line
const ObjectId = require('mongodb').ObjectId;

const connectToDatabase = require('./_connectToDatabase');

const getYoutubeSyncStatus = async (req: NowRequest, res: NowResponse) => {
  try {
    // check if userid is valid
    const db = await connectToDatabase();
    // look up user
    // eslint-disable-next-line
    const user_results = await db
      .collection('users')
      .find({ _id: ObjectId(req.body.user_id) })
      .toArray();

    if (user_results.length === 0) {
      res.status(401).send('invalid user_id');
    } else if (!user_results[0].youtube_credentials.access_token) {
      res.status(200).send(false);
    } else {
      res.status(200).send(true);
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getYoutubeSyncStatus;
