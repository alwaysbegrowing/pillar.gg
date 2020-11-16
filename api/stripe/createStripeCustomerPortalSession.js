const stripe = require('stripe')(process.env.STRIPE_SECRET);
const getStripeID = require('./_getStripeID');

// this function takes in a user_id and paymentMethodId to create a stripe subscription
// the subscription object is returned
// TODO: handle price

const createStripeCustomerPortalSession = async (req, res) => {
  const request = JSON.parse(req.body);
  if(!request.user_id) {
    res.status(401).send('No User ID Sent');
  }
  const stripeCustomerID = await getStripeID(request.user_id);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerID,
    return_url: 'http://localhost:8000/home'
    // return_url: 'https://dev.clipclock.stream/home'
  });

  res.json({ url: session.url });

};

module.exports = createStripeCustomerPortalSession;
