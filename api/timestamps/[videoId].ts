import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    query: { videoId, limit = 100 },
  } = req;

  const lim = parseInt(limit as string, 10);
  // throw 400 error here if input is not an int

  const db = await connectToDatabase();

  const options = {
    projection: {
      clips: {
        $slice: lim,
      },
    },
  };
  const result = await db.collection('clip_metadata').findOne({ videoId }, options);
  if (!result) {
    res.status(404).end();
    return;
  }

  res.json(result);
};
