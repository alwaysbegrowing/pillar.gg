const fetch = require('node-fetch');

// This function takes in the access token and returns
// the username and email associated with the account in an object
const getTwitchUserData = async (access_token) => {
  const url = `https://api.twitch.tv/kraken/user`;
  const client_id = process.env.TWITCH_CLIENT_ID;
  
  const data = await fetch(url, {
    mode: "no-cors",
    method: "GET",
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': `OAuth ${access_token}`,
      'Client-ID': client_id,
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
    return({email: json.email, name: json.name, twitch_id: json._id, twitch_profile_picture: json.logo});
  }))
  .catch(() => {
    return null;
  });
  return data;
};

module.exports = getTwitchUserData;
