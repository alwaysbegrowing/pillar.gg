import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');

export default async (req: VercelRequest, res: VercelResponse) => {
  const { body } = req;
  const jsonb = JSON.parse(body);

  const db = await connectToDatabase();

  const result = await db
    .collection('clip_feedback')
    .update({ clip: jsonb.clip }, JSON.parse(body), { upsert: true });

  if (!result) {
    res.status(404).end();
    return;
  }

  res.status(200).end();
};
