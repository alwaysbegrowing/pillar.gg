
const ObjectId = require('mongodb').ObjectId;
const connectToDatabase = require('./_connectToDatabase');

const getStripeID = async (user_id) => {
  const db = await connectToDatabase();
  const user_results = await db
    .collection('users')
    .find({ _id: ObjectId(user_id) })
    .toArray();

    if (user_results.length === 0) {
      return(undefined);
    }
    else if (!user_results[0].stripeCustomerID) {
      return(null);
    }

    return(user_results[0].stripeCustomerID);
}

module.exports = getStripeID;
