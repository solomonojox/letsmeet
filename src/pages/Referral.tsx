import React from 'react'
import ReferralCards from '../components/Referral/ReferralCards'
import AllReferrals from '../components/Referral/AllReferrals'

const Referral = () => {
    return (
        <div className="space-y-10 mb-10 mt-4">
            <ReferralCards />
            <AllReferrals />
        </div>
    )
}

export default Referral