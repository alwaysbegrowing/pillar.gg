import fetch from 'node-fetch';

const { HUBSPOT_API_KEY } = process.env;

const HUBSPOT_API_URL = `https://api.hubspot.com/events/v3/send?hapikey=${HUBSPOT_API_KEY}`;

export interface IHubspotEvent {
  eventName: string;
  email?: string;
  utk?: string;
  objectId?: string;
  properties: any;
}

export const logCustomEvent = async (event: IHubspotEvent) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(event),
  };

  // send request
  const response = await fetch(HUBSPOT_API_URL, options);

  return response.ok;
};

export default (eventName: string, contactId: string, email: string) => {
  const hubspotEvent: IHubspotEvent = {
    eventName,
    email,
    objectId: contactId,
    properties: {}, // if we need more properties, we can add them here
  };

  return logCustomEvent(hubspotEvent);
};
