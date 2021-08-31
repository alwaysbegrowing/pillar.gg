import { Client } from '@hubspot/api-client';

const { HUBSPOT_API_KEY } = process.env;

export type UpdateContactInput = Record<string, string>;

const updateContact = async (contactId: string, contactProperties: UpdateContactInput) => {
  const properties = { properties: contactProperties };

  const hubspotClient = new Client({ apiKey: HUBSPOT_API_KEY });

  const response = await hubspotClient.crm.contacts.basicApi.update(contactId, properties);
  return response;
};

export default updateContact;
