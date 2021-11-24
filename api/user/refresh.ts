import type { VercelRequest, VercelResponse } from '@vercel/node';
import refreshTwitchCredentials from '../twitch/_refreshTwitchAuth';
import getTwitchUserData from '../twitch/_getTwitchUserData';
import addHubspotContact from '../hubspot/_addContact';
import logHubspotEvent from '../hubspot/_logCustomEvent';
import { LOGIN_EVENT } from 'api/hubspot/_customEvents';

const refresh = async (req: VercelRequest, res: VercelResponse) => {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ error: 'No token received' });
  }

  const credentials = await refreshTwitchCredentials(token);

  const twitchUserData = await getTwitchUserData(credentials.access_token);

  const hubspotID = await addHubspotContact(twitchUserData);

  await logHubspotEvent(LOGIN_EVENT, hubspotID.hubspot_contact_id, twitchUserData.email);

  return res.json(credentials);
};

export default refresh;
