import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch, { Headers } from 'node-fetch';

import { CLIP_EXPORT_URL, MOBILE_EXPORT_URL } from '../../_apiUrls';
import getTwitchUserData from '../../twitch/_getTwitchUserData';
import type { Export } from '../../_types';
import { ExportTypes } from '../../_types';

const connectToDatabase = require('../../_connectToDatabase');

const clips = async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase();
  const exportType = req.query.exportType as string;
  const { headers: userHeaders, body } = req;

  if (!exportType) {
    return res.status(400).send({
      error: 'exportType is required',
    });
  }

  if (!Object.keys(ExportTypes).includes(exportType)) {
    return res.status(400).send({
      error: `exportType must be one of ${Object.keys(ExportTypes).join(', ')}`,
    });
  }

  // get their twitch user data
  const userData = await getTwitchUserData(userHeaders.authorization);
  const { id: twitchId } = userData;
  // accounts for both the clip and mobile export types
  const videoId = body?.videoId ? body.videoId : body?.ClipData?.videoId;

  if (!videoId) {
    return res.status(400).send({
      error: 'Missing videoId',
    });
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', userHeaders.authorization || '');

  const exportURL = exportType === ExportTypes.mobile ? MOBILE_EXPORT_URL : CLIP_EXPORT_URL;
  const resp = await fetch(exportURL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const uploadType = body?.uploadToYoutube ? 'youtube' : ExportTypes[exportType];

  if (resp.ok) {
    const data = await resp.json();
    const exportObject: Export = {
      ...data,
      videoId,
      uploadType,
      twitchId,
    };
    const { insertedId } = await db.collection('exports').insertOne(exportObject);
    return res.status(200).json({ ...data, insertedId });
  }

  return res.status(resp.status).json(await resp.json());
};

export default clips;
