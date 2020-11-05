import React, {useState} from 'react'
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionSelector from './SubscriptionSelector';

const stripePromise = loadStripe('pk_test_51HfUdOIBb5qVQA8voGWeVdgUChW4KUxmmAJp3CfxQjYdC6nsTesN4KycZX2KUgRCkl2k2KpDqArPTAXILvEebRl200LQ9tCwXH');

export default function StripeCustomerPortalPlugin() {

  const handleClick = async (event) => {

    // Call backend to create Customer Portal Session
    const response = await fetch('/api/createStripeCustomerPortalSession.js', {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem('user_id')
      }),
    });

    const session = await response.json();
    console.log(session.url);
    if(response.status === 200) {
      window.location.href = session.url;
    }
    else {
      console.log('redirect failed');
      // implement error message
    }

  }
  return (
    <div style={{cursor: 'pointer'}} onClick={handleClick}>
      Manage Billing
    </div>
  );
}

