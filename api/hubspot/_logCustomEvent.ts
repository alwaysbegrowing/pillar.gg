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

export default async (event: IHubspotEvent) => {
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
