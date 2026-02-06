import React, { useContext, useEffect, useRef, useState } from 'react'
import ViewReferralCards from './ViewReferralCards'
import { ChevronDown, CornerUpLeft, Files, Settings } from 'lucide-react'
import ViewReferralUsers from './ViewReferralUsers'
import { useGetPartnerDashboardQuery } from '../../Services/API/api'
import { useParams } from 'react-router-dom'
import imageAsset from '../../assets/imageAsset'
import { AppContext } from '../../Context/AppContext'
import { approvePartner, suspendPartner } from '../../Services/referrals'

const ViewReferral = () => {
    const { formatDate, showOverlay, hideOverlay, notifySuccess, notifyError, notifyInfo } = useContext(AppContext);
    const params = useParams();
    const { data, isLoading, refetch } = useGetPartnerDashboardQuery(params.partnerId);
    const dashboardData: any = data?.data;
    const referredUsersData = dashboardData?.referredUsers || {};
    console.log('Dashboard Data:', dashboardData);
    const [showSettings, setShowSettings] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowSettings(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCopyReferralCode = () => {
        if (dashboardData?.referralCode) {
            navigator.clipboard.writeText(dashboardData.referralCode);
            notifyInfo('Referral code copied to clipboard');
        }
    };

    const [reason, setReason] = useState('');
    const [openReasonModal, setOpenReasonModal] = useState(false);
    const [action, setAction] = useState('Approve');
    const [revenueSharePercentage, setRevenueSharePercentage] = useState(0);
    const [kybExpiryDate, setKybExpiryDate] = useState('');
    const updateReportStatus = () => {
        // console.log('keyboard');
        if (action === "Approve") {
            handleApprovePartner();
        } else if (action === "Suspend") {
            handleSuspendPartner();
        }
        // else if (action === "Delete") {
        //     handleDeletePartner();
        // }
    }

    const handleApprovePartner = async () => {
        // validate reason to ensure it must be at least 10 words
        if (reason.trim().split('').length < 10) {
            notifyError('Reason must be at least 10 letters', 'error');
            return;
        }

        showOverlay();
        const payload = {
            partnerId: params.partnerId,
            approved: true,
            decisionRationale: reason,
            revenueSharePercentage: revenueSharePercentage,
            kybExpiryDate: null
        }
        try {
            const res = await approvePartner(payload);
            notifySuccess('Partner approved successfully', 'success');
            setOpenReasonModal(false);
            setReason('');
            refetch();
        } catch (err: any) {
            console.log(err);
            notifyError(err.response?.data?.responseMessage || 'Error approving partner', 'error');
        } finally {
            hideOverlay();
        }
    }

    const handleSuspendPartner = async () => {
        showOverlay();
        const payload = {
            partnerId: params.partnerId,
            newStatus: "PENDING_KYB",
            reason: reason
        }
        try {
            const res = await suspendPartner(payload);
            notifySuccess('Partner suspended successfully', 'success');
            setOpenReasonModal(false);
            setReason('');
            refetch();
        } catch (err: any) {
            console.log(err);
            notifyError(err.response?.data?.responseMessage || 'Error suspending partner', 'error');
        } finally {
            hideOverlay();
        }
    }

    return (
        <div className='bg-gray-50 p-4'>
            <div className='mb-6'>
                <span className='flex items-center mb-6 cursor-pointer gap-2 w-20 hover:text-primary hover:underline' onClick={() => window.history.back()}>
                    <CornerUpLeft size={20} />
                    <span className='text-lg'>Back</span>
                </span>
            </div>

            <div className='relative space-y-4'>
                <div className="h-40 w-full bg-gradient-to-r from-red-950 to-primary"></div>
                <div className="rounded-full h-28 w-28 bg-white absolute -bottom-5 left-10">
                    <img src={imageAsset.avatar} alt="" className='w-full h-full object-cover' />
                </div>
                <div className="flex gap-2 justify-end items-center relative">
                    <button
                        className={`text-sm border ${dashboardData?.status === 'PENDING_KYB' ? 'border-yellow-600 bg-yellow-100 text-yellow-600' : dashboardData?.status === 'ACTIVE' ? 'border-green-600 bg-green-100 text-green-600' : 'border-blue-600 bg-blue-100 text-blue-600'} rounded-full py-1 px-3`}
                    >{dashboardData?.status}</button>
                    <button className='text-sm border bg-primary text-white rounded-lg py-1 px-3'>Download report</button>
                    <div className="flex cursor-pointer" onClick={() => setShowSettings(!showSettings)} ref={menuRef}>
                        <Settings size={18} />
                        <ChevronDown size={18} />
                    </div>

                    {showSettings && (
                        <div className='rounded border p-4 absolute right-0 top-8 bg-white space-y-2'>
                            <button
                                className={`text-sm ${dashboardData?.status === 'PENDING_KYB' ? 'text-gray-200' : 'hover:text-primary hover:underline'} cursor-pointer' block`}
                                onClick={() => {
                                    setAction('Suspend');
                                    setOpenReasonModal(true);
                                }}
                                disabled={dashboardData.status === 'PENDING_KYB'}
                            >
                                Suspend
                            </button>
                            <button
                                className={`text-sm ${dashboardData?.status === 'ACTIVE' ? 'text-gray-400' : 'hover:text-primary hover:underline'} cursor-pointer block`}
                                onClick={() => {
                                    setAction('Approve');
                                    setOpenReasonModal(true);
                                }}
                                disabled={dashboardData?.status === 'ACTIVE'}
                            >
                                Approve
                            </button>
                        </div>
                    )}
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

            <ViewReferralUsers referredUsersData={referredUsersData} />

            {openReasonModal && (
                <div className="fixed inset-0 bg-black/50 z-50">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg z-50">
                        <form action="submit">
                            <h2 className="text-lg font-medium mb-4">What is your Reason?</h2>
                            <textarea
                                className="w-96 h-40 border border-gray-300 rounded-md p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Enter reason here..."
                                required
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className={`px-4 py-2 ${action === "Delete" ? "bg-red-500 hover:bg-red-400" : "bg-primary hover:bg-primary/70"} text-white rounded-md mr-2`}
                                    onClick={updateReportStatus}
                                >
                                    {action}
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                                    onClick={() => setOpenReasonModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewReferral