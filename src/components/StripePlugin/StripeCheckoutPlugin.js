import React, {useState} from 'react'
import { useModel } from 'umi';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionSelector from './SubscriptionSelector';

const stripePromise = loadStripe('pk_test_51HfUdOIBb5qVQA8voGWeVdgUChW4KUxmmAJp3CfxQjYdC6nsTesN4KycZX2KUgRCkl2k2KpDqArPTAXILvEebRl200LQ9tCwXH');

export default function StripeCheckoutPlugin() {
  const { initialState } = useModel('@@initialState');

  // selectedPlan is assigned the value of the
  // plan that the user will be paying for
  // options: 'free', 'basic', or 'pro'
  const [selectedPlan, togglePlan] = useState('free');

  // reads selected button value from SubscriptionSelector
  // and assigns value to selectedPlan
  function changePlan(e) {
    togglePlan(e.currentTarget.value);
  }

  const handleClick = async (/* event */) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call backend to create the Checkout Session
    const response = await fetch('/api/stripe/createStripeCheckoutSession', {
      method: 'POST',
      body: JSON.stringify({
        user_id: initialState.currentUser.user_id,
        plan: selectedPlan
      }),
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // console.log(result.error);
      // TODO: If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
  return (
    <div>
      <SubscriptionSelector changePlan={changePlan} plan={selectedPlan}/>
      <button type="button" role="link" onClick={handleClick}>
        Checkout
      </button>
    </div>
  );
}

