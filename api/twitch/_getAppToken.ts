/**
 * getAppToken manages and retains a Twitch App Access Token for use with webhooks
 * Reference - https://dev.twitch.tv/docs/authentication#types-of-tokens under "App access token"
 */

let cachedAccessToken: any = null;

/**
 * This function uses cachedAccessToken against twitch's validate endpoint to see if it can be used
 * @returns bool representing validity of current access token
 * reference documentation: https://dev.twitch.tv/docs/authentication#validating-requests
 */
async function isAccessTokenValid() {
  const url = `https://id.twitch.tv/oauth2/validate`;

  // fetch status of access token
  const isValid = fetch(url, {
    mode: "no-cors",
    method: "GET",
    headers: {
      'Authorization': `OAuth ${cachedAccessToken}`
    }
  })
  .then(resp => resp.json())
  // read "status" from response containing an HTTP code: 200=OK, 401=invalid
  .then(json => {
    if(json.status === 200){
      return(true);
    }
    return(false);
  })
  return(isValid);
}

/**
 * This function performs the necessary handling to return a valid access token
 * @returns app access token
 */
async function connectCached() {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedAccessToken) {
    console.log('calling isAccessTokenValid');
    const isValid = await isAccessTokenValid();
    if(isValid) {
      console.log('isValid returned true');
      return cachedAccessToken;
    }
  }

  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

  // get a new app access token from twitch
  const newAccessToken = await fetch(url, {
    mode: "no-cors",
    method: "POST"
  })
  .then((resp => resp.json()))
  .then((json => {
    return(json.access_token);
  }))
  .catch((e) => {
    return null;
  });

  cachedAccessToken = newAccessToken;
  return(cachedAccessToken);
};

module.exports = connectCached;
