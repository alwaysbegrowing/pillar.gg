import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');
const refreshYTAccessToken = require('./_refreshYTAccessToken');

const getUserYTToken = async (req: NowRequest, res: NowResponse) => {

  let debugList:string[] = ['init'];
  try {
    debugList.push("inside try. server_token == numbercrunch token" + (req.body.server_token == process.env.NUMBERCRUNCH_TOKEN).toString())

    if (req.body.server_token == process.env.NUMBERCRUNCH_TOKEN) {
      if (
        req.body.twitch_username === null ||
        req.body.twitch_username === undefined ||
        req.body.twitch_username === ''
      ) {
        res.status(401).send('Incorrect twitch_username');
      } else {
        // have a good server token and twitch username
        debugList.push("about to connect to database");
        const db = await connectToDatabase();
        debugList.push("connected to database");
        const user_results = await db
          .collection('users')
          .find({ twitch_username: req.body.twitch_username })
          .toArray();
        debugList.push("user results received" + user_results.toString())
        if (user_results.length !== 0) {
          // return their yt_token
          // eslint-disable-next-line
          debugList.push("user results > 0" + user_results.length.toString())
          const refresh_token = user_results[0]['youtube_credentials']['refresh_token'];
          debugList.push("awaiting refresh YT Access Token" + refresh_token.toString())
          const refreshedYoutubeCredentials = await refreshYTAccessToken(refresh_token);
          debugList.push("received refreshedYoutubeCredentials" + refreshedYoutubeCredentials.toString())

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


        debugList.push("received refreshedYoutubeCredentials" + JSON.stringify(youtube_credentials))
        const updatedoc = {
          $set: {
            youtube_credentials: youtube_credentials
          },
        };
        debugList.push("about to update users table")
        db.collection('users').updateOne(filter, updatedoc, options);
        debugList.push("updated users table")
        res.status(200).send(debugList);
        } else {
          res.status(401).send('twitch_username does not exist');
        }
      }
    } else {
      res.status(401).send('Incorrect server token');
    }
  } catch(err) {
    res.status(400).send(debugList);
  }
};

module.exports = getUserYTToken;
