import { NowRequest, NowResponse } from '@vercel/node';

// eslint-disable-next-line
const ObjectId = require('mongodb').ObjectId;

const connectToDatabase = require('./_connectToDatabase');
const getUserYTCredentials = require('./_getUserYTCredentials');

const postUserYTVideo = async (req: NowRequest, res: NowResponse) => {

  if (req.body.user_id === null || req.body.user_id === undefined || req.body.user_id === '') {
    res.status(401).send('ERROR: NO user_id RECEIVED');
  } else if (
      req.body.code === null ||
      req.body.code === undefined ||
      req.body.code === ''
  ) {
    res.status(401).send('ERROR: No code RECEIVED');
  } else {
    try {
      // get data from youtube using code
      const youtubeResults = await getUserYTCredentials(req.body.code);

      // get user token from user table
      const db = await connectToDatabase();
      const user_results = await db
        .collection('users')
        .find({ _id: ObjectId(req.body.user_id) })
        .toArray();

      if (user_results.length !== 0) {
        // filter
        const filter = { _id: ObjectId(req.body.user_id) };

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
              expires_in: youtubeResults.expires_in
            }
          },
        };

        db.collection('users').updateOne(filter, updatedoc, options);
        res.status(200).send('success');
      } else {
        res.status(401).send('invalid user_id');
      }
    } catch {
      res.status(400).send('error, bad request');
    }
  }
};

module.exports = postUserYTVideo;
