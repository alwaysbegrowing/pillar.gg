const fetch = require('node-fetch');

const getTwitchUserData = async (access_token) => {
  const url = `https://api.twitch.tv/kraken/user`;
  const client_id = process.env.TWITCH_CLIENT_ID;

  try {
    const data = await fetch(url, {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${access_token}`,
        'Client-ID': client_id,
      },
    });
    if (!data.ok) return null;
    const resp = await data.json();
    const { email, name, _id: twitch_id, logo: twitch_profile_picture } = resp;
    return { email, name, twitch_id, twitch_profile_picture };
  } catch (e) {
    return e;
  }
};

module.exports = getTwitchUserData;
