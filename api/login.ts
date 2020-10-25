import { NowRequest, NowResponse } from '@vercel/node';

const connectToDatabase = require('./_connectToDatabase');
const addUser = require('./_addUser');
const getTwitchEmail = require('./_getTwitchEmail');

const login = async (req: NowRequest, res: NowResponse) => {
  try {
    // retrieve access token from req.body
    const access_token = req.body;
    if (access_token === null || access_token === undefined || access_token === '') {
      res.status(401).send('ERROR: NO ACCESS TOKEN RECEIVED');
    }
    // connect to database
    const db = await connectToDatabase();
    // check to see user exists exists
    const results = await db
      .collection('users')
      .find({ twitch_access_token: access_token })
      .toArray();

    if (results.length !== 0) {
      // lookup and return id
      // res.send(results[0]._id)
      // eslint-disable-next-line
      res.status(200).json({ user_id: results[0]._id });
    } else {
      // get email from twitch
      const email = getTwitchEmail(access_token);

      // get registration timestamp
      const timestamp = Date.now();

      // register user with null youtube token
      const youtube_token = null;

      // Set default stripe plan to basic
      // When Payment is integrated, the stripe connection would go here
      const plan = 'basic';

      // add user to database
      await addUser(email, access_token, youtube_token, timestamp, plan);

      // receive userid generated from mongo
      const user_results = await db
        .collection('users')
        .find({ twitch_access_token: access_token })
        .toArray();

      // send client success status and user_id for client side authentication
      // res.send(user_results[0]._id)

      // eslint-disable-next-line
      res.status(200).json({ user_id: user_results[0]._id });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = login;
