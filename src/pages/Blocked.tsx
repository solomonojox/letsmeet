import React from 'react'
import AllBlockedUsers from '../components/Blocked/AllBlockedUsers'
import BlockCards from '../components/Blocked/BlockCards'

const Blocked = () => {
    return (
        <div className="space-y-10 mb-10 mt-4">
            <BlockCards />
            <AllBlockedUsers />
        </div>
    )
}

export default Blocked