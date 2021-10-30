import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SFNClient, GetExecutionHistoryCommand } from '@aws-sdk/client-sfn';

import parseSfnEvents from './_parseSfnEvents';
import type { Export } from '../../_types';

const connectToDatabase = require('../../_connectToDatabase');

const { AWS_REGION } = process.env;

const getByTwitchId = async (req: VercelRequest, res: VercelResponse) => {
  const { twitchId, page, perPage } = req.query;

  if (!twitchId) {
    res.status(400).send('Missing twitchId');
    return;
  }

  const db = await connectToDatabase();

  const sfn = new SFNClient({
    region: AWS_REGION as string,
  });

  const pageNumber = parseInt(page as string, 10) || 1;
  const perPageNumber = parseInt(perPage as string, 10) || 10;

  const skip = (pageNumber - 1) * perPageNumber;

  // get the from the database with the newest startDate first
  const videoExports = await db
    .collection('exports')
    .find({
      twitchId,
    })
    .sort({
      startDate: -1,
    })
    .skip(skip)
    .limit(perPageNumber)
    .toArray();

  const exportDataPromises = videoExports.map(async (video: Export) => {
    const command = new GetExecutionHistoryCommand({
      executionArn: video.executionArn,
      maxResults: 1000,
    });

    const { events } = await sfn.send(command);

    if (!events) {
      return null;
    }

    const parsedEvents = parseSfnEvents(events, video.uploadType);

    return { ...parsedEvents, startDate: new Date(video.startDate * 1000) };
  });

  const exportData = await Promise.all(exportDataPromises);

  return res.status(200).json(exportData);
};

export default getByTwitchId;