const fetch = require('node-fetch');

// This function takes in the access token and returns
// the username and email associated with the account in an object
const getUserTwitchCredentials = async (code) => {
  const url = `https://id.twitch.tv/oauth2/token?`+
              `code=${code}&`+
              `client_id=${process.env.TWITCH_CLIENT_ID}&`+
              `client_secret=${process.env.TWITCH_CLIENT_SECRET}&`+
              // `redirect_uri=http://localhost:8000/TwitchAuth&`+
              `redirect_uri=https://dev.pillar.gg/TwitchAuth&`+
              `grant_type=authorization_code`;

  const data = await fetch(url, {
    mode: "no-cors",
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then((res => {
    if(!res.ok) {
      return(null);
    }
    return(res);
  }))
  .then((resp => resp.json()))
  .then((json => {
    // eslint-disable-next-line
    return({access_token: json.access_token, refresh_token: json.refresh_token, scope: json.scope, token_type: json.token_type, expires_in: json.expires_in});
  }))
  .catch(() => {
    return null;
  });
  return data;
};

module.exports = getUserTwitchCredentials;
