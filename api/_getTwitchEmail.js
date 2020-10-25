const fetch = require('node-fetch');

const getTwitchEmail = async (access_token) => {
  const url = `https://api.twitch.tv/kraken/user`;
  const client_id = process.env.TWITCH_CLIENT_ID;

  // fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  const passable_headers = {
    Accept: 'application/vnd.twitchtv.v5+json',
    Authorization: `OAuth ${access_token}`,
    'Client-Id': client_id,
  };

  fetch(url, {
    method: 'GET',
    headers: passable_headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failure');
      }
      res.json();
    })
    .then((data) => {
      return data;
    })
    .catch(() => {
      return null;
    });

  return 'not_implemented';
};

module.exports = getTwitchEmail;
