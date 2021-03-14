import type { VercelRequest, VercelResponse } from '@vercel/node';

// eslint-disable-next-line
const ObjectId = require('mongodb').ObjectId;

const connectToDatabase = require('../_connectToDatabase');

const getYoutubeSyncStatus = async (req: VercelRequest, res: VercelResponse) => {
  try {
    // check if userid is valid
    const db = await connectToDatabase();
    // look up user
    // eslint-disable-next-line
    const user_result = await db
      .collection('users')
      .findOne({ _id: ObjectId(req.body.user_id) });

    if (!user_result) {
      res.status(401).send('invalid user_id');
    } else if (!user_result.youtube_credentials.access_token) {
      res.status(200).send(false);
    } else {
      res.status(200).send(true);
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getYoutubeSyncStatus;
