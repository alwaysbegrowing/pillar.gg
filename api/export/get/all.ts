import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SFNClient, GetExecutionHistoryCommand } from '@aws-sdk/client-sfn';

import parseSfnEvents from './_parseSfnEvents';
import type { Export } from '../../_types';
import getTwitchUserData from '../../twitch/_getTwitchUserData';

const connectToDatabase = require('../../_connectToDatabase');

const { AWS_SFN_REGION, AWS_SFN_ACCESS_KEY, AWS_SFN_SECRET_KEY } = process.env;

const credentials =
  AWS_SFN_ACCESS_KEY && AWS_SFN_SECRET_KEY
    ? {
        accessKeyId: AWS_SFN_ACCESS_KEY as string,
        secretAccessKey: AWS_SFN_SECRET_KEY as string,
      }
    : undefined;

const getByTwitchId = async (req: VercelRequest, res: VercelResponse) => {
  const { userId: reqTwitchId, page, perPage } = req.query;
  const { headers: userHeaders } = req;

  const userData = await getTwitchUserData(userHeaders.authorization);
  const { id: twitchIdAuth } = userData;

  if (!twitchIdAuth) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  const twitchId = reqTwitchId || twitchIdAuth;

  const db = await connectToDatabase();

  const sfn = new SFNClient({
    region: AWS_SFN_REGION,
    credentials,
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

  // get the total number of exports
  const totalExports = await db
    .collection('exports')
    .find({
      twitchId,
    })
    .count();

  const exportDataPromises = videoExports.map(async (video: Export) => {
    const command = new GetExecutionHistoryCommand({
      executionArn: video.executionArn,
      maxResults: 100,
    });

    const { events } = await sfn.send(command);

    if (!events) {
      return null;
    }

    const parsedEvents = parseSfnEvents(events, video.uploadType);

    return { ...video, ...parsedEvents, startDate: new Date(video.startDate * 1000) };
  });

  const exportData = await Promise.all(exportDataPromises);

  return res.status(200).json({
    totalCount: totalExports,
    exports: exportData,
  });
};

export default getByTwitchId;
