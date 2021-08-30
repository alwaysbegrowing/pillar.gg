// import vercel types
import type { VercelRequest, VercelResponse } from '@vercel/node';

// import hubspot event type
import type { IHubspotEvent } from './_logCustomEvent';
import type { UpdateContactInput } from './_updateContact';
import { MAJOR_EVENT } from './_customEvents';
import logCustomEvent from './_logCustomEvent';
import updateContact from './_updateContact';

const connectToDatabase = require('../_connectToDatabase');

const majorEvent = async (req: VercelRequest, res: VercelResponse) => {
  // get hubspotID from req query
  const { twitchId } = req.query;
  const { videoId } = req.body;

  // match hubspotID to hubspot_contact_id in database
  const db = await connectToDatabase();
  const contact = await db.collection('users').findOne({
    twitch_id: twitchId,
  });

  // if contact is not found, do nothing
  if (!contact?.email || !contact?.hubspot_contact_id) {
    return res.status(204).send({});
  }

  // get email from contact
  const { email, hubspot_contact_id: contactId } = contact;

  // create hubspot event object
  const event: IHubspotEvent = {
    eventName: MAJOR_EVENT,
    email,
    objectId: String(contactId), // it a string or an array of strings
    properties: {
      videoId,
    },
  };

  try {
    await logCustomEvent(event);
    const properties: UpdateContactInput = { lead_status: 'qualifying' };
    await updateContact(contactId, properties);
  } catch (error) {
    return res.status(500).send({ error });
  }

  return res.status(200).send({});
};

export default majorEvent;
