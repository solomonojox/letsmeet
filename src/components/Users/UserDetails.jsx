import { useState, useRef, useEffect, useContext } from 'react';
import { Settings } from 'lucide-react';
import imageAsset from '../../assets/imageAsset';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';

const UserSkeleton = () => (
  <div className="animate-pulse p-6">
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-6 border-r border-gray-200 flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        <div className="w-20 h-3 bg-gray-200 rounded"></div>
        <div className="w-24 h-3 bg-gray-200 rounded"></div>
        <div className="w-full h-24 bg-gray-200 rounded mt-4"></div>
      </div>
      <div className="w-full md:w-2/3 p-6 space-y-4">
        <div className="w-48 h-4 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="w-24 h-3 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
        <div className="w-48 h-3 bg-gray-200 rounded mt-4"></div>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);


const UserDetails = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const { formatDate, formateDateTime, notifySuccess, notifyError } = useContext(AppContext);
  const { data: usersData, isLoading } = useGetUserByIdQuery(params.id);
  console.log(usersData)

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

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/User/ResetPassword?MemberId=${params.id}&NewPassword=${passwordData.newPassword}&ConfirmNewPassword=${passwordData.confirmPassword}`)

      notifySuccess(res.data.responseMessage, 'success');
      setOpenModal(false);
    } catch (err) {
      console.log(err)
      notifyError(err.response.data.responseMessage, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto font-sans">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? <UserSkeleton /> : (
          <div className="flex flex-col md:flex-row">
            {/* Left section with profile picture and bio */}
            <div className="w-full md:w-1/3 p-6 border-r border-gray-200">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={usersData?.data?.profilePictureUrl || imageAsset.avatar}
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
                        <div className='mb-4'>
                          <span className="text-gray-600 font-semibold cursor-pointer underline-offset-4 hover:underline hover:text-primary" onClick={() => setOpenModal(true)}>Change Password</span>
                        </div>

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

                  {/* Password Modal */}
                  {openModal && <div className='bg-[#00000088] w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center '>
                    <div className='bg-white w-3xl h-96 rounded-md flex flex-col justify-center items-center p-6 lg:p-20'>
                      <h1 className='text-2xl font-semibold mb-4'>Change user's password</h1>
                      <form action="submit" onSubmit={changePassword} className='w-full space-y-6'>
                        <div>
                          <label htmlFor="newPassword">New Password</label>
                          <input
                            type="text"
                            name="newPassword"
                            id='newPassword'
                            className='border focus:border-primary outline-none rounded-md p-4 w-full'
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          />
                        </div>

                        <div>
                          <label htmlFor="confirmPassword">Confirm New Password</label>
                          <input
                            type="text"
                            name="confirmPassword"
                            id='confirmPassword'
                            className='border focus:border-primary outline-none rounded-md p-4 w-full'
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          />
                        </div>

                        <div className='space-x-4'>
                          <span className="py-4 px-10 bg-gray-400 hover:bg-gray-500 cursor-pointer rounded-md text-white" onClick={() => setOpenModal(false)}>Cancel</span>
                          <button
                            type='submit'
                            disabled={loading}
                            className="py-4 px-10 bg-primary hover:bg-primary/80 rounded-md text-white"
                          >
                            {loading ? (
                              // Loading spinner
                              <div className="flex items-center gap-4">
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Changing...
                              </div>
                            ) :
                              'Change Password'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>}
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
                    <div className="font-medium">{usersData?.data?.gender}</div>
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
                    <div className="text-sm text-gray-500">Account type</div>
                    <div className="font-medium">{usersData?.data?.type}</div>
                  </div>
                  {usersData?.data?.type !== "SUPER_ADMIN" && (
                    <div className="">
                      <div className="text-sm text-gray-500">Current Plan:</div>
                      <div className="flex items-center">
                        <span className="font-medium">{usersData?.data?.subscriptionPlan === 1 ? "Free" : usersData?.data?.subscriptionPlan === 2 ? "Gold" : "Platinium"}</span>

                        <a href="#" className="ml-2 text-sm text-blue-600 hover:underline">
                          Manage Plan
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-500">Current location:</div>
                <div className="font-medium">LAT: {usersData?.data?.latitude}, LONG: {usersData?.data?.longitude}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;