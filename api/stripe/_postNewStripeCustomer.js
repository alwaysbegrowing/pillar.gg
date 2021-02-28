const stripe = require('stripe')(process.env.STRIPE_SECRET);

// takes a new user's email and username as parameters and creates an associated Stripe customer
// returns the stripe customer id
const postNewStripeCustomer = async (email, username) => {
  try {
    const customer = await stripe.customers.create({
      description: username,
      email
    })
    return(customer.id);
  }
  catch {
    return(null);
  }

}

module.exports = postNewStripeCustomer;
