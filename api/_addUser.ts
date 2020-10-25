const connectToDatabase = require('./_connectToDatabase');

// const example = async (req: NowRequest, res: NowResponse) => {
//    const db = await connectToDatabase()
//    const results = await db.collection('streams').find({}).toArray()
//    res.json({results})
// }

const addUser = async (email_in, access_token, youtube_token_in, timestamp_in, plan_in) => {
  // connect to db
  const db = await connectToDatabase();

  // add user
  const myobj = {
    email: email_in,
    twitch_access_token: access_token,
    youtube_token: youtube_token_in,
    timestamp: timestamp_in,
    plan: plan_in,
  };

  db.collection('users').insertOne(myobj);
};

module.exports = addUser;
