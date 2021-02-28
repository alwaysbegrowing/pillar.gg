import React from 'react'
import { useModel } from 'umi';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51HfUdOIBb5qVQA8voGWeVdgUChW4KUxmmAJp3CfxQjYdC6nsTesN4KycZX2KUgRCkl2k2KpDqArPTAXILvEebRl200LQ9tCwXH');

export default function StripeCustomerPortalPlugin() {
  const { initialState } = useModel('@@initialState');
  const handleClick = async () => {

    // Call backend to create Customer Portal Session
    const response = await fetch('/api/stripe/createStripeCustomerPortalSession', {
      method: 'POST',
      body: JSON.stringify({
        user_id: initialState.currentUser.user_id
      }),
    });

    const session = await response.json();
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

