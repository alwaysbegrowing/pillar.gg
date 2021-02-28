const connectToDatabase = require('../_connectToDatabase');

// const example = async (req: NowRequest, res: NowResponse) => {
//    const db = await connectToDatabase()
//    const results = await db.collection('streams').find({}).toArray()
//    res.json({results})
// }

const addUser = async (email_in: any, twitch_id_in: any, username_in: any, twitch_profile_picture_in: any, stripeCustomerID_in: any, twitch_credentials_in: any, timestamp_in: any, plan_in: any) => {
  // connect to db
  const db = await connectToDatabase();

  // add user
  const myobj = {
    email: email_in,
    twitch_credentials: twitch_credentials_in,
    timestamp: timestamp_in,
    plan: plan_in,
    twitch_username: username_in,
    twitch_id: twitch_id_in,
    twitch_profile_picture: twitch_profile_picture_in,
    stripeCustomerID: stripeCustomerID_in
  };

  db.collection('users').insertOne(myobj);
};

module.exports = addUser;
