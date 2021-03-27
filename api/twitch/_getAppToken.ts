/**
 * getAppToken manages and retains a Twitch App Access Token for use with webhooks
 * Reference - https://dev.twitch.tv/docs/authentication#types-of-tokens under "App access token"
 */

 import fetch from 'node-fetch';
let cachedAccessToken: any = null;

/**
 * isAccessTokenValid() uses cachedAccessToken against twitch's validate endpoint to see if it can be used
 * @returns bool representing validity of current access token
 * reference documentation: https://dev.twitch.tv/docs/authentication#validating-requests
 */
async function isAccessTokenValid() {
  const url = `https://id.twitch.tv/oauth2/validate`;
  // fetch status of access token
  const isValid = await fetch(url, {
    method: "GET",
    headers: {
      'Authorization': `OAuth ${cachedAccessToken}`
    }
  })
return isValid.ok
}

/**
 * This function performs the necessary handling to return a valid access token
 * @returns app access token
 */
async function connectCached() {
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
      method: "POST"
    });
    const resp = await tokenData.json();
    cachedAccessToken = resp.access_token;
    return(resp.access_token);
  } catch(e) {
    console.error(e)
    return null;
  };
};

export default connectCached;
