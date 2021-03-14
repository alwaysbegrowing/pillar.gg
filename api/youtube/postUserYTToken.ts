import type { NowRequest, NowResponse } from '@vercel/node';

const { ObjectId } = require('mongodb');

const connectToDatabase = require('../_connectToDatabase');
const getUserYTCredentials = require('./_getUserYTCredentials');

const postUserYTToken = async (req: NowRequest, res: NowResponse) => {
  const { code, user_id } = req.body;
  if (!user_id || !code) {
    return res.status(401).send(`ERROR: missing ${!user_id || !code}`);
  }

  try {
    // get data from youtube using code
    const youtubeResults = await getUserYTCredentials(code);
    // get user token from user table
    const db = await connectToDatabase();
    const user_results = await db.collection('users').find({ _id: ObjectId(user_id) });

    if (user_results.length !== 0) {
      // filter
      const filter = { _id: ObjectId(user_id) };

      // options don't create document if one does not exist
      const options = { upsert: false };

      // updatedoc
      const updatedoc = {
        $set: {
          youtube_credentials: {
            access_token: youtubeResults.access_token,
            refresh_token: youtubeResults.refresh_token,
            scope: youtubeResults.scope,
            token_type: youtubeResults.token_type,
            expires_in: youtubeResults.expires_in,
          },
        },
      };
      db.collection('users').updateOne(filter, updatedoc, options);
      return res.status(200).send('success');
    }
    return res.status(401).send('invalid user_id');
  } catch {
    return res.status(400).send('error, bad request');
  }
};

module.exports = postUserYTToken;
