import React from 'react'
import SubscriptionCards from '../components/Subscriptions/SubscriptionCards'
import Subscribers from '../components/Subscriptions/Subscribers'

const Subscription = () => {
    return (
        <div className="space-y-10 mb-10 mt-4">
            <SubscriptionCards />
            <Subscribers />
        </div>
    )
}

export default Subscription