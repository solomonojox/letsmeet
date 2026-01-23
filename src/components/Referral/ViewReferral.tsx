import React, { useContext } from 'react'
import ViewReferralCards from './ViewReferralCards'
import { ChevronDown, Files, Settings } from 'lucide-react'
import ViewReferralUsers from './ViewReferralUsers'
import { useGetPartnerDashboardQuery } from '../../Services/API/api'
import { useParams } from 'react-router-dom'
import imageAsset from '../../assets/imageAsset'
import { AppContext } from '../../Context/AppContext'

const ViewReferral = () => {
    const { formatDate, showOverlay, hideOverlay, notifySuccess, notifyError, notifyInfo } = useContext(AppContext);
    const params = useParams();
    const { data, isLoading, refetch } = useGetPartnerDashboardQuery(params.partnerId);
    const dashboardData: any = data?.data;

    const handleCopyReferralCode = () => {
        if (dashboardData?.referralCode) {
            navigator.clipboard.writeText(dashboardData.referralCode);
            notifyInfo('Referral code copied to clipboard');
        }
    };

    return (
        <div className='bg-gray-50 p-4'>
            <div className='relative space-y-4'>
                <div className="h-40 w-full bg-gradient-to-r from-red-950 to-primary"></div>
                <div className="rounded-full h-28 w-28 bg-white absolute -bottom-5 left-10">
                    <img src={imageAsset.avatar} alt="" className='w-full h-full object-cover' />
                </div>
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
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className='w-40 text-start text-sm text-gray-600'>Referral code</th>
                            <th className='w-80 text-start text-sm text-gray-600'>Organization name</th>
                            <th className='w-40 text-start text-sm text-gray-600'>Date created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='flex items-center gap-2 font-bold text-primary py-2'>
                                {dashboardData?.referralCode || ''}
                                <Files size={18} onClick={handleCopyReferralCode} className='cursor-pointer' />
                            </td>
                            <td className='py-2'>{dashboardData?.businessName || 'Maximum Marketing Agency'}</td>
                            <td className='py-2'>
                                {dashboardData?.periodStart
                                    ? new Date(dashboardData.periodStart).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                    : 'May 26, 2023'
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <ViewReferralCards cardData={dashboardData} />

            <ViewReferralUsers />
        </div>
    )
}

export default ViewReferral