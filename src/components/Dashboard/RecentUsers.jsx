/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from 'react';
import { ChevronRight, Settings, ChevronDown, ChevronUp, Search, ChevronLeft } from 'lucide-react';
import imageAsset from '../../assets/imageAsset';
import { useGetAllUsersQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import { Link } from 'react-router-dom';

const RecentUsers = () => {
  const { formatDate, showOverlay, hideOverlay } = useContext(AppContext);
  const { data: usersr, isLoading } = useGetAllUsersQuery([]);
  // console.log(usersr);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Brooklyn Simmons',
      avatar: imageAsset.avatar,
      dateCreated: '4/21/12',
      plan: 'Free',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Kathryn Murphy',
      avatar: imageAsset.avatar,
      dateCreated: '9/18/16',
      plan: 'Free',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Deactivated'
    },
    {
      id: 3,
      name: 'Floyd Miles',
      avatar: imageAsset.avatar,
      dateCreated: '12/4/17',
      plan: 'Premium ~ Monthly',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Guy Hawkins',
      avatar: imageAsset.avatar,
      dateCreated: '8/21/15',
      plan: 'Basic ~ Yearly',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'In Review'
    },
    {
      id: 5,
      name: 'Esther Howard',
      avatar: imageAsset.avatar,
      dateCreated: '1/15/12',
      plan: 'Premium ~ Yearly',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Deactivated'
    }
  ]);

  // State for search and pagination

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // State to track which row's modal is open
  const [openModal, setOpenModal] = useState(null);
  // State to track if the modal should be positioned above
  const [modalPositions, setModalPositions] = useState({});

  // References for outside click detection
  const modalRef = useRef({});
  const buttonRef = useRef({});

  useEffect(() => {
    // Handle clicks outside the modal
    function handleClickOutside(event) {
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
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  useEffect(() => {
    if (isLoading) {
      showOverlay()
    } else {
      hideOverlay(false)
    }
  })

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
      case 'In Review':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
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

  // Filter users based on search term
  const filteredUsers = usersr?.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // user.subscriptionPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // user.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.createdAt.includes(searchTerm)
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
              <tr key={user.userId} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 pl-4">
                  <input type="checkbox" className="h-4 w-4" />
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <img
                      src={imageAsset.avatar}
                      alt={user?.firstName}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="font-medium">
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
                <td className="py-4 pr-4 text-right relative">
                  <div className="flex items-center justify-start">
                    <button
                      className="text-gray-500 hover:text-gray-700 flex items-center"
                      onClick={() => toggleModal(user.userId)}
                      ref={(el) => (buttonRef.current[user.userId] = el)}
                    >
                      <Settings className="w-5 h-5 mr-1" />
                      {openModal === user.userId ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Modal for actions */}
                  {openModal === user.userId && (
                    <div
                      ref={(el) => (modalRef.current[user.userId] = el)}
                      className={`absolute ${modalPositions[user.userId] ? "bottom-full mb-2" : "mt-2"
                        } right-8 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50`}
                    >
                      <div className="py-3 px-4 border-b border-gray-200">
                        <a href="#" className="text-gray-600 block text-left text-md">
                          View profile
                        </a>
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
      {/* <div className="flex items-center justify-between mt-4 px-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-1 text-sm rounded-md ${currentPage === 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-1">
          {totalPages > maxPageButtons && currentPage > middlePoint && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1 rounded-md text-sm ${1 === currentPage
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 py-1 text-gray-500">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded-md text-sm ${number === currentPage
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {number}
            </button>
          ))}

          {totalPages > maxPageButtons && currentPage < totalPages - middlePoint && (
            <>
              {endPage < totalPages - 1 && <span className="px-2 py-1 text-gray-500">...</span>}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 rounded-md text-sm ${totalPages === currentPage
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-1 text-sm rounded-md ${currentPage === totalPages ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div> */}
    </div>
  );
};

export default RecentUsers;