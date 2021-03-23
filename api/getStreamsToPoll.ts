import { NowRequest, NowResponse } from '@vercel/node';

const getStreamsToPoll = async (req: NowRequest, res: NowResponse) => {
  try {
    if (req.body.server_token === process.env.NUMBERCRUNCH_TOKEN) {
      const db = await connectToDatabase();

      // search database to get streamers
      const results = await db
        .collection('users')
        .find({
          twitch_username: {
            $in: ['ludwig', 'shroud', 'sykkuno', 'tommyinnit', 'rocketleague', 'im_baguette'],
          },
        })
        .toArray();

      // get array of twitch users by username that exist in the database
      const streamersInDB: [string] = results.map(({ twitch_username }: any) => twitch_username);

      res.status(200).json(streamersInDB);
    } else {
      res.status(401).send('Incorrect server token');
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getStreamsToPoll;
