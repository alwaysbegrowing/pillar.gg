import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

const postUserVideo = async (req: NowRequest, res: NowResponse) => {
  try {
    if (req.body.server_token === process.env.NUMBERCRUNCH_TOKEN) {

        // get user token from user table
        const db = await connectToDatabase();
        const result = await db.collection('users').findOne({twitch_username: req.body.twitch_username });

        if (result) {
            // eslint-disable-next-line
            const user_id = result._id;

            // add video
            const myobj = {
                user_id,
                twitch_username: req.body.twitch_username,
                thumbnail_url: req.body.video_thumbnail_url,
                video_url: req.body.video_url,
                video_title: req.body.video_title,
                timestamp: req.body.timestamp
            };

            db.collection('videos').insertOne(myobj);
            res.status(200).send('success');
        }
        else{
            res.status(401).send('invalid twitch_username')
        }
    } else {
      res.status(401).send('Incorrect server token');
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = postUserVideo;
