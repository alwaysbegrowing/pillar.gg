// import type { VercelRequest, VercelResponse } from '@vercel/node';

// import AWS, { Credentials }  from 'aws-sdk';

// export default async (req: VercelRequest, res: VercelResponse) => {
//   const { videoId, twitchId } = req.query;

//   const credentials = new Credentials({accessKeyId: process.env.SNS_AWS_ACCESS_KEY_ID || '', secretAccessKey: process.env.SNS_AWS_SECRET_ACCESS_KEY || ''});

//   AWS.config.update({region: 'us-east-1', credentials})

//   const snsClient = new AWS.SNS();

//   const params = {
//       Message: "Hello from Vercel!",
//       MessageAttributes: {
//           VideoId: {
//               Type: "String",
//               Value: videoId
//           },
//           TwitchId: {
//               Type: "String",
//               Value: twitchId
//           }
//       },
//       TopicArn: process.env.SNS_TOPIC_ARN
//   }

//   snsClient.publish(params, (err, data) => {

//   });

// }
