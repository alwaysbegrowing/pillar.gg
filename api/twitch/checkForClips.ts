import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');

/**
 * This is
 * @param req body contains userID of user in MongoDB Users Table
 * @param res status of pass or fail and the vod list
 */
const checkForClips = async (req: NowRequest, res: NowResponse) => {
  try {
    // grab video_platform_id from the request
    const platformVideoId = req.body.platform_video_id;
    // establish connection to mongo
    const db = await connectToDatabase();

    // check if stream exists in database
    const stream_result = await db
      .collection('streams')
      .findOne({ platform_video_id: String(platformVideoId) });
    // check if it exists or not. if not, send status response to front end. if it does, check clips collection if clips are done processing.
    if (!stream_result) {
      res.status(200).json({ status: 'DOES_NOT_EXIST' });
    } else {
      const clips_result = await db
        .collection('clips')
        .find({ 'original_video.platform_video_id': String(platformVideoId) })
        .toArray();

      console.log(clips_result);
      // check if s3_url has null value or not. if its null, that means clip is currently being processed.
      const clipIsProcessing = clips_result.map((val) => val.s3_url === null).includes(true);

      // if an instance is found where clip is processing, send back loading response
      if (clipIsProcessing) {
        // TODO: count up how many clips are processing, and tell the user how many clips are left to process (and give them an ETA in minutes)
        res.status(200).json({ status: 'CLIP_IS_PROCESSING' });
      } else {
        // all clips are done processing, so return the clip array to client for display
        res.status(200).json({ status: 'FINISHED', data: clips_result });
      }
    }
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};

module.exports = checkForClips;
