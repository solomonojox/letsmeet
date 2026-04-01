import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BlockDetailsType } from '../../types/reportDetailsType';
import { getBlockedDetails } from '../../Services/block';

interface Props {
    onClose: () => void;
    showOverlay?: () => void;
    hideOverlay?: () => void;
    formatDate?: any;
    open: boolean;
    details: BlockDetailsType;
}
const ViewBlockedDetails: React.FC<Props> = ({ onClose, open, details, formatDate, showOverlay, hideOverlay }) => {
    const [blockerTotalBlocked, setBlockerTotalBlocked] = useState(0);
    const [blockedTotalBlocked, setBlockedTotalBlocked] = useState(0);

    useEffect(() => {
        if (details) {
            getBlockingDetails();
        }
    }, [details])
    const getBlockingDetails = async () => {
        showOverlay?.();
        try {
            const res = await getBlockedDetails(details.blockerUserId);
            const res2 = await getBlockedDetails(details.blockedUserId);
            setBlockerTotalBlocked(res.totalUsersBlocked);
            setBlockedTotalBlocked(res2.totalUsersBlocked);
        } catch (error) {
            console.error('Error fetching block details:', error);
        } finally {
            hideOverlay?.();
        }
    }

    return (
        <div>
            <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn' onClick={onClose}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full pointer-events-auto p-8 animate-scaleIn relative max-h-[90vh] overflow-y-auto space-y-4">
                    <X className="absolute top-4 right-4 cursor-pointer border p-1 rounded-lg" size={30} onClick={onClose} />
                    <h2 className="text-lg font-semibold mb-4 text-center">Report details</h2>

                    <div className="flex gap-6 justify-center">
                        <div className="flex flex-col items-center">
                            <img src={details?.blockerPhotoUrl} alt={details?.blockerName} className="bg-gray-200 rounded-full h-12 w-12" />
                            <p className="font-semibold text-md">{details?.blockerName}</p>
                            <p className="text-gray-500 text-xs">Blocker</p>
                            <p className="text-sm mt-2 font-semibold">Total users blocked: {blockerTotalBlocked}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <img src={details?.blockedPhotoUrl} alt={details?.blockedName} className="bg-gray-200 rounded-full h-12 w-12" />
                            <p className="font-semibold text-md">{details?.blockedName}</p>
                            <p className="text-gray-500 text-xs">Blocked user</p>
                            <p className="text-sm mt-2 font-semibold">Total users blocked: {blockedTotalBlocked}</p>
                        </div>
                    </div>

                    {/* <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-2">
                                <tr>
                                    <th className="font-semibold text-xs border-b py-2 px-3 text-left">Content type</th>
                                    <th className="font-semibold text-xs border-b py-2 px-3 text-left">Date Reported</th>
                                    <th className="font-semibold text-xs border-b py-2 px-3 text-left">Status</th>
                                    <th className="font-semibold text-xs border-b py-2 px-3 text-left">Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-gray-500 text-xs border-b p-3 text-left">{details?.reason}</td>
                                    <td className="text-gray-500 text-xs border-b p-3 text-left">{formatDate(details?.createdAt)}</td>
                                    <td className="text-gray-500 text-xs border-b p-3 text-left">{details?.reportStatus}</td>
                                    <td className="text-gray-500 text-xs border-b p-3 text-left">{details?.reviewedByAdminName || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}

                    <div>
                        <p className="text-xs font-thin mb-2">Date Blocked</p>
                        <div className="rounded-xl border border-gray-300 p-4 max-h-[40vh] overflow-y-auto">
                            <p>{formatDate(details?.blockedAt)}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-thin mb-2">Reason</p>
                        <div className="rounded-xl border border-gray-300 p-4 max-h-[40vh] overflow-y-auto">
                            <p>{details?.blockReason}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewBlockedDetails