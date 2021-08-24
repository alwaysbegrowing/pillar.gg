import fetch from 'node-fetch';

const { HUBSPOT_API_KEY } = process.env;

// converted to node-fetch
// original: https://developers.hubspot.com/docs/api/analytics/events#endpoint?spec=POST-/events/v3/send

// url for custom events
const HUBSPOT_API_URL = `https://api.hubspot.com/events/v3/send?hapikey=${HUBSPOT_API_KEY}`;

// hubspot event object
export interface IHubspotEvent {
  eventName: string;
  email?: string;
  utk?: string;
  objectId?: string;
  properties: any;
}

// exported log function
export default async (event: IHubspotEvent) => {
  // fetch options
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
