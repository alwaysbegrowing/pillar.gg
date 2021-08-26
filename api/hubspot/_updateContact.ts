import * as hubspot from '@hubspot/api-client';

// get hubspot api key from env
const { HUBSPOT_API_KEY } = process.env;

export type UpdateContactInput = Record<string, string>;

// contactProperties will look like this most of the time:
// {
//  "lead_status": "qualifying"
// }
const updateContact = async (contactId: string, contactProperties: UpdateContactInput) => {
  // create properties object
  const properties = { properties: contactProperties };

  // create hubspot api client
  const hubspotClient = new hubspot.Client({ apiKey: HUBSPOT_API_KEY });

  const response = await hubspotClient.crm.contacts.basicApi.update(contactId, properties);
  return response;
};

export default updateContact;
