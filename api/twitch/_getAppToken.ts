/**
 * getAppToken manages and retains a Twitch App Access Token for use with webhooks
 * Reference - https://dev.twitch.tv/docs/authentication#types-of-tokens under "App access token"
 */

const fetch = require('node-fetch');
let cachedAccessToken: any = null;

/**
 * This function uses cachedAccessToken against twitch's validate endpoint to see if it can be used
 * @returns bool representing validity of current access token
 * reference documentation: https://dev.twitch.tv/docs/authentication#validating-requests
 */
async function isAccessTokenValid() {
  const url = `https://id.twitch.tv/oauth2/validate`;
  console.log('validating');
  // fetch status of access token
  const isValid = await fetch(url, {
    mode: "no-cors",
    method: "GET",
    headers: {
      'Authorization': `OAuth ${cachedAccessToken}`
    }
  })
  const json = await isValid.json();
  // read "status" from response containing an HTTP code: 200=OK, 401=invalid
  if(json.status === 200){
    return(true);
  }
  return(false);
}

/**
 * This function performs the necessary handling to return a valid access token
 * @returns app access token
 */
async function connectCached() {
  // If the database connection is cached,
  // use it instead of creating a new connection
  console.log('cached:', cachedAccessToken);
  if (cachedAccessToken) {
    const isValid = await isAccessTokenValid();
    if(isValid) {
      return cachedAccessToken;
    }
  }

  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

  try {
    // get a new app access token from twitch
    const tokenData = await fetch(url, {
      mode: "no-cors",
      method: "POST"
    });
    const resp = await tokenData.json();
    cachedAccessToken = resp.access_token;
    return(cachedAccessToken);
  } catch(e) {
    return null;
  };
};

module.exports = connectCached;
