import React from 'react'

export default function SubscriptionSelector(props) {

  return (
    <div>
      <div>
        <input type="radio" id="free" value="free" checked={props.plan === 'free' } onChange={props.changePlan} />
        <label>Free</label>
      </div>

    <div>
      <input type="radio" id="basic" value="basic" checked={props.plan === 'basic'} onChange={props.changePlan} />
      <label>Basic</label>
    </div>

    <div>
      <input type="radio" id="pro" value="pro" checked={props.plan === 'pro'} onChange={props.changePlan} />
      <label>Pro</label>
    </div>
    </div>
  )
}
