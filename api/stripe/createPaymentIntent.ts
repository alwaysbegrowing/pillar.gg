// This is your real test secret API key.
import {VercelRequest, VercelResponse} from "@vercel/node";

// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51ImP67FDvrBp8Tj0GTcHTvunJKSyE7zcjBNRQc5WIN3uKH3mJn9sRMOFQoCVeZMLqaHSUDk150AzTXEjwe4auXz50073d7i8A4");


const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

const chargeCustomer = async (customerId, items) => {
  const orderAmount = calculateOrderAmount(items);
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card"
  });
  // Charge the customer and payment method immediately
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "usd",
    customer: customerId,
    payment_method: paymentMethods.data[0].id,
    off_session: true,
    confirm: true
  });
  if (paymentIntent.status === "succeeded") {
    console.log("✅ Successfully charged card off session");
    return paymentIntent
  }
}


export default async (req: VercelRequest, res: VercelResponse) => {

  const { items } = req.body;
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new Customer
  const customer = await stripe.customers.create();
  const paymentIntent = await chargeCustomer(customer.id, items);
  // Create a PaymentIntent with the order amount and currency
  // const paymentIntent = await stripe.paymentIntents.create({
  //   customer: customer.id,
  //   setup_future_usage: 'off_session',
  //   amount: calculateOrderAmount(items),
  //   currency: "usd"
  // });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
};

