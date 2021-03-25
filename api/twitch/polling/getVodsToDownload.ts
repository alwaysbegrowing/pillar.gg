import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import getUsersToPoll from './_getUsersToPoll';
import getAppToken from '../_getAppToken';
import insertVideoDetails from './_insertVideoDetails';
import insertVodToQueue from './_insertVodToQueue';

enum Status {
  Success = "SUCCESS",
  Failure = "FAILED"
}

const getVodsToDownload = async (req: VercelRequest, res: VercelResponse) => {

  try {
    // receive list of Pillar users that have { isMonitoring: true }
    const usersToPoll: string[] = await getUsersToPoll();
    const appToken = await getAppToken();
    let urls: string[] = [];

    // Loop through user id's to build an array of urls to fetch
    usersToPoll.forEach(twitchId => {
      urls.push(`https://api.twitch.tv/helix/videos?user_id=${twitchId}&type=archive&period=day&first=1`);
    });

    // aggregates response from Twitch API containing details of last VOD for each user
    // https://dev.twitch.tv/docs/api/reference#get-videos
    const newestVideoDetails:any[] = urls.map(async url => {
      const newestVideo = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${appToken}`,
          'Client-ID': process.env.TWITCH_CLIENT_ID,
        }
      })
      return newestVideo.json();
    })

    // strip out relevant part of response
    const videosToSearch:any[] = (await Promise.all(newestVideoDetails)).map(videoDetails => {
      return videoDetails.data[0];
    });

    // hand list of videos to mongo and wait for array containing videos that need to be added to queue
    const videosToQueue:any[] = await insertVideoDetails(videosToSearch);

    // add videos to queue and await for the promise
    const videoAddedStatusPromise:Promise<boolean>[] = videosToQueue.map(async video => {
      const response:boolean = await insertVodToQueue(video);
      return(response);
    })

    // resolve promises and create a boolean array with status of each vod
    const videoAddedStatus = (await Promise.all(videoAddedStatusPromise)).map(videoStatus => {
      return videoStatus;
    });

    if(!videoAddedStatus.includes(false)){
      res.status(200).send(Status.Success);
    }
    else {
      // TODO: implement error handling for failed queue inserts
      res.status(500).send(Status.Failure);
    }
  }
  catch(e:any){
    console.error(e);
    res.status(500).send('Server Error: ' + e);
  }
};

export default getVodsToDownload;
