import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    query: { videoId, limit = 10 },
  } = req;

  const lim = parseInt(limit as string, 10);
  // throw 400 error here if input is not an int

  const db = await connectToDatabase();

  const options = {
    projection: {
      clips: {
        algo1: {
          $slice: lim,
        },
        algo2: {
          $slice: lim,
        },
        algo3: {
          $slice: lim,
        },
        algo4: {
          $slice: lim,
        },
        ccc: {
          $slice: lim,
        },
      },
    },
  };
  const result = await db.collection('timestamps').findOne({ videoId }, options);
  if (!result) {
    res.status(404).end();
    return;
  }
  if (result.clips?.brain) {
    if(result.clips.brain > 1)
    result.clips.brain = result.clips.brain.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
  }

  if (result?.ccc?.length > 1) {
 
    result.clips.ccc = result.ccc.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
  }
  res.json(result);
};
