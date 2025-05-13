import React from 'react'
import AllUsers from '../components/Users/AllUsers'
import UserDetails from '../components/Users/UserDetails'

const Users = () => {
    return (
        <div className="space-y-10 mb-10">
            <AllUsers />
            {/* <UserDetails /> */}
        </div>
    )
}

export default Users