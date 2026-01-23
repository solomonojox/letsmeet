/* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useContext } from 'react';
import { ChevronRight, ChevronLeft, Search, Filter, Check, MoreVertical, SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import imageAsset from '../../assets/imageAsset';
import axios from 'axios';
import { useGetAllPartnersQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import TableSkeletonLoader from '../../ui/TableSkeletonLoader';
import CreateNewReferralAccount from './CreateNewReferralAccount';
import { approvePartner, createReferral, deletePartner, suspendPartner } from '../../Services/referrals';

const AllReferrals = () => {
    const { formatDate, showOverlay, hideOverlay, notifySuccess, notifyError } = useContext(AppContext);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // console.log(tableData)
    // const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const ITEMS_PER_PAGE = 10;
    const { data, isLoading, refetch } = useGetAllPartnersQuery({
        PageSize: ITEMS_PER_PAGE,
        PageNumber: currentPage,
    });
    const tableData = data?.data?.items || [];
    const totalPages = data?.data?.totalPages

    // State for row action menu
    const [menuAnchor, setMenuAnchor] = useState(null);

    // Filter state
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        status: {
            All: true,
            Resolved: false,
            Closed: false,
            Pending: false,
        }
    });

    // References for outside click detection
    const filterModalRef = useRef(null);
    const filterButtonRef = useRef(null);

    useEffect(() => {
        // Handle clicks outside the filter modal
        function handleClickOutside(event) {
            // Filter modal
            if (showFilterModal) {
                const filterModal = filterModalRef.current;
                const filterButton = filterButtonRef.current;

                if (filterModal &&
                    !filterModal.contains(event.target) &&
                    filterButton &&
                    !filterButton.contains(event.target)) {
                    setShowFilterModal(false);
                }
            }
        }

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilterModal]);

    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-600';
            case 'Closed':
                return 'bg-red-100 text-red-600';
            case 'PENDING_KYB':
                return 'bg-yellow-100 text-yellow-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Resolved':
                return 'text-green-500';
            case 'Closed':
                return 'text-red-500';
            case 'Pending':
                return 'text-yellow-500';
            default:
                return 'text-gray-500';
        }
    };

    const toggleFilterModal = () => {
        setShowFilterModal(!showFilterModal);
    };

    const handleFilterChange = (filterType, value) => {
        let newFilterState;
        if (value === 'All') {
            // If 'All' is selected, uncheck all other options and check 'All'
            newFilterState = {
                ...filters[filterType],
                ...Object.keys(filters[filterType]).reduce((acc, key) => {
                    acc[key] = key === 'All';
                    return acc;
                }, {})
            };
        } else {
            // If a specific value is selected, uncheck 'All' and toggle the value
            const toggledValue = !filters[filterType][value];
            newFilterState = {
                ...filters[filterType],
                [value]: toggledValue,
                'All': false
            };

            // If all specific options are unchecked, check 'All'
            const allUnchecked = Object.entries(newFilterState)
                .filter(([key]) => key !== 'All')
                .every(([_, checked]) => !checked);

            if (allUnchecked) {
                newFilterState = {
                    ...newFilterState,
                    'All': true
                };
            }
        }

        setFilters(prev => ({
            ...prev,
            [filterType]: newFilterState
        }));
    };

    const applyFilter = () => {
        setShowFilterModal(false);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const resetFilters = () => {
        setFilters({
            status: {
                All: true,
                Resolved: false,
                Closed: false,
                Pending: false
            },
        });
        setCurrentPage(1);
    };

    // Filter users based on search term and selected filters
    const filteredReports = tableData?.filter(report => {
        // Search filter
        const matchesSearch =
            report.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.businessEmail.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const statusFilterApplied = !filters.status.All;
        const matchesStatusFilter = statusFilterApplied ? filters.status[report.reportStatus] : true;

        return matchesSearch && matchesStatusFilter;
    });

    // Generate page numbers
    const pageNumbers = [];
    const maxPageButtons = 5;
    const middlePoint = Math.floor(maxPageButtons / 2);

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPageButtons) {
        // Always show current page and some pages before and after
        if (currentPage <= middlePoint) {
            // Near the start
            endPage = maxPageButtons;
        } else if (currentPage >= totalPages - middlePoint) {
            // Near the end
            startPage = totalPages - maxPageButtons + 1;
        } else {
            // In the middle
            startPage = currentPage - middlePoint;
            endPage = currentPage + middlePoint;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const [reason, setReason] = useState('');
    const [openReansonModal, setOpenReasonModal] = useState(false);
    const [partnerId, setPartnerId] = useState(null);
    const [revenueSharePercentage, setRevenueSharePercentage] = useState(null);
    const [kybExpiryDate, setKybExpiryDate] = useState(null);
    const [action, setAction] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    // console.log(action);

    const handleOpenReasonModal = (partnerId, revenueSharePercentage, kybExpiryDate, action) => {
        setPartnerId(partnerId);
        setRevenueSharePercentage(revenueSharePercentage);
        setKybExpiryDate(kybExpiryDate);
        setOpenReasonModal(true);
        setAction(action);
    }

    const updateReportStatus = () => {
        // console.log('keyboard');
        if (action === "Approve") {
            handleApprovePartner();
        } else if (action === "Suspend") {
            handleSuspendPartner();
        } else if (action === "Delete") {
            handleDeletePartner();
        }
    }

    const handleApprovePartner = async () => {
        // validate reason to ensure it must be at least 10 words
        if (reason.trim().split('').length < 10) {
            notifyError('Reason must be at least 10 letters', 'error');
            return;
        }

        showOverlay();
        const payload = {
            partnerId: partnerId,
            approved: true,
            decisionRationale: reason,
            revenueSharePercentage: revenueSharePercentage,
            kybExpiryDate: kybExpiryDate
        }
        try {
            const res = await approvePartner(payload);
            notifySuccess('Partner approved successfully', 'success');
            setOpenReasonModal(false);
            setReason('');
            refetch();
        } catch (err) {
            console.log(err);
            notifyError(err.response?.data?.responseMessage || 'Error approving partner', 'error');
        } finally {
            hideOverlay();
        }
    }

    const handleSuspendPartner = async () => {
        showOverlay();
        const payload = {
            partnerId: partnerId,
            newStatus: "PENDING_KYB",
            reason: reason
        }
        try {
            const res = await suspendPartner(payload);
            notifySuccess('Partner suspended successfully', 'success');
            setOpenReasonModal(false);
            setReason('');
            refetch();
        } catch (err) {
            console.log(err);
            notifyError(err.response?.data?.responseMessage || 'Error suspending partner', 'error');
        } finally {
            hideOverlay();
        }
    }

    const editPartner = async (partnerId) => {
        showOverlay();
    }

    const openDeleteModal = (partnerId) => {
        setPartnerId(partnerId);
        setDeleteModal(true);
    }
    const handleDeletePartner = async () => {
        showOverlay();
        const payload ={
            partnerId: partnerId,
            reason: reason
        }
        try {
            const res = await deletePartner(partnerId, payload);
            notifySuccess('Partner offboarded successfully', 'success');
            setOpenReasonModal(false);
            setReason('');
            setDeleteModal(false);
            refetch();
        } catch (err) {
            console.log(err);
            notifyError(err.response?.data?.responseMessage || 'Error deleting partner', 'error');
        } finally {
            hideOverlay();
        }
    }

    const ReportActionMenu = ({ anchorRect, report, onClose }) => {
        const menuRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (e) => {
                if (menuRef.current && !menuRef.current.contains(e.target)) {
                    onClose();
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [onClose]);

        const style = {
            position: "absolute",
            top: anchorRect.bottom + window.scrollY + 4,
            left: anchorRect.right - 160 + window.scrollX,
            width: "160px",
            zIndex: 1000,
        };

        return createPortal(
            <div
                ref={menuRef}
                style={style}
                className="bg-white shadow-lg rounded-md border"
            >
                <div className="p-2">
                    <div className="text-gray-400 mb-2 text-sm">Decisions:</div>
                    <button
                        className={`w-full flex items-center px-3 py-2 text-sm ${report.status === 'ACTIVE' ? "text-gray-300" : "hover:bg-green-500 hover:text-white"} rounded-md mb-1`}
                        onClick={() => {
                            handleOpenReasonModal(report.id, report.revenueSharePercentage, report.kybExpiryDate, "Approve");
                            onClose();
                        }}
                        disabled={report.status === 'ACTIVE'}
                    >
                        Approve
                    </button>
                    <button
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${report.status === 'PENDING_KYB' ? "text-gray-300" : "hover:bg-yellow-600 hover:text-white"}`}
                        onClick={() => {
                            handleOpenReasonModal(report.id, report.revenueSharePercentage, report.kybExpiryDate, "Suspend");
                            onClose();
                        }}
                        disabled={report.status === 'PENDING_KYB'}
                    >
                        Suspend
                    </button>
                    <button
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${report.status === 'OFFBOARDED' ? "text-gray-300" : "hover:bg-red-600 hover:text-white"}`}
                        onClick={() => {
                            handleOpenReasonModal(report.id, report.revenueSharePercentage, report.kybExpiryDate, "Delete");
                            onClose();
                        }}
                        disabled={report.status === 'OFFBOARDED'}
                    >
                        Delete
                    </button>
                    <button
                        className="w-full flex items-center px-3 py-2 text-sm hover:bg-primary hover:text-white rounded-md mb-1"
                        onClick={() => {
                            navigate(`/referrals/${report.id}` , { state: { userName: report.businessName } });
                            onClose();
                        }}
                    >
                        View details
                    </button>
                </div>
            </div>,
            document.body
        );
    };

    const [createNewUserModalOpen, setCreateNewUserModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const handleCreateNewReferralAccount = async (FormData) => {
        setCreating(true);
        try {
            const res = await createReferral(FormData);
            notifySuccess('Referral account created successfully', 'success');
            setCreateNewUserModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error creating referral account:', error);
            notifyError(error.response?.data?.error || 'Error creating referral account', 'error');
        } finally {
            setCreating(false);
        }
    }

    if (isLoading || loading) {
        return <TableSkeletonLoader rows={5} headers={['Name', 'Total referrer', 'Date joined', 'Status', 'Action']} />;
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-md font-medium text-gray-700">User's Organizations</h2>
                <div className="relative flex gap-4">
                    <button
                        ref={filterButtonRef}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={toggleFilterModal}
                    >
                        <SlidersHorizontal className="w-4 h-4 mr-4" />
                        Filter
                    </button>

                    <button className='bg-primary px-4 py-2 rounded-md text-white text-sm hover:bg-primary/70' onClick={() => setCreateNewUserModalOpen(true)}>Create new account</button>

                    {showFilterModal && (
                        <div
                            ref={filterModalRef}
                            className="absolute right-10 mt-10 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                        >
                            <div className="p-4">
                                <div className="text-sm text-gray-500 mb-2">Filter by:</div>

                                {/* Status Filter */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Status</span>
                                        <ChevronRight className="w-4 h-4 text-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        {Object.keys(filters.status).map((status, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className={`text-sm ${status !== 'All' ? getStatusTextColor(status) : 'text-gray-700'}`}>
                                                    {status}
                                                </span>
                                                <div
                                                    className={`w-5 h-5 flex items-center justify-center rounded ${filters.status[status] ? 'bg-blue-600' : 'border border-gray-300'}`}
                                                    onClick={() => handleFilterChange('status', status)}
                                                >
                                                    {filters.status[status] && <Check className="w-4 h-4 text-white" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                                    onClick={applyFilter}
                                >
                                    Apply filter
                                </button>

                                <button
                                    className="w-full mt-2 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
                                    onClick={resetFilters}
                                >
                                    Reset to default
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search for reports"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-[800px] w-full mb-18">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="w-12 py-3">
                                <input type="checkbox" className="h-4 w-4 accent-primary" />
                            </th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Name</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Total referrals</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Date joined</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500 pr-4">
                                <div className="flex items-center">
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.length > 0 ? filteredReports.map((partner) => (
                            <tr key={partner.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm">
                                <td className="py-4 pl-4">
                                    <input type="checkbox" className="h-4 w-4 accent-primary" />
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 whitespace-nowrap">{partner.businessName}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 whitespace-nowrap">{partner.totalReferredUsers}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-500 max-w-[300px]">{formatDate(partner.createdAt)}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                                        {partner.status}
                                    </span>
                                </td>
                                <td className="py-4 pr-4 text-right">
                                    <div className="flex items-center justify-start">
                                        <button
                                            className="text-gray-500 hover:text-gray-700 flex items-center"
                                            onClick={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                setMenuAnchor({ rect, partner });
                                            }}
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-500">
                                    No organization found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination - only render if there are reports to paginate */}
            {filteredReports.length > 0 && (
                <div className="flex items-center justify-between mt-4 px-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center px-3 py-1 text-sm rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {totalPages > maxPageButtons && currentPage > middlePoint && (
                            <>
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    className={`px-3 py-1 rounded-md text-sm ${1 === currentPage ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    1
                                </button>
                                {startPage > 2 && (
                                    <span className="px-2 py-1 text-gray-500">...</span>
                                )}
                            </>
                        )}

                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-3 py-1 rounded-md text-sm ${number === currentPage ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {number}
                            </button>
                        ))}

                        {totalPages > maxPageButtons && currentPage < (totalPages - middlePoint) && (
                            <>
                                {endPage < totalPages - 1 && (
                                    <span className="px-2 py-1 text-gray-500">...</span>
                                )}
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`px-3 py-1 rounded-md text-sm ${totalPages === currentPage ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-3 py-1 text-sm rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            )}

            {/* Floating menu */}
            {menuAnchor && (
                <ReportActionMenu
                    anchorRect={menuAnchor.rect}
                    report={menuAnchor.partner}
                    onClose={() => setMenuAnchor(null)}
                />
            )}

            {createNewUserModalOpen && (
                <CreateNewReferralAccount
                    onClose={() => setCreateNewUserModalOpen(false)}
                    onSubmit={handleCreateNewReferralAccount}
                    loading={creating}
                />
            )}

            {openReansonModal && (
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

            {deleteModal && (
                <div className="fixed inset-0 bg-black/50 z-50">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg z-50">
                        <h2 className="text-lg font-medium mb-4">Are you sure you want to delete this user?</h2>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mr-2"
                                onClick={handleDeletePartner}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                                onClick={() => setDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllReferrals;