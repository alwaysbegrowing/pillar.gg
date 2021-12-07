import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SFNClient, GetExecutionHistoryCommand } from '@aws-sdk/client-sfn';

import parseSfnEvents from './_parseSfnEvents';
import type { Export } from '../../_types';
import getTwitchUserData from '../../twitch/_getTwitchUserData';

const connectToDatabase = require('../../_connectToDatabase');

const { AWS_SFN_REGION, AWS_SFN_ACCESS_KEY, AWS_SFN_SECRET_KEY } = process.env;

if (!AWS_SFN_ACCESS_KEY || !AWS_SFN_SECRET_KEY) {
  throw new Error('AWS_SFN_ACCESS_KEY and AWS_SFN_SECRET_KEY must be set');
}

const credentials = {
  accessKeyId: AWS_SFN_ACCESS_KEY,
  secretAccessKey: AWS_SFN_SECRET_KEY,
};

const getByTwitchId = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const {
      userId: reqTwitchId,
      page,
      perPage,
      startDate,
      endDate,
      dateSort,
      platformSort,
      platform,
    } = req.query;
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

    const dateFilter =
      startDate && endDate
        ? {
            $gte: parseInt(startDate as string, 10),
            $lte: parseInt(endDate as string, 10),
          }
        : { $gte: 0 };

    const uploadType = Array.isArray(platform) ? { $in: platform } : platform || { $exists: true };

    const find = {
      twitchId,
      startDate: dateFilter,
      uploadType,
    };

    const sort = {
      startDate: parseInt(dateSort as string, 10) || -1,
    };

    if (platformSort) {
      sort[platformSort as string] = parseInt(dateSort as string, 10) || -1;
    }

    // get the from the database with the newest startDate first
    const videoExports = await db
      .collection('exports')
      .find(find)
      .sort(sort)
      .skip(skip)
      .limit(perPageNumber)
      .toArray();

    // get the total number of exports
    const totalExports = await db.collection('exports').find(find).count();

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
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
    });
  }
};

export default getByTwitchId;
