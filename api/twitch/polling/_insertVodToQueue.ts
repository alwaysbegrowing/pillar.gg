import {v4 as uuidv4} from 'uuid';
const AWS = require('aws-sdk');

AWS.config.update({ accessKeyId: process.env.PILLAR_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.PILLAR_AWS_SECRET_ACCESS_KEY, region: process.env.PILLAR_AWS_DEFAULT_REGION });

const insertVodToQueue = async (video:any) => {
  try {
    // add message to the queue
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    const myuuid = uuidv4();
    let queueObj = {
      streamer: video.user_login,
      url: video.url,
      platform_video_id: video.id

    };
    var params = {
      MessageAttributes: {},
      MessageBody: JSON.stringify(queueObj),
      MessageDeduplicationId: myuuid,  // Required for FIFO queues
      MessageGroupId: "messageGroup1",  // Required for FIFO queues
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/576758376358/video_downloader.fifo"
    };
    const response = await sqs.sendMessage(params).promise()
    if(response.MessageId) {
      return(true);
    }
    return(false);
  }
  catch (e: any){
    console.error(e);
    return(false);
  }
}

export default insertVodToQueue;
