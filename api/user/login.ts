import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('../_connectToDatabase');
const addUser = require('./_addUser');
const getUserTwitchCredentials = require('../twitch/_getUserTwitchCredentials');
const getTwitchUserData = require('../twitch/_getTwitchUserData');
const postNewStripeCustomer = require('../stripe/_postNewStripeCustomer');
// const ObjectId = require('mongodb').ObjectId

const login = async (req: NowRequest, res: NowResponse) => {
  try {
    // retrieve auth token token from req.body
    const auth_token = req.body;
    // validate auth token exists
    if (auth_token === null || auth_token === undefined || auth_token === '') {
      res.status(401).send('ERROR: NO ACCESS TOKEN RECEIVED');
    }

    // get access token from auth token
    const twitch_access_info = await getUserTwitchCredentials(auth_token);
    console.log('twitch credentials received');
    // get credentials
    const twitchUserData = await getTwitchUserData(twitch_access_info.access_token);
    // set twitch credentials to be updated
    let username;
    let email;
    let twitch_id;
    let twitch_profile_picture;
    let twitch_credentials;
    if (twitchUserData !== null) {
      username = twitchUserData.name;
      email = twitchUserData.email;
      twitch_id = twitchUserData.twitch_id;
      twitch_profile_picture = twitchUserData.twitch_profile_picture;
      twitch_credentials = {
        access_token: twitch_access_info.access_token,
        refresh_token: twitch_access_info.refresh_token,
        expires_in: twitch_access_info.expires_in,
        scope: twitch_access_info.scope,
        token_type: twitch_access_info.token_type,
      };
    } else {
      res.status(401).send('Error retrieving twitch credentials');
    }

    // connect to database and check for user by twitch id
    const db = await connectToDatabase();

    const result = await db.collection('users').findOne({ twitch_id: twitch_id });

    // if user exists in database
    if (result) {
      // filter by twitch id
      const filter = { twitch_id: result.twitch_id };

      const options = { upsert: false };

      const updatedoc = {
        $set: {
          username,
          email,
          twitch_id,
          twitch_profile_picture,
          twitch_credentials,
        },
      };

      db.collection('users').updateOne(filter, updatedoc, options);

      const isYoutubeLinked = result.youtube_credentials ? true : false;

      const userInfo = {
        avatar: twitch_profile_picture,
        name: username,
        // eslint-disable-next-line
        user_id: result._id,
        access: result.plan,
        youtubeLinked: isYoutubeLinked,
        twitch_access_token: twitch_credentials ? twitch_credentials.access_token : null,
      };
      res.status(200).json(userInfo);
    } else {
      // get registration timestamp
      const timestamp = Date.now();

      // Set default stripe plan to basic
      // When Payment is integrated, the stripe connection would go here
      const plan = 'none';

      const stripeCustomerID = await postNewStripeCustomer(email, username);
      // stripe customer could not be created
      if (stripeCustomerID === null) {
        res.status(502).send("Request failed because a stripe account wasn't created.");
      }
      // stripe account has been created and all above information is valid
      else {
        // add user to database
        await addUser(
          email,
          twitch_id,
          username,
          twitch_profile_picture,
          stripeCustomerID,
          twitch_credentials,
          timestamp,
          plan,
        );

        // receive userid generated from mongo
        const user_result = await db.collection('users').findOne({ twitch_id });

        // send client success status and user_id for client side authentication

        // make a stripe customer account for the new user

        // eslint-disable-next-line
        const isYoutubeLinked = user_result.youtube_credentials ? true : false;
        const userInfo = {
          avatar: user_result.twitch_profile_picture,
          name: user_result.twitch_username,
          // eslint-disable-next-line
          user_id: user_result._id,
          access: user_result.plan,
          youtubeLinked: isYoutubeLinked,
          twitch_access_token: user_result.twitch_credentials.access_token,
        };
        res.status(200).json(userInfo);
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = login;
