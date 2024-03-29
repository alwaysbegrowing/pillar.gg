import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';
import addHubspotContact from '../hubspot/_addContact';
import getTwitchModeratorData from '../twitch/_getTwitchModeratorData';
import logHubspotEvent from '../hubspot/_logCustomEvent';
import { SIGNUP_EVENT, LOGIN_EVENT } from '../hubspot/_customEvents';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const connectToDatabase = require('../_connectToDatabase');
const getUserTwitchCredentials = require('../twitch/_getUserTwitchCredentials');

const { SIGNUP_SNS_TOPIC_ARN, SIGNUPEVENT_AWS_ACCESS_KEY_ID, SIGNUPEVENT_AWS_SECRET_ACCESS_KEY } =
  process.env;

if (!SIGNUP_SNS_TOPIC_ARN || !SIGNUPEVENT_AWS_ACCESS_KEY_ID || !SIGNUPEVENT_AWS_SECRET_ACCESS_KEY) {
  throw new Error('misisng env variables');
}
const snsCredentials = {
  accessKeyId: SIGNUPEVENT_AWS_ACCESS_KEY_ID,
  secretAccessKey: SIGNUPEVENT_AWS_SECRET_ACCESS_KEY,
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
    const sns = new SNSClient({ region: 'us-east-1', credentials: snsCredentials });

    // this topic should probably be renamed - we want to send this on every login to refresh the users CCCs
    const command = new PublishCommand({
      Message: 'Pillar has a new user!',
      MessageAttributes: {
        TwitchId: {
          DataType: 'String',
          StringValue: twitchUserData.id,
        },
      },
      TopicArn: SIGNUP_SNS_TOPIC_ARN,
    });
    console.log('about to send sns command', { command });
    await sns.send(command);
    console.log('sent SNS command');

    const resp = await db.collection('users').updateOne(filter, updateDoc, options);
    const isNewUser = resp.upsertedCount > 0;
    console.log('is the user new?', { isNewUser });
    if (isNewUser) {
      const twitchModeratorData = await getTwitchModeratorData(
        credentials.access_token,
        twitchUserData.id,
      );

      const bulk = db.collection('moderators').initializeUnorderedBulkOp();
      // eslint-disable-next-line no-restricted-syntax
      for (const moderator_id of twitchModeratorData) {
        bulk
          .find({ twitch_id: moderator_id.user_id })
          .upsert()
          .update({
            $setOnInsert: { twitch_id: moderator_id.user_id },
            $set: { user_name: moderator_id.user_name },
            $push: {
              mod_for: { id: twitchUserData.id, display_name: twitchUserData.display_name },
            },
          });
      }
      bulk.execute();

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
