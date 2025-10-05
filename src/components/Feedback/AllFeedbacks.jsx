/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from 'react';
import { ChevronRight, Settings, ChevronDown, ChevronUp, Search, ChevronLeft, Filter, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import imageAsset from '../../assets/imageAsset';
import { AppContext } from '../../Context/AppContext';
import { useGetAllFeedbacksQuery } from '../../Services/API/api';
import TableSkeletonLoader from '../../ui/TableSkeletonLoader';

const AllFeedbacks = () => {
    const { formatDate } = useContext(AppContext);
    const { data, isLoading } = useGetAllFeedbacksQuery();
    const requestData = data?.data || [];
    // console.log(requestData);

    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // State to track which row's modal is open
    const [openModal, setOpenModal] = useState(null);
    // State to track if the modal should be positioned above
    const [modalPositions, setModalPositions] = useState({});

    // Filter state
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        status: {
            All: true,
            Active: false,
            Deactivated: false,
            'In review': false
        },
        plan: {
            All: true,
            Free: false,
            Basic: false,
            Premium: false
        }
    });

    // References for outside click detection
    const modalRef = useRef({});
    const buttonRef = useRef({});
    const filterModalRef = useRef(null);
    const filterButtonRef = useRef(null);

    useEffect(() => {
        // Handle clicks outside the modal
        function handleClickOutside(event) {
            // Action settings modal
            if (openModal !== null) {
                const modalElement = modalRef.current[openModal];
                const buttonElement = buttonRef.current[openModal];

                if (modalElement &&
                    !modalElement.contains(event.target) &&
                    buttonElement &&
                    !buttonElement.contains(event.target)) {
                    setOpenModal(null);
                }
            }

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
    }, [openModal, showFilterModal]);

    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Function to calculate if modal should be positioned above
    const calculateModalPosition = (userId) => {
        if (!buttonRef.current[userId]) return;

        const buttonRect = buttonRef.current[userId].getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const bottomSpace = viewportHeight - buttonRect.bottom;

        // If there's less than 250px below the button, position the modal above
        setModalPositions(prev => ({
            ...prev,
            [userId]: bottomSpace < 250
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return 'bg-green-100 text-green-600';
            case 2:
                return 'bg-red-100 text-red-600';
            case 0:
                return 'bg-yellow-100 text-yellow-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Active':
                return 'text-green-500';
            case 'Deactivated':
                return 'text-red-500';
            case 'In review':
                return 'text-yellow-500';
            default:
                return 'text-gray-500';
        }
    };

    const toggleModal = (userId) => {
        // Calculate position whenever modal is opened
        calculateModalPosition(userId);

        if (openModal === userId) {
            setOpenModal(null);
        } else {
            setOpenModal(userId);
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
                Active: false,
                Deactivated: false,
                'In review': false
            },
            plan: {
                All: true,
                Free: false,
                Basic: false,
                Premium: false
            }
        });
        setCurrentPage(1);
    };

    // Filter users based on search term and selected filters
    const filteredUsers = requestData?.filter(user => {
        // Search filter
        const matchesSearch =
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.createdAt.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const statusFilterApplied = !filters.status.All;
        const matchesStatusFilter = statusFilterApplied ? filters.status[user.status] : true;

        // Plan filter
        const planFilterApplied = !filters.plan.All;
        const matchesPlanFilter = planFilterApplied ? filters.plan[user.plan] : true;

        return matchesSearch && matchesStatusFilter && matchesPlanFilter;
    });

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

    if (isLoading) {
        return <TableSkeletonLoader headers={['Title', 'Message', 'Date sent']} />;
    
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">All Feedbacks</h2>
                <div className="relative">
                    {/* <button
                        ref={filterButtonRef}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={toggleFilterModal}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </button> */}

                    {/* {showFilterModal && (
                        <div
                            ref={filterModalRef}
                            className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                        >
                            <div className="p-4">
                                <div className="text-sm text-gray-500 mb-2">Filter by:</div>

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
                    )} */}
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
                    placeholder="Search for feedbacks"
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
                            <th className="text-left py-3 text-sm font-medium text-gray-500">From</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Message</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Date sent</th>
                            {/* <th className="text-left py-3 text-sm font-medium text-gray-500 pr-4">
                                <div className="flex items-center">
                                    Action
                                </div>
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (currentUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 pl-4">
                                    <input type="checkbox" className="h-4 w-4 accent-primary" />
                                </td>
                                <td className="py-4 text-gray-500 ">{user.email}</td>
                                <td className="py-4 text-gray-500 pr-6 max-w-[400px]">{user.message}</td>
                                <td className="py-4 text-gray-500  ">{formatDate(user.createdAt)}</td>
                                {/* <td className="py-4 pr-4 text-right relative">
                                    <div className="flex items-center justify-end">
                                        <button
                                            className="text-gray-500 hover:text-gray-700 flex items-center"
                                            onClick={() => toggleModal(user.id)}
                                            ref={el => buttonRef.current[user.id] = el}
                                        >
                                            <Settings className="w-5 h-5 mr-1" />
                                            {openModal === user.id ?
                                                <ChevronUp className="w-4 h-4" /> :
                                                <ChevronDown className="w-4 h-4" />
                                            }
                                        </button>
                                    </div>

                                    {openModal === user.requestId && (
                                        <div
                                            ref={el => modalRef.current[user.requestId] = el}
                                            className={`absolute ${modalPositions[user.requestId] ? 'bottom-full mb-2' : 'mt-2'} right-8 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50`}
                                        >
                                            <div className="py-3 px-4 border-b border-gray-200">
                                                <a href="#" className="text-gray-600 block text-left text-md hover:text-primary hover:underline hover:underline-offset-2" onClick={() => navigate(`/user/${user.requestId}`, { state: { userId: user.id } })}>View profile</a>
                                            </div>
                                            <div className="p-4">
                                                <div className="text-gray-400 mb-2 text-md">Decisions:</div>

                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-green-500 text-md">Activate account</span>
                                                    <input type="checkbox" className="h-4 w-4" />
                                                </div>

                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-red-500 text-md">Deactivate account</span>
                                                    <input type="checkbox" className="h-4 w-4" />
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-yellow-500 text-md">Review account</span>
                                                    <input type="checkbox" className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td> */}
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No feedbacks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination - only render if there are users to paginate */}
            {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between mt-4 w-full">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center px-3 py-1 text-sm rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Prev
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
        </div>
    );
};

export default AllFeedbacks;