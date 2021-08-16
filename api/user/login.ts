import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';
import addHubspotContact from '../hubspot/_addContact';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

const connectToDatabase = require('../_connectToDatabase');
const getUserTwitchCredentials = require('../twitch/_getUserTwitchCredentials');

const snsCredentials = {
  accessKeyId: process.env.SIGNUPEVENT_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.SIGNUPEVENT_AWS_SECRET_ACCESS_KEY || '',
};

const login = async (req: VercelRequest, res: VercelResponse) => {
  // if either accessKeyId or secretAccessKey is missing, return error
  if (!snsCredentials.accessKeyId || !snsCredentials.secretAccessKey) {
    return res.status(500).json({}).end();
  }
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

    const updatedoc = {
      $set: { ...twitchUserData, ...hubspotID },
    };

    const resp = db.collection('users').updateOne(filter, updatedoc, options);

    // if resp has an upserted value, then we have a new user
    if (resp.upsertedCount) {
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
    }

    return res.status(200).json(credentials);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = login;
