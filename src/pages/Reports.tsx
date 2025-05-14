import React from 'react'
import AllReports from '../components/Reports/AllReports'
import ReportCards from '../components/Reports/ReportCards'

const Reports = () => {
    return (
        <div className="space-y-10 mb-10">
            <ReportCards />
            <AllReports />
        </div>
    )
}

export default Reports