import React from 'react'
import ViewReferralCards from './ViewReferralCards'
import { ChevronDown, Files, Settings } from 'lucide-react'
import ViewReferralUsers from './ViewReferralUsers'

const ViewReferral = () => {
    return (
        <div className='bg-gray-50 p-4'>
            <div className='relative space-y-4'>
                <div className="h-40 w-full bg-gradient-to-r from-red-950 to-primary"></div>
                <div className="rounded-full h-28 w-28 bg-gray-400 absolute -bottom-5 left-10"></div>
                <div className="flex gap-2 justify-end items-center">
                    <button className='text-sm border border-green-600 bg-green-200 text-green-600 rounded-full py-1 px-3'>Active</button>
                    <button className='text-sm border bg-primary text-white rounded-lg py-1 px-3'>Download report</button>
                    <div className="flex">
                        <Settings size={18} />
                        <ChevronDown size={18} />
                    </div>
                </div>
            </div>

            <div className="p-4 mt-6 bg-white rounded-lg border">
                <p className="text-lg font-bold mb-6">Information</p>

                <table>
                    <tr>
                        <th className='w-40 text-start text-sm text-gray-600'>Referral code</th>
                        <th className='w-80 text-start text-sm text-gray-600'>Organization name</th>
                        <th className='w-40 text-start text-sm text-gray-600'>Date created</th>
                    </tr>
                    <tr>
                        <td className='flex items-center gap-2 font-bold text-primary'>COM12345 <Files size={14} /></td>
                        <td>Maximum Marketing Agency</td>
                        <td>May 26, 2023</td>
                    </tr>
                </table>
            </div>
            <ViewReferralCards />

            <ViewReferralUsers />
        </div>
    )
}

export default ViewReferral