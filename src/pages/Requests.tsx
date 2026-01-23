import React from 'react'
import RequestCards from '../components/Requests/RequestCards'
import AllRequests from '../components/Requests/AllRequests'

const Requests = () => {
    return (
      <div className="space-y-10 mb-20 mt-4">
        <RequestCards />
        {/* <AllRequests /> */}
      </div>
    );
}

export default Requests