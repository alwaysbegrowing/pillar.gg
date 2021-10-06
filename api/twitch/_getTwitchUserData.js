import fetch from 'node-fetch';

const { NEXT_PUBLIC_TWITCH_CLIENT_ID } = process.env;

const getTwitchUserData = async (accessToken) => {
  const url = `https://api.twitch.tv/helix/users`;

  try {
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': NEXT_PUBLIC_TWITCH_CLIENT_ID,
      },
    });
    const result = await resp.json();
    if (resp.ok) {
      const [userData] = result.data;
      return userData;
    }
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export default getTwitchUserData;
