import { NowRequest, NowResponse } from '@vercel/node';

// eslint-disable-next-line
const ObjectId = require('mongodb').ObjectId
const fetch = require('node-fetch');
const connectToDatabase = require('../_connectToDatabase');

/**
 * This is
 * @param req body contains userID of user in MongoDB Users Table
 * @param res
 */
const getVodList = async (req: NowRequest, res: NowResponse) => {
  try {
    // set userID
    const userID = req.body.user_id;

    // esetablish connection to mongo
    const db = await connectToDatabase();
    // get info from user
    const user_result = await db
      .collection('users')
      .findOne({ _id: ObjectId(userID) });

    //extract channel_id
    const channel_id = user_result.twitch_id;

    // Requests the 10 most recent videos (of any broadcast type) from channel
    // https://dev.twitch.tv/docs/v5/reference/channels/#get-channel-videos
    const url = `https://api.twitch.tv/kraken/channels/${channel_id}/videos`;
    const client_id = process.env.TWITCH_CLIENT_ID;

    const data = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': client_id,
      }
    })
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    })
    // TODO: trim the data and only send what is needed
    res.status(200).json(data);
  }
  // TODO: Add beter error handling
  catch(e) {
    res.status(500).json({"Error": e.message})
  }
};

module.exports = getVodList;
