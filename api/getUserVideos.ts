import { NowRequest, NowResponse } from '@vercel/node';

// eslint-disable-next-line
const ObjectId = require('mongodb').ObjectId

const connectToDatabase = require('./_connectToDatabase');

const getUserVideo = async (req: NowRequest, res: NowResponse) => {

    try {
    // check if userid is valid
    const db = await connectToDatabase();
    const user_results = await db.collection('users').find({_id: ObjectId(req.body.user_id) }).toArray();

    if(user_results.length === 0){
        res.status(401).send('invalid user_id')
    }
    else{
        const results = await db.collection('videos').find({user_id : ObjectId(req.body.user_id) }).toArray();
        
        res.status(200).send({results})
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getUserVideo;