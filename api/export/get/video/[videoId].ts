import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SFNClient, GetExecutionHistoryCommand } from '@aws-sdk/client-sfn';
import parseSfnEvents from '../_parseSfnEvents';
import getTwitchUserData from '../../../twitch/_getTwitchUserData';

const connectToDatabase = require('../../../_connectToDatabase');

const { AWS_REGION } = process.env;

const getByVideoId = async (req: VercelRequest, res: VercelResponse) => {
  const { videoId, index } = req.query;
  const { headers: userHeaders } = req;
  const db = await connectToDatabase();

  const userData = await getTwitchUserData(userHeaders.authorization);
  const { id: twitchId } = userData;

  // this allows us to get other videos if there are duplicates
  const n = index ? parseInt(index as string) : 0;

  // Get the latest video
  const videos = await db
    .collection('exports')
    .find({ videoId }, { sort: { startDate: -1 } })
    .toArray();

  const video = n ? videos[n] : videos[0];

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  if (video?.twitchId !== twitchId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const sfn = new SFNClient({
    region: AWS_REGION as string,
  });

  const command = new GetExecutionHistoryCommand({
    executionArn: video.executionArn,
    maxResults: 1000,
  });

  const { events } = await sfn.send(command);

  if (!events) {
    return res.status(404).json({ error: 'No events found for given video.' });
  }

  const output = parseSfnEvents(events, video.uploadType);

  if (!output) {
    return res.status(404).json({ error: 'No events found for given video.' });
  }

  return res.status(200).json({ ...output, startDate: new Date(video.startDate * 1000) });
};

export default getByVideoId;
