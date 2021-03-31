/*

getUserAccessInfo is called to verify user privleges across the web app.
This function accepts a twitch_access_token (stored in local storage of the web app) which will
either be of type string or null.

If the string matches an existing twitch access token in the mongo users collection, then the following
information is returned in compliance with <API.CurrentUser> interface

avatar: string;
name: string;
user_id: string;
access: 'none' | 'free' | 'basic' | 'pro';
youtubeLinked: true | false

*/

import type { VercelRequest, VercelResponse } from '@vercel/node';

// eslint-disable-next-line

const connectToDatabase = require('../_connectToDatabase');

const getUserAccessInfo = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const db = await connectToDatabase();

    // look up user
    // eslint-disable-next-line
    const user_result = await db
      .collection('users')
      .findOne({ 'twitch_credentials.access_token': req.body.twitch_access_token });

    if (!user_result) {
      res.status(401).send('invalid twitch_access_token');
    } else {
      const isYoutubeLinked = !!user_result.youtube_credentials;
      const userInfo = {
        avatar: user_result.twitch_profile_picture,
        name: user_result.twitch_username,
        // eslint-disable-next-line
        user_id: user_result._id,
        access: user_result.plan,
        youtubeLinked: isYoutubeLinked,
      };
      res.status(200).send(userInfo);
    }
  } catch {
    res.status(400).send('error, bad request');
  }
};

module.exports = getUserAccessInfo;
