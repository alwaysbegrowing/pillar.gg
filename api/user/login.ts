import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';
import addHubspotContact from '../hubspot/_addContact';

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
      hubspot_contact_id: hubspotID.hubspot_contact_id,
    };
    const options = { upsert: true };
    const updatedoc = {
      $set: Object.assign(twitchUserData, hubspotID),
    };

    db.collection('users').updateOne(filter, updatedoc, options);
    res.status(200).json(credentials);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = login;
