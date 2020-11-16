
const { ObjectId } = require('mongodb').ObjectId;
const connectToDatabase = require('../_connectToDatabase');

const getStripeID = async (user_id) => {
  const db = await connectToDatabase();
  const user_result = await db
    .collection('users')
    .findOne({ _id: ObjectId(user_id) });

    if (!user_result) {
      return(undefined);
    }
    else if (!user_result.stripeCustomerID) {
      return(null);
    }
    else {
      return(user_result.stripeCustomerID);
    }
}

module.exports = getStripeID;
