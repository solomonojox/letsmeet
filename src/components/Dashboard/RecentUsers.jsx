/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from 'react';
import { ChevronRight, Search, ChevronLeft, Filter, Check, ChevronUp, MoreVertical, CircleUser } from 'lucide-react';
import { createPortal } from 'react-dom';
import imageAsset from '../../assets/imageAsset';
import { api, useGetAllUsersQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const RecentUsers = () => {
  const { formatDate, showOverlay, hideOverlay } = useContext(AppContext);
  const { data, isLoading } = useGetAllUsersQuery([]);
  const users = data?.data?.items || [];

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // State for row action menu
  const [menuAnchor, setMenuAnchor] = useState(null);

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

  // Filter users based on search term
  const filteredUsers = users?.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  const maxPageButtons = 5;
  const middlePoint = Math.floor(maxPageButtons / 2);

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxPageButtons) {
    // Always show current page and some pages before and after
    const middlePoint = Math.floor(maxPageButtons / 2);

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
  const navigate = useNavigate();
  const handleNavigateToDetailsPage = (id, name) => {
    dispatch(api.endpoints.getUserById.initiate(id));
    navigate(`/user-profile/${id}`, { state: { id: id, userName: name } });
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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Recent Users</h2>
        <Link to="/users" className="text-blue-600 text-sm flex items-center">
          View all users <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-12 py-3 ">
                <input type="checkbox" className="h-4 w-4 accent-primary" />
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">
                Date Created
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Plan</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Location</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500 pr-4">
                <div className="flex items-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm">
                <td className="py-4 pl-4">
                  <input type="checkbox" className="h-4 w-4" />
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <img
                      src={user?.profilePictureUrl || imageAsset.avatar}
                      alt={user?.firstName}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-gray-500">{formatDate(user?.createdAt)}</td>
                <td className="py-4 pr-4 text-gray-500">
                  {user?.subscriptionPlan === 1 ? "Free" : user?.subscriptionPlan === 2 ? "Gold" : "Platinum"}
                </td>
                <td className="py-4 text-gray-500">
                  {user.state}, {user?.country}
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 pr-4 text-right">
                  <div className="flex items-center justify-start">
                    <button
                      className="text-gray-500 hover:text-gray-700 "
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
            ))}
          </tbody>
        </table>
      </div>

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

export default RecentUsers;