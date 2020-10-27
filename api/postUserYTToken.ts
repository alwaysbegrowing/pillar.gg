import { NowRequest, NowResponse } from '@vercel/node';

// eslint-disable-next-line
const ObjectId = require('mongodb').ObjectId;

const connectToDatabase = require('./_connectToDatabase');

const postUserYTVideo = async (req: NowRequest, res: NowResponse) => {
  if (req.body.user_id === null || req.body.user_id === undefined || req.body.user_id === '') {
    res.status(401).send('ERROR: NO user_id RECEIVED');
  } else if (
    req.body.youtube_token === null ||
    req.body.youtube_token === undefined ||
    req.body.youtube_token === ''
  ) {
    res.status(401).send('ERROR: NO youtube_token RECEIVED');
  } else {
    try {
      console.log(req.body.user_id);
      console.log(req.body.youtube_token);
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
            youtube_token: req.body.youtube_token,
          },
        };

        db.collection('users').updateOne(filter, updatedoc, options);
        console.log('updated!');
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
