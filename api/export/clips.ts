import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch, { Headers } from 'node-fetch';

import { CLIP_EXPORT_URL } from '../_apiUrls';
import type { Export } from '../_types';
import { ExportTypes } from '../_types';

const connectToDatabase = require('../_connectToDatabase');

const clips = async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase();

  const { headers: userHeaders, body } = req;

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', userHeaders.authorization || '');

  const resp = await fetch(CLIP_EXPORT_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (resp.ok) {
    const data = await resp.json();
    const exportObject: Export = {
      ...data,
      videoId: body.videoId,
      uploadType: ExportTypes.standard,
    };
    const { _id } = await db.collection('exports').insertOne(exportObject);
    return res.status(200).json({ ...data, id: _id });
  }

  return res.status(resp.status).json(await resp.json());
};

export default clips;
