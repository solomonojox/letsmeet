/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from 'react';
import { ChevronRight, ChevronDown, ChevronUp, Search, ChevronLeft, Filter, Check, MoreVertical, CircleUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import imageAsset from '../../assets/imageAsset';
import { AppContext } from '../../Context/AppContext';
import { api, useGetAllUsersQuery } from '../../Services/API/api';
import { useDispatch } from 'react-redux';
import TableSkeletonLoader from '../../ui/TableSkeletonLoader';

const AllUsers = () => {
    const { formatDate, showOverlay, hideOverlay } = useContext(AppContext);

    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    // Filter state
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        status: {
            All: true,
            ACTIVE: false,
            DEACTIVATED: false,
            'IN REVIEW': false
        },
        plan: {
            All: true,
            Free: false,
            Gold: false,
            Platinum: false
        }
    });

    const buildODataFilter = () => {
        const filtersArray = [];

        // Filter by search term
        if (searchTerm) {
            filtersArray.push(
                `(contains(FirstName, '${searchTerm}') or contains(LastName, '${searchTerm}') or contains(State, '${searchTerm}'))`
            );
        }

        // Filter by status
        const activeStatusFilters = Object.entries(filters.status)
            .filter(([key, value]) => key !== "All" && value)
            .map(([key]) => `Status eq '${key}'`);

        if (activeStatusFilters.length > 0) {
            filtersArray.push(`(${activeStatusFilters.join(" or ")})`);
        }

        // Filter by plan
        const activePlanFilters = Object.entries(filters.plan)
            .filter(([key, value]) => key !== "All" && value)
            .map(([key]) => `SubscriptionPlan eq '${key}'`);

        if (activePlanFilters.length > 0) {
            filtersArray.push(`(${activePlanFilters.join(" or ")})`);
        }

        return filtersArray.join(" and ");
    };

    const ITEMS_PER_PAGE = 10;
    const filter = buildODataFilter();
    const { data, isLoading } = useGetAllUsersQuery({
        PageSize: ITEMS_PER_PAGE,
        PageNumber: currentPage,
    });
    const users = data?.data?.items
    const totalPages = data?.data?.totalPages

    // Subscription plan mapping
    const planMapping = {
        1: 'Free',
        2: 'Gold',
        3: 'Platinum'
    };

    const navigate = useNavigate();

    // State for row action menu
    const [menuAnchor, setMenuAnchor] = useState(null);

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
            case 'DEACTIVATED':
                return 'bg-red-100 text-red-600';
            case 'IN REVIEW':
                return 'bg-yellow-100 text-yellow-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'text-green-500';
            case 'DEACTIVATED':
                return 'text-red-500';
            case 'IN REVIEW':
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
                ACTIVE: false,
                DEACTIVATED: false,
                'IN REVIEW': false
            },
            plan: {
                All: true,
                Free: false,
                Gold: false,
                Platinum: false
            }
        });
        setCurrentPage(1);
    };

    // Get subscription plan name from plan ID
    const getPlanName = (planId) => {
        return planMapping[planId] || 'Unknown';
    };

    // Filter users based on search term and selected filters
    const filteredUsers = users?.filter(user => {
        // Search filter
        const matchesSearch =
            user?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            user?.lastName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            user?.state?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            user?.createdAt?.toLowerCase().includes(searchTerm?.toLowerCase());

        // Status filter
        const statusFilterApplied = !filters.status.All;
        const matchesStatusFilter = statusFilterApplied ? filters.status[user.status] : true;

        // Plan filter
        const planFilterApplied = !filters.plan.All;
        const userPlanName = getPlanName(user.subscriptionPlan);
        const matchesPlanFilter = planFilterApplied ? filters.plan[userPlanName] : true;

        return matchesSearch && matchesStatusFilter && matchesPlanFilter;
    });

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    // const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);

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

    const dispatch = useDispatch();
    const handleNavigateToDetailsPage = (id, name) => {
        dispatch(api.endpoints.getUserById.initiate(id));
        navigate(`/user-profile/${id}`, { state: { userId: id, userName: name } });
    }

    const RowActionMenu = ({ anchorRect, user, onClose }) => {
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
                <button
                    className="w-full flex items-center px-3 py-2 text-sm hover:bg-primary hover:text-white rounded-t-md"
                    onClick={() => {
                        handleNavigateToDetailsPage(user.id, `${user.firstName} ${user.lastName}`);
                        onClose();
                    }}
                >
                    <CircleUser className="w-4 h-4 mr-2" /> View Profile
                </button>
            </div>,
            document.body
        );
    };

    if (isLoading) return <TableSkeletonLoader rows={5} headers={['Name', 'Date created', 'Plan', 'Location', 'Status', 'Action']} />

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">All users</h2>
                <div className="relative">
                    <button
                        ref={filterButtonRef}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={toggleFilterModal}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </button>

                    {showFilterModal && (
                        <div
                            ref={filterModalRef}
                            className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                        >
                            <div className="p-4">
                                <div className="text-sm text-gray-500 mb-2">Filter by:</div>

                                {/* Status Filter */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Status</span>
                                        <ChevronUp className="w-4 h-4 text-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        {Object.keys(filters.status).map(status => (
                                            <div key={status} className="flex items-center justify-between">
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

                                {/* Plan Filter */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Plan</span>
                                        <ChevronUp className="w-4 h-4 text-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        {Object.keys(filters.plan).map(plan => (
                                            <div key={plan} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-700">{plan}</span>
                                                <div
                                                    className={`w-5 h-5 flex items-center justify-center rounded ${filters.plan[plan] ? 'bg-blue-600' : 'border border-gray-300'}`}
                                                    onClick={() => handleFilterChange('plan', plan)}
                                                >
                                                    {filters.plan[plan] && <Check className="w-4 h-4 text-white" />}
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
                    placeholder="Search for users"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="w-full overflow-x-auto">
                <table className="min-w-[800px] w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="w-12 py-3">
                                <input type="checkbox" className="h-4 w-4 accent-primary" />
                            </th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Name</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Date Created</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Plan</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Location</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500 pr-4">
                                <div className="flex items-center">
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.length > 0 ? (filteredUsers?.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm">
                                <td className="py-4 pl-4">
                                    <input type="checkbox" className="h-4 w-4 accent-primary" />
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img
                                            src={user?.profilePictureUrl || imageAsset.avatar}
                                            alt={`${user?.firstName} ${user?.lastName}`}
                                            className="w-8 h-8 rounded-full mr-3"
                                        />
                                        <span className="cursor-pointer" onClick={() => handleNavigateToDetailsPage(user.id, `${user.firstName} ${user.lastName}`)}>{user?.firstName} {user?.lastName}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-500 min-w-34">{formatDate(user?.createdAt)}</td>
                                <td className="py-4 pr-4 text-gray-500">
                                    {getPlanName(user.subscriptionPlan)}
                                </td>
                                <td className="py-4 text-gray-500 ">{user.state}, {user?.country}</td>
                                <td className="py-4 pr-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-4 pr-4 text-right">
                                    <div className="flex items-center justify-start">
                                        <button
                                            className="text-gray-500 hover:text-gray-700 flex items-center"
                                            onClick={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                setMenuAnchor({ rect, user });
                                            }}
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination - only render if there are users to paginate */}
            {filteredUsers?.length > 0 && (
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
                        // onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        onClick={() => setCurrentPage(currentPage + 1)}
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
                <RowActionMenu
                    anchorRect={menuAnchor.rect}
                    user={menuAnchor.user}
                    onClose={() => setMenuAnchor(null)}
                />
            )}
        </div>
    );
};

export default AllUsers;