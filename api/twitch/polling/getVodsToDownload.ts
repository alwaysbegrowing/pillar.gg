import { NowRequest, NowResponse } from '@vercel/node';
const fetch = require('node-fetch');
const getUsersToPoll = require('./_getUsersToPoll');
const getAppToken = require('../_getAppToken');

const getVodsToDownload = async (req: NowRequest, res: NowResponse) => {

  try {
    const usersToPoll: [string] = await getUsersToPoll();
    const appToken = await getAppToken();
    const clientId = process.env.TWITCH_CLIENT_ID;
    let urls: [string];
    let videosToSearch: [any];

    // Loop through user id's to build an array of urls to fetch
    usersToPoll.forEach(twitch_id => {
      urls.push(`https://api.twitch.tv/helix/videos?user_id=${twitch_id}&type=archive&period=day&first=1`);
    });

    // aggregates response from Twitch API containing details of last VOD for each user
    // https://dev.twitch.tv/docs/api/reference#get-videos
    Promise.all(
      urls.map(url =>
        fetch(url, {
          method: "GET",
          mode: "no-cors",
          headers: {
            'Authorization': `Bearer ${appToken}`,
            'Client-ID': clientId,
          }
        })
        .then(res => res.json())
        .then(json => videosToSearch.push(json))
        .catch(err => {
          console.log(err);
        })
      )
    )
    .then(() => res.status(200).send(videosToSearch))

    // look for streamers with is
  }
  catch(e:any){
    res.status(500).send('Server Error ' + e);
  }
};

module.exports = getVodsToDownload;
