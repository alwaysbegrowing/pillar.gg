import { NowRequest, NowResponse } from '@vercel/node';
const fetch = require('node-fetch');
const getUsersToPoll = require('./_getUsersToPoll');
const getAppToken = require('../_getAppToken');
const insertVideoDetails = require('./_insertVideoDetails');
const insertVodToQueue = require('./_insertVodToQueue');
const getVodsToDownload = async (req: NowRequest, res: NowResponse) => {

  try {
    const usersToPoll: string[] = await getUsersToPoll();
    const appToken = await getAppToken();
    const clientId = process.env.TWITCH_CLIENT_ID;
    let urls: string[] = [];
    // let videosToSearch: any[] = [];

    // Loop through user id's to build an array of urls to fetch
    usersToPoll.forEach(twitch_id => {
      urls.push(`https://api.twitch.tv/helix/videos?user_id=${twitch_id}&type=archive&period=day&first=1`);
    });

    // aggregates response from Twitch API containing details of last VOD for each user
    // https://dev.twitch.tv/docs/api/reference#get-videos
    const newestVideoDetails:any[] = urls.map(async url => {
      const newestVideo = await fetch(url, {
        method: "GET",
        mode: "no-cors",
        headers: {
          'Authorization': `Bearer ${appToken}`,
          'Client-ID': clientId,
        }
      })
      return newestVideo.json();
    })

    // strip out relevant part of response
    const videosToSearch:any[] = (await Promise.all(newestVideoDetails)).map(videoDetails => {
      return videoDetails.data[0];
    });

    const videosToQueue:any[] = await insertVideoDetails(videosToSearch);

    const videoAddedStatusPromise:Promise<boolean>[] = videosToQueue.map(async video => {
      const response:boolean = await insertVodToQueue(video);
      return(response);
    })

    const videoAddedStatus = (await Promise.all(videoAddedStatusPromise)).map(videoStatus => {
      console.log('in videoAddedStatus');
      console.log(videoStatus);
      return videoStatus;
    });

    console.log(videoAddedStatus);
    if(!videoAddedStatus.includes(false)){
      res.status(200).send('all vods successfully inserted to queue');
    }
    else {
      // TODO: implement error handling for failed queue inserts
      res.status(500).send('failed to insert at least one video to the queue');
    }
  }
  catch(e:any){
    console.error(e);
    res.status(500).send('Server Error: ' + e);
  }
};

module.exports = getVodsToDownload;
