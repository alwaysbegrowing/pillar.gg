import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');
const refreshYTAccessToken = require('./_refreshYTAccessToken');

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
          const refresh_token = user_results[0]['youtube_credentials']['refresh_token'];
          const refreshedYoutubeCredentials = refreshYTAccessToken(refresh_token);

          // filter
        const filter = { twitch_username: req.body.twitch_username };

        // options don't create document if one does not exist
        const options = { upsert: false };

        const youtube_credentials = {
          access_token: refreshedYoutubeCredentials.access_token,
          refresh_token: user_results[0]['youtube_credentials']['refresh_token'],
          expires_in: refreshedYoutubeCredentials.expires_in,
          scope: refreshedYoutubeCredentials.scope,
          token_type: refreshedYoutubeCredentials.token_type,
        }
        const updatedoc = {
          $set: {
            youtube_credentials: youtube_credentials
          },
        };

        db.collection('users').updateOne(filter, updatedoc, options);
        res.status(200).send(JSON.stringify(youtube_credentials));
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
