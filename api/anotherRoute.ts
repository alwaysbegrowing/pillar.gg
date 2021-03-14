import type { VercelRequest, VercelResponse } from '@vercel/node';
// const connectToDatabase = require('./_connectToDatabase')
// const addUser = require('./_addUser')
// const getTwitchCredentials = require('./_getTwitchCredentials');
const postNewStripeCustomer = require('./_postNewStripeCustomer');

// const testTwitchCredentials = async (req: VercelRequest, res: VercelResponse) => {
//   const result = await getTwitchCredentials('fi0lif535gxxk7xn2coeep3ggdz8p3');
//   res.send(result);
// };

const testNewStripeCustomer = async (req: VercelRequest, res: VercelResponse) => {
  const result = await postNewStripeCustomer('test@test.com', 'test');
  res.send(result);
}
// const testAddUser = async(req: VercelRequest, res: VercelResponse) => {
//   //addUser(email, access_token, youtube_token, timestamp, plan)
//   const result = await addUser('test@test.com','123456789','123456789',Date.now(),'free')
//   res.send(result);
// }

// const example = async (req: VercelRequest, res: VercelResponse) => {
//   const db = await connectToDatabase()
//   const results = await db.collection('users').find({twitch_access_token:"123456789"}).toArray()
//   res.send(results.length)
// }

module.exports = testNewStripeCustomer;
