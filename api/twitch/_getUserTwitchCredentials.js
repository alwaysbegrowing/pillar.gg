const fetch = require('node-fetch');
const { NODE_ENV } = process.env;

const getUserTwitchCredentials = async (code) => {
  const url =
    `https://id.twitch.tv/oauth2/token` +
    `?code=${code}` +
    `&client_id=${process.env.TWITCH_CLIENT_ID}` +
    `&client_secret=${process.env.TWITCH_CLIENT_SECRET}` +
    (NODE_ENV === 'production'
      ? `&redirect_uri=https://app.pillar.gg/TwitchAuth`
      : `&redirect_uri=http://localhost:8000/TwitchAuth`) +
    `&grant_type=authorization_code`;

  const data = await fetch(url, {
    method: 'POST',
  });

  if (!data.ok) return false;
  const authInfo = await data.json();
  return authInfo;
};

module.exports = getUserTwitchCredentials;
