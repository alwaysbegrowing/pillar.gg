import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';
import addHubspotContact from '../hubspot/_addContact';
import getTwitchModeratorData from '../twitch/_getTwitchModeratorData';
import logHubspotEvent from '../hubspot/_logCustomEvent';
import { SIGNUP_EVENT, LOGIN_EVENT } from '../hubspot/_customEvents';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const connectToDatabase = require('../_connectToDatabase');
const getUserTwitchCredentials = require('../twitch/_getUserTwitchCredentials');

const snsCredentials = {
  accessKeyId: process.env.SIGNUPEVENT_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.SIGNUPEVENT_AWS_SECRET_ACCESS_KEY || '',
};

const login = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { code } = req.query;
    if (!code) {
      res.status(401).send('ERROR: NO CODE RECEIVED');
    }

    const credentials = await getUserTwitchCredentials(code);

    const twitchUserData = await getTwitchUserData(credentials.access_token);

    const hubspotID = await addHubspotContact(twitchUserData);

    const db = await connectToDatabase();

    const filter = {
      twitch_id: twitchUserData.id,
    };
    const options = { upsert: true };
    const updateDoc = {
      $set: { ...twitchUserData, ...hubspotID },
    };

    const resp = db.collection('users').updateOne(filter, updateDoc, options);

    // if resp has an upserted value, then we have a new user
    const isNewUser = resp.upsertedCount > 0;

    if (isNewUser) {
      
      const twitchModeratorData = await getTwitchModeratorData(
        credentials.access_token,
        twitchUserData.id,
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const moderator_id of twitchModeratorData) {
        // eslint-disable-next-line no-await-in-loop
        await db
          .collection('moderators')
          .updateOne(
            { twitch_id: moderator_id.user_id },
            {
              $set: { user_name: moderator_id.user_name },
              $push: {
                mod_for: { id: twitchUserData.id, display_name: twitchUserData.display_name },
              },
            },
            options,
          );
      }

      const sns = new SNSClient({ region: 'us-east-1', credentials: snsCredentials });

      const command = new PublishCommand({
        Message: 'Pillar has a new user!',
        MessageAttributes: {
          TwitchId: {
            DataType: 'String',
            StringValue: twitchUserData.id,
          },
        },
        TopicArn: process.env.SNS_TOPIC_ARN,
      });

      await sns.send(command);
      await logHubspotEvent(SIGNUP_EVENT, hubspotID.hubspot_contact_id, twitchUserData.email);
    } else {
      await logHubspotEvent(LOGIN_EVENT, hubspotID.hubspot_contact_id, twitchUserData.email);
    }

    return res.status(200).json(credentials);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = login;
