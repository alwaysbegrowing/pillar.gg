import fetch from 'node-fetch';

const { TWITCH_CLIENT_ID } = process.env;

const getTwitchUserData = async (accessToken) => {
  const url = `https://api.twitch.tv/helix/users`;

  const token = accessToken.includes('Bearer') ? accessToken : `Bearer ${accessToken}`;

  try {
    const resp = await fetch(url, {
      headers: {
        Authorization: token,
        'Client-ID': TWITCH_CLIENT_ID,
      },
    });
    const result = await resp.json();
    if (resp.ok) {
      const [userData] = result.data;
      return userData;
    }
    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return e;
  }
};

export default getTwitchUserData;
