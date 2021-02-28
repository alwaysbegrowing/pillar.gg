const fetch = require('node-fetch');

// This function takes in the access token and returns
// the username and email associated with the account in an object
const refreshYTAccessToken = async (refreshToken) => {
  const url = `https://oauth2.googleapis.com/token?`+
              `refresh_token=${refreshToken}&`+
              `client_id=${process.env.YOUTUBE_CLIENT_ID}&`+
              `client_secret=${process.env.YOUTUBE_CLIENT_SECRET}&`+
              `grant_type=refresh_token`;
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
    return({access_token: json.access_token, expires_in: json.expires_in, scope: json.scope, token_type: json.token_type});
  }))
  .catch(() => {
    return null;
  });
  return data;
};

module.exports = refreshYTAccessToken;
