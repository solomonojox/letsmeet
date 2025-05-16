import { useState, useRef, useEffect, useContext } from 'react';
import { Settings } from 'lucide-react';
import imageAsset from '../../assets/imageAsset';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';

const UserDetails = () => {
  const params = useParams();
  const { formatDate, formateDateTime, showOverlay, hideOverlay } = useContext(AppContext);
  const { data: usersData, isLoading } = useGetUserByIdQuery(params.id);

  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);
  const modalRef = useRef(null);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) &&
        settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isLoading) {
      showOverlay();
    } else {
      hideOverlay();
    }
  }, [isLoading, showOverlay, hideOverlay]);

  return (
    <div className="mx-auto font-sans">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left section with profile picture and bio */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-200">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={usersData?.data?.avatar || imageAsset.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white"
                />
              </div>
              <h2 className="text-xl font-semibold mt-2">{usersData?.data?.firstName} {usersData?.data?.lastName}</h2>
              <div className="text-sm text-gray-500">Last seen: {formateDateTime(usersData?.data?.lastActive) || "5mins ago"}</div>
              <div className="mt-1 flex items-center">
                <span className="text-sm text-gray-500 mr-2">Account status:</span>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                  {usersData?.data?.status || "Active"}
                </div>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-700 border rounded-lg p-4 bg-gray-50">
              {usersData?.data?.bio}
            </div>
          </div>

          {/* Right section with personal information */}
          <div className="w-full md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Personal Information:</h3>
              <div className="relative">
                <button
                  ref={settingsRef}
                  onClick={toggleSettings}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Settings size={24} />
                </button>

                {/* Settings modal */}
                {showSettings && (
                  <div
                    ref={modalRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10"
                  >
                    <div className="p-4">
                      <h4 className="text-sm text-gray-500 mb-2">Decisions:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-green-500">Activate account</span>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-red-500">Deactivate account</span>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-500">Review account</span>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">First name:</div>
                  <div className="font-medium">{usersData?.data?.firstName}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Email:</div>
                  <div className="font-medium">{usersData?.data?.email}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Age:</div>
                  <div className="font-medium">{usersData?.data?.age}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">State:</div>
                  <div className="font-medium">{usersData?.data?.state}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Date Joined:</div>
                  <div className="font-medium">{formatDate(usersData?.data?.createdAt)}</div>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Last name:</div>
                  <div className="font-medium">{usersData?.data?.lastName}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Gender:</div>
                  <div className="font-medium">{usersData?.data?.gender === 0 ? "Male" : "Female"}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">City:</div>
                  <div className="font-medium">{usersData?.data?.city}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">country</div>
                  <div className="font-medium">{usersData?.data?.country}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Current Plan:</div>
                  <div className="flex items-center">
                    <span className="font-medium">{usersData?.data?.subscriptionPlan === 1 ? "Free" : usersData?.data?.subscriptionPlan === 2 ? "Gold" : "Platinium"}</span>

                    <a href="#" className="ml-2 text-sm text-blue-600 hover:underline">
                      Manage Plan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500">Current location:</div>
              <div className="font-medium">{usersData?.data?.lastLocationUpdate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;