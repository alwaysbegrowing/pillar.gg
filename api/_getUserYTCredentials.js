const fetch = require('node-fetch');

// This function takes in the access token and returns
// the username and email associated with the account in an object
const getUserYTCredentials = async (code) => {
  const url = `https://oauth2.googleapis.com/token?`+
              `code=${code}&`+
              `client_id=${process.env.YOUTUBE_CLIENT_ID}&`+
              `client_secret=${process.env.YOUTUBE_CLIENT_SECRET}&`+
              `redirect_uri=https://dev.clipclock.stream/YoutubeAuth&`+
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
      console.log(res);
      return(null);
    }
    return(res);
  }))
  .then((resp => resp.json()))
  .then((json => {
    console.log(json);
    // TODO: Figure out how to handle expiry
    // eslint-disable-next-line
    return({access_token: json.access_token, refresh_token: json.refresh_token, scope: json.scope, token_type: json.token_type, expires_in: json.expires_in});
  }))
  .catch(() => {
    return null;
  });
  return data;
};

module.exports = getUserYTCredentials;
