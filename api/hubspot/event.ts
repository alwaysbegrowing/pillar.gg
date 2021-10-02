import type { VercelRequest, VercelResponse } from '@vercel/node';

import type { IHubspotEvent } from './_logCustomEvent';
import type { UpdateContactInput } from './_updateContact';
import * as events from './_customEvents';
import { logCustomEvent } from './_logCustomEvent';
import updateContact from './_updateContact';

const connectToDatabase = require('../_connectToDatabase');

const hubspotEvent = async (req: VercelRequest, res: VercelResponse) => {
  const { twitchId, contactProperties, eventName } = req.body;

  const db = await connectToDatabase();
  const contact = await db.collection('users').findOne({
    twitch_id: twitchId,
  });

  if (!contact?.email || !contact?.hubspot_contact_id) {
    return res.status(400).send({
      message: `Contact not found. Contact ID: ${contact?.hubspot_contact_id}`,
    });
  }

  const { email, hubspot_contact_id: contactId } = contact;

  const event: IHubspotEvent = {
    eventName: events[eventName],
    email,
    objectId: String(contactId), // objectId is a string or an array of strings
    properties: contactProperties,
  };

  try {
    await logCustomEvent(event);
    const properties: UpdateContactInput = { hs_lead_status: 'QUALIFYING' };
    await updateContact(contactId, properties);
  } catch (error) {
    return res.status(500).send({ error });
  }

  return res.status(200).send({});
};

export default hubspotEvent;
