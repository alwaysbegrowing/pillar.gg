import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch, { Headers } from 'node-fetch';
import getTwitchUserData from '../../twitch/_getTwitchUserData';

const connectToDatabase = require('../../_connectToDatabase');

const deleteVod = async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase();
  const { headers: userHeaders, body } = req;

  const videoIdQuery = req.query.videoId;

  if (!videoIdQuery) {
    return res.status(404).send({
      error: 'No VOD found'
    })
  }

  const userData = await getTwitchUserData(userHeaders.authorization);
  const { id: twitchId } = userData;

  const query = { 'videoId': videoIdQuery, 'twitchId': id }

  if (db.collection('exports').findOne({ query }) {
    // await db.collection('exports').deleteOne({ videoId: videoIdQuery });
    console.log("deleted video");
  }
  return res.status(200);
};

export default deleteVod;
