import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';
import addHubspotContact from '../hubspot/_addContact';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

const connectToDatabase = require('../_connectToDatabase');
const getUserTwitchCredentials = require('../twitch/_getUserTwitchCredentials');

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

    const updatedoc = {
      $set: { ...twitchUserData, ...hubspotID },
    };

    const resp = await db.collection('users').updateOne(filter, updatedoc, {});

    // if the item in the database doesn't exist, insert it
    if (resp.result.nModified === 0) {
      const newUserData = {
        ...twitchUserData,
        ...hubspotID,
      };

      db.collection('users').insertOne(newUserData);

      const snsCredentials = {
        accessKeyId: process.env.SIGNUPEVENT_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.SIGNUPEVENT_AWS_SECRET_ACCESS_KEY || '',
      };

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

    res.status(200).json(credentials);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = login;
