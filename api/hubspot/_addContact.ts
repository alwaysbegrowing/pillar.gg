import { Client } from '@hubspot/api-client';

const { HUBSPOT_API_KEY } = process.env;

interface TwitchUserData {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
  created_at: string;
}

export default async (twitchUserData: TwitchUserData) => {
  try {
    const contactObj = {
      properties: {
        twitch_id: twitchUserData.id,
        twitch_login_name: twitchUserData.login,
        twitch_display_name: twitchUserData.display_name,
        twitch_account_type: twitchUserData.type, // might need to test how sending "" works
        twitch_broadcaster_type: twitchUserData.broadcaster_type,
        twitch_description: twitchUserData.description,
        twitch_profile_image_url: twitchUserData.profile_image_url,
        twitch_offline_image_url: twitchUserData.offline_image_url,
        twitch_view_count: String(twitchUserData.view_count),
        email: twitchUserData.email
      },
    };
    const hubspotClient = new Client({ apiKey: HUBSPOT_API_KEY });
    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);
    return { hubspot_contact_id: createContactResponse.body.id };
  } catch (e: any) {
    if (e.statusCode === 409) {
      const existingHubspotClientID = e.response.body.message.replace(
        'Contact already exists. Existing ID: ',
        '',
      );
      return { hubspot_contact_id: existingHubspotClientID };
    }
    return { hubspot_contact_id: null };
  }
};
