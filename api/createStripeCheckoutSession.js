const stripe = require('stripe')(process.env.STRIPE_SECRET);
const getStripeID = require('./_getStripeID');

// this function takes in a user_id and paymentMethodId to create a stripe subscription
// the subscription object is returned
// TODO: handle price

const createStripeSubscription = async (req, res) => {
  let price;
  const request = JSON.parse(req.body);
  if(request.plan === 'free') {
    price = 'price_1HfUiuIBb5qVQA8vV85V3jix';
  }
  else if(request.plan === 'basic') {
    price = 'price_1HfUk2IBb5qVQA8v824pKaNp';
  }
  else if(request.plan === 'pro') {
    price = 'price_1HfUl4IBb5qVQA8v0K4awkc6';
  }

  const stripeCustomerID = await getStripeID(request.user_id);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {price, quantity: 1},
    ],
    customer: stripeCustomerID,
    mode: 'subscription',
    billing_address_collection: 'required',
    // success_url: 'https://dev.clipclock.stream/success',
    // cancel_url: 'https://dev.clipclock.stream/cancel',
    success_url: 'http://localhost:8000/subscription_success',
    cancel_url: 'http://localhost:8000/subscription_cancel',
  });

  res.json({ id: session.id });

};

module.exports = createStripeSubscription;
