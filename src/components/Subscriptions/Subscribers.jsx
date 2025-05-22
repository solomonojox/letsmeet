/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Settings, ChevronDown, ChevronUp, Search, ChevronLeft, Filter, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import imageAsset from '../../assets/imageAsset';
import { useGetSubscribersQuery } from '../../Services/API/api';

const Subscribers = () => {
    const { data } = useGetSubscribersQuery([])
    // console.log(data)

    const [senders, setSenders] = useState([
        {
            id: 1,
            name: 'Brooklyn Simmons',
            avatar: '/api/placeholder/50/50',
            dateCreated: '4/21/12',
            plan: 'Free',
            location: 'Ikorodu, Lagos, Nigeria',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Kathryn Murphy',
            avatar: '/api/placeholder/50/50',
            dateCreated: '9/18/16',
            plan: 'Free',
            location: 'Ikorodu, Lagos, Nigeria',
            status: 'Deactivated'
        },
        {
            id: 3,
            name: 'Floyd Miles',
            avatar: '/api/placeholder/50/50',
            dateCreated: '12/4/17',
            plan: 'Premium',
            location: 'Ikorodu, Lagos, Nigeria',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Guy Hawkins',
            avatar: '/api/placeholder/50/50',
            dateCreated: '8/21/15',
            plan: 'Basic',
            location: 'Ikorodu, Lagos, Nigeria',
            status: 'In review'
        },
        {
            id: 5,
            name: 'Esther Howard',
            avatar: '/api/placeholder/50/50',
            dateCreated: '1/15/12',
            plan: 'Premium',
            location: 'Ikorodu, Lagos, Nigeria',
            status: 'Deactivated'
        }
    ]);

    const navigate = useNavigate();

    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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
            case 'Active':
                return 'bg-green-100 text-green-600';
            case 'Deactivated':
                return 'bg-red-100 text-red-600';
            case 'In review':
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
        if (value === 'All') {
            // If 'All' is selected, uncheck all other options and check 'All'
            setFilters(prev => ({
                ...prev,
                [filterType]: {
                    ...Object.keys(prev[filterType]).reduce((acc, key) => {
                        acc[key] = key === 'All';
                        return acc;
                    }, {})
                }
            }));
        } else {
            // If a specific value is selected, uncheck 'All'
            setFilters(prev => ({
                ...prev,
                [filterType]: {
                    ...prev[filterType],
                    [value]: !prev[filterType][value],
                    'All': false
                }
            }));

            // If all specific options are unchecked, check 'All'
            const updatedFilters = {
                ...filters,
                [filterType]: {
                    ...filters[filterType],
                    [value]: !filters[filterType][value],
                    'All': false
                }
            };

            const allUnchecked = Object.entries(updatedFilters[filterType])
                .filter(([key]) => key !== 'All')
                .every(([_, checked]) => !checked);

            if (allUnchecked) {
                setFilters(prev => ({
                    ...prev,
                    [filterType]: {
                        ...prev[filterType],
                        'All': true
                    }
                }));
            }
        }
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
    };

    // Filter users based on search term and selected filters
    const filteredUsers = senders.filter(user => {
        // Search filter
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.dateCreated.includes(searchTerm);

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

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">Subscribers</h2>
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

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="w-12 py-3 pl-4">
                                <input type="checkbox" className="h-4 w-4 accent-primary" />
                            </th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Name</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Plan</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Start Date(M/D/Y)</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-500 pr-4">
                                <div className="flex items-center">
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 pl-4">
                                    <input type="checkbox" className="h-4 w-4 accent-primary" />
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img
                                            src={imageAsset.avatar}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full mr-3"
                                        />
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-500">{user.dateCreated}</td>
                                <td className="py-4 text-gray-500">{user.plan}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-4 pr-4 text-right relative">
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

                                    {/* Modal for actions */}
                                    {openModal === user.id && (
                                        <div
                                            ref={el => modalRef.current[user.id] = el}
                                            className={`absolute ${modalPositions[user.id] ? 'bottom-full mb-2' : 'mt-2'} right-8 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50`}
                                        >
                                            <div className="py-3 px-4 border-b border-gray-200">
                                                <a href="#" className="text-gray-600 block text-left text-md hover:text-primary hover:underline hover:underline-offset-2" onClick={() => navigate(`/user/${user.id}`, { state: { userId: user.id } })}>View profile</a>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 px-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-1 text-sm rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
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
                    className={`flex items-center px-3 py-1 text-sm rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    );
};

export default Subscribers;