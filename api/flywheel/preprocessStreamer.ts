import type { VercelRequest, VercelResponse } from '@vercel/node';

const fetch = require('node-fetch');

const connectToDatabase = require('../_connectToDatabase');

// USAGE: http://localhost:8000/api/flywheel/preprocessStreamer?twitchUsernames=["gatesyp","liihs"]
// can also use dev.pillar.gg/api/flywheel/preprocessStreamer
// WARNING: right now it will insert duplicates into mongo. This is a very dumb script.
// To not get us banned by twitch tracker, only 5 at a time is allowed.


export default async (req: VercelRequest, res: VercelResponse) => {
  const MAX_PROCESSING_LIMIT = 5;
  const TWITCH_TRACKER_URL = "https://twitchtracker.com/";
  const db = await connectToDatabase();

  if(req.query.twitchUsernames === undefined) {
    console.log("In if statment")
    res.status(200).json({"msg": 'ERROR. No streamers were submitted. Copy paste this link into the url bar: http://localhost:8000/api/flywheel/preprocessStreamer?twitchUsernames=["TWITCH_TRACKER_URL_HERE","TWITCH_TRACKER_URL_HERE"] '})
    return;
  }

  const twitchUsernames = JSON.parse(req.query.twitchUsernames.toString());

  if(twitchUsernames.length > MAX_PROCESSING_LIMIT) {
    res.status(200).json({"msg": "ERROR. Max streamers in request exceeded. No streamers were pre-processed. You can only pre-process up to 5 streamers at a time. "})
    return;
  }

  const arr = []
// for each value in array, perform the below
for (const name of twitchUsernames){
  const requestUrl = name;
 // make request
  const pageHtml = await fetch(requestUrl)
    .then(resp => resp.text())
    // parse response text for the channel id
  const regex = /window\.channel.*\n.*id: (\d*),/gm;
  let objectText = pageHtml.match(regex);
  objectText = objectText.toString();

  const secondRegex = /(\d+)/;

  const twitchId = objectText.match(secondRegex);
  arr.push({"twitchUsername": name, "twitchId": twitchId[0]});
    }
console.log(arr)
  for (const object of arr){

  const mongo_result = await db.collection('users').insertOne({
    "twitch_id": object.twitchId,
      "testName": object.twitchUsername.substring(26),
      "display_name": object.twitchUsername.substring(26),
      "email": "stvngts620@gmail.com"
  }
);
  if (!mongo_result) {
    res.status(404).end();
    return;
  }
  }
//   res.status(200).json(mongo_result.result.ok);
  res.status(200).json({"msg": "WARNING: this will insert duplicates into the DB. Try to only insert a username if you know they don't already exist. MSG: Inserted the following correctly: ", "data": arr});
};
