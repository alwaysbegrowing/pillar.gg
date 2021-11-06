import fetch from 'node-fetch';

const { TWITCH_CLIENT_ID } = process.env;

const getTwitchModeratorData = async (accessToken, twitchId) => {
  const url = `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${twitchId}`;

  try {
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': TWITCH_CLIENT_ID,
      },
    });
    const result = await resp.json();
    if (resp.ok) {
      const moderatorData = result.data;
      return moderatorData;
    }
    return result;
  } catch (e) {
    return e;
  }
};

export default getTwitchModeratorData;
