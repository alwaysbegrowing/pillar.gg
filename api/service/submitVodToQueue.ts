import { NowRequest, NowResponse } from '@vercel/node';
var AWS = require('aws-sdk');
import {v4 as uuidv4} from 'uuid';
// eslint-disable-next-line
const fetch = require('node-fetch');

AWS.config.update({ accessKeyId: process.env.PILLAR_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.PILLAR_AWS_SECRET_ACCESS_KEY, region: process.env.PILLAR_AWS_DEFAULT_REGION });
/**
 * This is
 * @param req body contains userID of user in MongoDB Users Table
 * @param res status of pass or fail and the vod list
 */
const submitVodToQueue = async (req: NowRequest, res: NowResponse) => {
  try {
    // add message to the queue
    var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    var params = {
      QueueName: "video_downloader.fifo"
    };
    let myuuid = uuidv4();

    var params = {
      MessageAttributes: {},
      MessageBody: JSON.stringify(req.body),
      MessageDeduplicationId: myuuid,  // Required for FIFO queues
      MessageGroupId: "messageGroup1",  // Required for FIFO queues
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/576758376358/video_downloader.fifo"
    };

    sqs.sendMessage(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        res.status(500).json({ "Error": err.message })

      } else {
        res.status(200).json(data.MessageId);
      }
    });
  }
  // TODO: Add beter error handling
  catch (e) {
    res.status(500).json({ "Error": e.message })
  }
};

module.exports = submitVodToQueue;