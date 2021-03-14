const getAppToken = require('../_getAppToken');

const createSubscription = async (twitch_id:string, local_testing:boolean = false) => {
  const url = `https://api.twitch.tv/helix/eventsub/subscriptions`;
  let callback_url;
  if(local_testing){
    callback_url = "https://308d836d5122.ngrok.io/api/twitch/webhooks/callback";
  }
  else {
     callback_url = "https://dev.pillar.gg/api/twitch/webhooks/callback";
  }
  if(twitch_id == undefined || twitch_id == null || twitch_id == '') {
    // return false because information is valid
    return false;
  }
  const client_id = process.env.TWITCH_CLIENT_ID;
  const bearer_token = await getAppToken();
  console.log(bearer_token);

  const isWebhookInitiated = await fetch(url, {
    mode: "no-cors",
    method: "POST",
    headers: {
      'Client-ID': client_id,
      'Authorization': `Bearer ${bearer_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "type": "stream.offline",
      "version":"1",
      "condition": {
        "broadcaster_user_id": twitch_id
      },
      "transport": {
        "method": "webhook",
        "callback": callback_url,
        "secret": "06izzgHDjofKHtlX2Ep2uT7w2QzqgI17TLL4LJkAsimrYi7vvV" // random string - not secret to us
      }
    })
  })
  .then((resp => resp.json()))
  .then((json => {
    console.log(JSON.stringify(json));
    if(json.data[0].status == "webhook_callback_verification_pending") {
      return(true);
    }
    return(false);
  }))
  .catch((e) => {
    console.log(e.message);
    return false;
  });
  return(isWebhookInitiated);
};

module.exports = createSubscription;
