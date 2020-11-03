import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');
const addUser = require('./_addUser');
const getTwitchCredentials = require('./_getTwitchCredentials');
const postNewStripeCustomer = require('./_postNewStripeCustomer');
// const ObjectId = require('mongodb').ObjectId

const login = async (req: NowRequest, res: NowResponse) => {
  try {
    // retrieve access token from req.body
    const access_token = req.body;
    if (access_token === null || access_token === undefined || access_token === '') {
      res.status(401).send('ERROR: NO ACCESS TOKEN RECEIVED');
    }

    // get credentials
    const twitchCredentials = await getTwitchCredentials(access_token);
    // validate credentials
    let username;
    let email;
    let twitch_id;
    let twitch_profile_picture;
    if(twitchCredentials !== null) {
      username = twitchCredentials.name;
      email = twitchCredentials.email;
      twitch_id = twitchCredentials.twitch_id;
      twitch_profile_picture = twitchCredentials.twitch_profile_picture;
    }
    else{
      res.status(401).send('Error retrieving twitch credentials');
    }
    // connect to database
    const db = await connectToDatabase();

    const results = await db
      .collection('users')
      .find({ twitch_id: twitch_id })
      .toArray();


    if (results.length !== 0) {
      // lookup and return id

      // eslint-disable-next-line
      const mongoID = results[0]._id;

      // TODO: Update results on each login
      // const updatedResult = await db
      // .collection('users')
      // .updateOne(
      //   { _id: ObjectId(mongoID) },
      //   { 'twitch_access_token': access_token, 'email': email, 'twitch_username': username },
      //   (err: any, res: any) => {
      //     if(err){
      //       console.log("failed to update credentials")
      //       res.status(401).send("Failed to update twitch credentials in database");
      //       throw (err);
      //     }
      //     else{
      //       console.log("properly updated credentials in db");
      //     }
      //   }
      // );
      // eslint-disable-next-line
      res.status(200).json({ user_id: mongoID });
    }
    else {

      // get registration timestamp
      const timestamp = Date.now();

      // Set default stripe plan to basic
      // When Payment is integrated, the stripe connection would go here
      const plan = 'none';


      const stripeCustomerID = await postNewStripeCustomer(email, username);
      // stripe customer could not be created
      if(stripeCustomerID === null) {
        res.status(502).send("Request failed because a stripe account wasn't created.")
      }
      // stripe account has been created and all above information is valid
      else {
        // add user to database
        await addUser(email, twitch_id, username, twitch_profile_picture, stripeCustomerID, access_token, timestamp, plan);

        // receive userid generated from mongo
        const user_results = await db
          .collection('users')
          .find({ twitch_access_token: access_token })
          .toArray();

        // send client success status and user_id for client side authentication
        // res.send(user_results[0]._id)

        // make a stripe customer account for the new user

        // eslint-disable-next-line
        res.status(200).json({ user_id: user_results[0]._id });
      }

    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = login;
