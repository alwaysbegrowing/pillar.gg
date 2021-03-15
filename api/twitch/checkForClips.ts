import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

enum Status {
  Missing = 'DOES_NOT_EXIST',
  Processing = 'CLIP_IS_PROCESSING',
  Finished = 'FINISHED',
}

interface Clip {
  s3_url?: string;
}

interface ReqBody {
  platform_video_id: number;
}

const db = await connectToDatabase();

const findClips = async (platformVideoId: string) => {
  const clips_result = await db
    .collection('clips')
    .find({ 'original_video.platform_video_id': platformVideoId })
    .toArray();

  const isClipProcessing = clips_result.find((val: Clip) => val.s3_url != null);
  return [isClipProcessing, clips_result];
};

const checkClipMakingStatus = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { platform_video_id } = req.body as ReqBody;
    const platformVideoId = String(platform_video_id);

    const isStreamMissing =
      (await db.collection('streams').find({ platform_video_id }).count()) === 0;
    if (isStreamMissing) {
      return res.status(200).json({ status: Status.Missing });
    }

    const [isClipProcessing, data] = await findClips(platformVideoId);
    if (isClipProcessing) {
      // TODO: count up how many clips are processing, and tell the user how many clips are left to process (and give them an ETA in minutes)
      return res.status(200).json({ status: Status.Processing });
    }
    return res.status(200).json({ status: Status.Finished, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = checkClipMakingStatus;
