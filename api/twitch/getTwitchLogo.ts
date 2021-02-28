import { NowRequest, NowResponse } from '@vercel/node';

// eslint-disable-next-line
const ObjectId = require('mongodb').ObjectId

const connectToDatabase = require('../_connectToDatabase');

const getTwitchLogo = async (req: NowRequest, res: NowResponse) => {

    try {
    // check if userid is valid
    const db = await connectToDatabase();

    // look up user
    // eslint-disable-next-line
    const user_result = await db.collection('users').findOne({_id: ObjectId(req.body.user_id) });
    if(!user_result){
        res.status(401).send('invalid user_id')
    }
    else if (!user_result.twitch_profile_picture){
      res.status(417).send('User exists, but a profile picture doesn\'t exist')
    }
    else{
        res.status(200).send(user_result.twitch_profile_picture)
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getTwitchLogo;
