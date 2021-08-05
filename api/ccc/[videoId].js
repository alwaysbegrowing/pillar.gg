import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function replaceErrors(key, value) {
  if (value instanceof Error) {
    const error = {};

    Object.getOwnPropertyNames(value).forEach((propName) => {
      error[propName] = value[propName];
    });

    return error;
  }

  return value;
}

export default async (req, res) => {
  const { videoId } = req.query;

  const credentials = {
    accessKeyId: process.env.SNS_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SNS_AWS_SECRET_ACCESS_KEY || '',
  };

  const client = new SNSClient({ region: 'us-east-1', credentials });

  let response;
  try {
    const command = new PublishCommand({
      Message: 'Hello from Vercel!',
      MessageAttributes: {
        VideoId: {
          DataType: 'String',
          StringValue: videoId,
        },
      },
      TopicArn: process.env.SNS_TOPIC_ARN,
    });

    response = await client.send(command);
  } catch (e) {
    res.status(400);
    res.json(JSON.stringify(e, replaceErrors));
    return;
  }

  res.json(response);
};
