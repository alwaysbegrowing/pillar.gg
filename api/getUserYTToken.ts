import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');

const getUserYTToken = async (req: NowRequest, res: NowResponse) => {
  try {
    if (req.body.server_token === process.env.NUMBERCRUNCH_TOKEN) {
      if (
        req.body.twitch_username === null ||
        req.body.twitch_username === undefined ||
        req.body.twitch_username === ''
      ) {
        res.status(401).send('Incorrect twitch_username');
      } else {
        // have a good server token and twitch username
        const db = await connectToDatabase();
        const user_results = await db
          .collection('users')
          .find({ twitch_username: req.body.twitch_username })
          .toArray();

        if (user_results.length !== 0) {
          // return their yt_token
          // eslint-disable-next-line
          res.status(200).json(user_results[0]['youtube_token']);
        } else {
          res.status(401).send('twitch_username does not exist');
        }
      }
    } else {
      res.status(401).send('Incorrect server token');
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getUserYTToken;
