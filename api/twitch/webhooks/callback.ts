/**
 * This function represents the callback URL for twitch to send webhooks to.
 * Twitch expects a HTTP response of 200 to confirm that the message has been received
 */
const sendNewVodToQueue = require('./_sendNewVodToQueue');

import { NowRequest, NowResponse } from '@vercel/node';
const fetch = require('node-fetch');

const callback = async (req: NowRequest, res: NowResponse) => {
  if(req.body.subscription.status == 'webhook_callback_verification_pending') {
    // TODO: verify Twitch-Eventsub-Message-Signature
    // https://dev.twitch.tv/docs/eventsub#verify-a-signature
    res.status(200).send(req.body.challenge);
  }
  // if streamer goes offline, call function to look for vods newer than the timestamp provided in the request.
  else if(req.body.subscription.type == 'stream.offline'){
    sendNewVodToQueue(req.body.event.broadcaster_user_id, req.body.subscription.created_at);
    res.status(200).send('success');
  }
  res.status(200).send('success');
};

module.exports = callback;
