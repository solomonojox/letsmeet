import React, { useContext, useEffect, useRef, useState } from 'react'
import ViewReferralCards from './ViewReferralCards'
import { ChevronDown, CornerUpLeft, Dot, Files, Settings, X } from 'lucide-react'
import ViewReferralUsers from './ViewReferralUsers'
import { useGetPartnerDashboardQuery } from '../../Services/API/api'
import { useParams } from 'react-router-dom'
import imageAsset from '../../assets/imageAsset'
import { AppContext } from '../../Context/AppContext'
import { approvePartner, exportData, suspendPartner } from '../../Services/referrals'

const ViewReferral = () => {
    const { formatDate, showOverlay, hideOverlay, notifySuccess, notifyError, notifyInfo } = useContext(AppContext);
    const params = useParams();
    const { data, isLoading, refetch } = useGetPartnerDashboardQuery(params.partnerId);
    const dashboardData: any = data?.data;
    const referredUsersData = dashboardData?.referredUsers || {};
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
    const [openDownloadModal, setOpenDownloadModal] = useState(false);

    const updateReportStatus = () => {
        if (action === "Approve") {
            handleApprovePartner();
        } else if (action === "Suspend") {
            handleSuspendPartner();
        }
    }

    const handleApprovePartner = async () => {
        // Fix: split('') was incorrectly checking characters, should be split(' ') for words
        if (reason.trim().split(' ').length < 10) {
            notifyError('Reason must be at least 10 words', 'error');
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

    const [format, setFormat] = useState('csv');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleExportData = async () => {
        try {
            const partnerId = params.partnerId;
            const payload = {
                partnerId: partnerId,
                format: format,
                startDate: startDate,
                endDate: endDate
            }

            const res = await exportData(partnerId, payload);
            if (res.status === 200 && format === 'csv') {
                if (format === 'csv') {
                    // Extract filename from headers
                    const disposition = res.headers["content-disposition"];
                    let fileName = "partner_report.csv"; // default fallback
                    if (disposition && disposition.includes("filename=")) {
                        const match = disposition.match(/filename="?([^"]+)"?/);
                        if (match && match.length > 1) {
                            fileName = match[1];
                        }
                    }

                    // Convert blob into a downloadable link
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", fileName); // <-- file name
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);

                    notifySuccess("Report Downloaded!", "success");
                } else {
                    let blob;
                    let filename = `partner_report_${new Date().getTime()}`;

                    blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    filename += '.xlsx';

                    // Create download link
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);

                    notifySuccess('Report exported successfully', 'success');
                    setOpenDownloadModal(false);
                }
            } else {
                notifyError("An error occurred while downloading!", "error");
            }
            if (res) {
                // Create blob from response data
            }
            if (res && typeof res === 'string') {
                convertTextToCSV(res);
            } else {
                // Handle other response formats
                console.log(res);
                notifySuccess('Data exported successfully', 'success');
            }
            // if (res) {
            //     // Extract filename from headers
            //     const disposition = res.headers["content-disposition"];
            //     console.log(disposition)
            //     let fileName = "Partner_report.xlsx"; // default fallback
            //     if (disposition && disposition.includes("filename=")) {
            //         const match = disposition.match(/filename="?([^"]+)"?/);
            //         if (match && match.length > 1) {
            //             fileName = match[1];
            //         }
            //     }

            //     // Convert blob into a downloadable link
            //     const url = window.URL.createObjectURL(new Blob([res.data]));
            //     const link = document.createElement("a");
            //     link.href = url;
            //     link.setAttribute("download", fileName); // <-- file name
            //     document.body.appendChild(link);
            //     link.click();
            //     link.remove();
            //     window.URL.revokeObjectURL(url);

            //     notifySuccess('Data exported successfully', 'success');
            // } else {
            //     notifyError('An error occurred while downloading!', 'error');
            // }
            console.log(res);
            // setOpenDownloadModal(false);
        } catch (err: any) {
            console.log(err);
            notifyError(err.response?.data?.responseMessage || 'Error exporting data', 'error');
        }
    }

    const convertTextToCSV = (textResponse: string) => {
        // Split the response into sections
        const sections = textResponse.split('\n\n');

        let allCsvData: any = [];

        sections.forEach(section => {
            const lines = section.trim().split('\n');
            if (lines.length > 0) {
                // Each line is already in CSV format with commas
                allCsvData.push(lines.join('\n'));
            }
        });

        // Combine all sections with double line breaks for separation
        const finalCsv = allCsvData.join('\n\n');

        // Create and download the CSV file
        downloadCSV(finalCsv, `partner_report_${new Date().getTime()}.csv`);
    }

    const downloadCSV = (csvContent: string, filename: string) => {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Fixed: Proper radio input handlers
    const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormat(e.target.value);
    };

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
                        className={`text-sm border ${dashboardData?.status === 'PENDING_KYB'
                            ? 'border-yellow-600 bg-yellow-100 text-yellow-600'
                            : dashboardData?.status === 'ACTIVE'
                                ? 'border-green-600 bg-green-100 text-green-600'
                                : 'border-blue-600 bg-blue-100 text-blue-600'
                            } rounded-full py-1 px-3`}
                    >
                        {dashboardData?.status || 'PENDING'}
                    </button>

                    <button
                        className='text-sm border bg-primary text-white rounded-lg py-1 px-3'
                        onClick={() => setOpenDownloadModal(true)}
                    >
                        Download report
                    </button>

                    <div className="relative">
                        <div className="flex cursor-pointer" onClick={toggleSettings}>
                            <Settings size={18} />
                            <ChevronDown size={18} />
                        </div>

                        {showSettings && (
                            <div className='rounded border p-4 absolute right-0 top-8 bg-white space-y-2 z-50 shadow-lg' ref={menuRef}>
                                <button
                                    className={`text-sm ${dashboardData?.status === 'PENDING_KYB'
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'hover:text-primary hover:underline cursor-pointer'
                                        } block w-full text-left`}
                                    onClick={() => {
                                        if (dashboardData?.status !== 'PENDING_KYB') {
                                            setAction('Suspend');
                                            setOpenReasonModal(true);
                                            setShowSettings(false);
                                        }
                                    }}
                                    disabled={dashboardData?.status === 'PENDING_KYB'}
                                >
                                    Suspend
                                </button>
                                <button
                                    className={`text-sm ${dashboardData?.status === 'ACTIVE'
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'hover:text-primary hover:underline cursor-pointer'
                                        } block w-full text-left`}
                                    onClick={() => {
                                        if (dashboardData?.status !== 'ACTIVE') {
                                            setAction('Approve');
                                            setOpenReasonModal(true);
                                            setShowSettings(false);
                                        }
                                    }}
                                    disabled={dashboardData?.status === 'ACTIVE'}
                                >
                                    Approve
                                </button>
                            </div>
                        )}
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
                                <Files size={18} onClick={handleCopyReferralCode} className='cursor-pointer hover:text-primary/70' />
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
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-lg z-50 max-w-md w-full">
                        <h2 className="text-lg font-medium mb-4">
                            {action === "Approve" ? "Approve Partner" : "Suspend Partner"}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Please provide a reason for {action.toLowerCase()}ing this partner
                        </p>
                        <textarea
                            className="w-full h-40 border border-gray-300 rounded-md p-2 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter reason here (minimum 10 words)..."
                            required
                        />
                        <p className="text-xs text-gray-500 mb-4">
                            {reason.trim().split(' ').filter(word => word !== '').length}/10 words minimum
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                                onClick={() => {
                                    setOpenReasonModal(false);
                                    setReason('');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className={`px-4 py-2 ${action === "Delete"
                                    ? "bg-red-500 hover:bg-red-400"
                                    : action === "Approve"
                                        ? "bg-green-600 hover:bg-green-500"
                                        : "bg-primary hover:bg-primary/70"
                                    } text-white rounded-md`}
                                onClick={updateReportStatus}
                            >
                                {action}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {openDownloadModal && (
                <div>
                    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn' onClick={() => setOpenDownloadModal(false)}></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full pointer-events-auto p-8 animate-scaleIn relative max-h-[90vh] overflow-y-auto space-y-4">
                            <X className="absolute top-4 right-4 cursor-pointer border p-1 rounded-lg hover:bg-gray-100" size={30} onClick={() => setOpenDownloadModal(false)} />
                            <h2 className="text-md font-semibold mb-4 text-center">Export Data</h2>

                            <div className="flex rounded-lg p-4 border border-primary bg-primary/20">
                                <ul>
                                    <li className='flex items-center'>
                                        <Dot size={20} className='text-primary flex-shrink-0' />
                                        <span>The export will include aggregated referral performance data only</span>
                                    </li>
                                    <li className='flex items-center mt-1'>
                                        <Dot size={20} className='text-primary flex-shrink-0' />
                                        <span>Personal or user-level data will not be included</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm mb-2 font-medium text-gray-700">File type</p>
                                <div className="flex gap-6">
                                    <label className='flex items-center cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="exportFormat"
                                            value="xlsx"
                                            className="mr-2 w-5 h-5 accent-primary cursor-pointer"
                                            checked={format === 'xlsx'}
                                            onChange={handleFormatChange}
                                        />
                                        <span>Excel (.xlsx)</span>
                                    </label>
                                    <label className='flex items-center cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="exportFormat"
                                            value="csv"
                                            className="mr-2 w-5 h-5 accent-primary cursor-pointer"
                                            checked={format === 'csv'}
                                            onChange={handleFormatChange}
                                        />
                                        <span>CSV (.csv)</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm mb-2 font-medium text-gray-700">Start date</p>
                                <input
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    className='w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    max={endDate || undefined}
                                />
                            </div>

                            <div>
                                <p className="text-sm mb-2 font-medium text-gray-700">End date</p>
                                <input
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    className='w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || undefined}
                                    max={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    className="px-6 py-2.5 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
                                    onClick={() => setOpenDownloadModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-2.5 bg-primary hover:bg-primary/70 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleExportData}
                                    disabled={!startDate || !endDate}
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewReferral