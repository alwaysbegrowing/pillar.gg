import type { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

enum Status {
  Missing = 'DOES_NOT_EXIST',
  Processing = 'CLIP_IS_PROCESSING',
}

const checkForClips = async (req: NowRequest, res: NowResponse) => {
  try {
    const platformVideoId = req.body.platform_video_id;
    const db = await connectToDatabase();

    const stream_result = await db
      .collection('streams')
      .findOne({ platform_video_id: String(platformVideoId) });
    if (!stream_result) {
      res.status(200).json({ status: Status.Missing });
    } else {
      const clips_result = await db
        .collection('clips')
        .find({ 'original_video.platform_video_id': String(platformVideoId) })
        .toArray();

      const isClipProcessing = clips_result.map((val: any) => val.s3_url === null).includes(true);

      if (isClipProcessing) {
        // TODO: count up how many clips are processing, and tell the user how many clips are left to process (and give them an ETA in minutes)
        res.status(200).json({ status: Status.Processing });
      } else {
        res.status(200).json({ status: Status.Processing, data: clips_result });
      }
    }
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};

module.exports = checkForClips;
