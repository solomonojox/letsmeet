// /* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useRef } from "react";
// import assets from "../../assets/images/assets";
// import Input from "../SHAREHOLDER/Shareholder/Ui/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Icon } from "@iconify/react/dist/iconify.js";
import { IoLogOut } from "react-icons/io5";
import imageAsset from "../assets/imageAsset";
// import { FaAngleDown } from "react-icons/fa";
import { FaAngleDown, FaArrowLeftLong } from "react-icons/fa6";
import { LiaAngleDownSolid } from "react-icons/lia";
import { AppContext } from "../Context/AppContext";
import { ArrowBigLeft, ArrowLeft, Backpack, User } from "lucide-react";
import { HiArrowLongLeft } from "react-icons/hi2";


const TopBar = ({ toggleSidebar }) => {
  const userInfo = JSON.parse(localStorage.getItem('letsmeetUser'));
  const { formatPath } = useContext(AppContext);
  const [pageName, setPageName] = useState('');

  const navigate = useNavigate()

  const [logoutMenu, setLogoutMenu] = useState(false);
  const dropdownRef = useRef(null);
  const icons = {
    menu: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    ),

    search: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 17L13.2223 13.2156L17 17ZM15.3158 8.15789C15.3158 10.0563 14.5617 11.8769 13.2193 13.2193C11.8769 14.5617 10.0563 15.3158 8.15789 15.3158C6.2595 15.3158 4.43886 14.5617 3.0965 13.2193C1.75413 11.8769 1 10.0563 1 8.15789C1 6.2595 1.75413 4.43886 3.0965 3.0965C4.43886 1.75413 6.2595 1 8.15789 1C10.0563 1 11.8769 1.75413 13.2193 3.0965C14.5617 4.43886 15.3158 6.2595 15.3158 8.15789V8.15789Z"
          stroke="#656565"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),

    notification: (
      <svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0268 4.0675C11.6135 4.0675 8.02678 7.65417 8.02678 12.0675V15.9208C8.02678 16.7342 7.68012 17.9742 7.26678 18.6675L5.73345 21.2142C4.78678 22.7875 5.44012 24.5342 7.17345 25.1208C12.9201 27.0408 19.1201 27.0408 24.8668 25.1208C26.4801 24.5875 27.1868 22.6808 26.3068 21.2142L24.7734 18.6675C24.3734 17.9742 24.0268 16.7342 24.0268 15.9208V12.0675C24.0268 7.66751 20.4268 4.0675 16.0268 4.0675Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M18.4939 4.45417C18.0805 4.33417 17.6539 4.24084 17.2139 4.1875C15.9339 4.0275 14.7072 4.12084 13.5605 4.45417C13.9472 3.4675 14.9072 2.77417 16.0272 2.77417C17.1472 2.77417 18.1072 3.4675 18.4939 4.45417Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.0273 25.6008C20.0273 27.8008 18.2273 29.6008 16.0273 29.6008C14.934 29.6008 13.9207 29.1475 13.2007 28.4275C12.4807 27.7075 12.0273 26.6942 12.0273 25.6008"
          stroke="#262626"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    ),

    questionMark: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0007 1.33337C13.0999 1.33337 10.2642 2.19356 7.85229 3.80515C5.44037 5.41675 3.56051 7.70737 2.45042 10.3873C1.34034 13.0673 1.04989 16.0163 1.61581 18.8614C2.18172 21.7064 3.57859 24.3198 5.62976 26.3709C7.68093 28.4221 10.2943 29.819 13.1393 30.3849C15.9844 30.9508 18.9334 30.6604 21.6133 29.5503C24.2933 28.4402 26.584 26.5603 28.1955 24.1484C29.8071 21.7365 30.6673 18.9008 30.6673 16C30.6627 12.1116 29.116 8.38375 26.3665 5.63421C23.6169 2.88467 19.8891 1.33796 16.0007 1.33337ZM16.0007 28C13.6273 28 11.3072 27.2963 9.33381 25.9777C7.36042 24.6591 5.82235 22.785 4.9141 20.5922C4.00585 18.3995 3.76821 15.9867 4.23123 13.659C4.69426 11.3312 5.83715 9.19299 7.51538 7.51476C9.19361 5.83653 11.3318 4.69364 13.6596 4.23062C15.9873 3.76759 18.4001 4.00523 20.5929 4.91349C22.7856 5.82174 24.6597 7.35981 25.9783 9.3332C27.2969 11.3066 28.0007 13.6267 28.0007 16C27.9968 19.1814 26.7312 22.2314 24.4817 24.481C22.2321 26.7306 19.1821 27.9962 16.0007 28ZM17.334 22V24.6667H14.6673V22H17.334ZM21.334 12.6667C21.3354 13.4663 21.1563 14.256 20.81 14.9768C20.4637 15.6975 19.9592 16.3308 19.334 16.8294C18.3241 17.612 17.6412 18.7421 17.418 20H14.7087C14.8266 18.9721 15.1491 17.9781 15.6572 17.0768C16.1654 16.1755 16.8488 15.385 17.6673 14.752C17.9958 14.4892 18.2574 14.1523 18.4308 13.7689C18.6041 13.3856 18.6843 12.9667 18.6648 12.5464C18.6453 12.1262 18.5267 11.7165 18.3185 11.3509C18.1104 10.9852 17.8187 10.674 17.4673 10.4427C17.0757 10.1867 16.625 10.0352 16.1583 10.0025C15.6915 9.96982 15.2242 10.0571 14.8007 10.256C14.3489 10.4726 13.9698 10.8157 13.7094 11.2436C13.4491 11.6716 13.3186 12.166 13.334 12.6667C13.334 13.0203 13.1935 13.3595 12.9435 13.6095C12.6934 13.8596 12.3543 14 12.0007 14C11.647 14 11.3079 13.8596 11.0578 13.6095C10.8078 13.3595 10.6673 13.0203 10.6673 12.6667C10.6475 11.642 10.9302 10.6341 11.4802 9.7692C12.0302 8.9043 12.8229 8.22075 13.7593 7.80404C14.5894 7.43308 15.4995 7.2771 16.4057 7.3505C17.312 7.42391 18.1851 7.72432 18.9447 8.22404C19.6786 8.7099 20.2809 9.36985 20.6978 10.145C21.1147 10.9202 21.3332 11.7865 21.334 12.6667Z"
          fill="#3D3D3D"
        />
      </svg>
    ),

    dropDown: (
      <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.22085 3.78332C4.16226 3.84184 4.08283 3.87471 4.00002 3.87471C3.9172 3.87471 3.83778 3.84184 3.77918 3.78332L0.654184 0.658316C0.598984 0.599076 0.568933 0.520724 0.570361 0.439765C0.57179 0.358806 0.604586 0.281562 0.661842 0.224307C0.719097 0.167051 0.796341 0.134255 0.8773 0.132826C0.958258 0.131398 1.03661 0.161449 1.09585 0.216649L4.00002 3.12082L6.90418 0.216649C6.93279 0.185946 6.96729 0.16132 7.00563 0.14424C7.04396 0.12716 7.08534 0.117976 7.1273 0.117236C7.16926 0.116496 7.21094 0.124214 7.24985 0.139931C7.28876 0.155648 7.32411 0.179042 7.35378 0.208717C7.38346 0.238391 7.40685 0.273738 7.42257 0.31265C7.43829 0.351562 7.446 0.393241 7.44526 0.4352C7.44452 0.47716 7.43534 0.51854 7.41826 0.556873C7.40118 0.595207 7.37655 0.629707 7.34585 0.658316L4.22085 3.78332Z" fill="black" />
      </svg>
    ),

    date: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.75 12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75C11.25 12.5511 11.329 12.3603 11.4697 12.2197C11.6103 12.079 11.8011 12 12 12C12.1989 12 12.3897 12.079 12.5303 12.2197C12.671 12.3603 12.75 12.5511 12.75 12.75ZM7.5 15.75C7.69891 15.75 7.88968 15.671 8.03033 15.5303C8.17098 15.3897 8.25 15.1989 8.25 15C8.25 14.8011 8.17098 14.6103 8.03033 14.4697C7.88968 14.329 7.69891 14.25 7.5 14.25C7.30109 14.25 7.11032 14.329 6.96967 14.4697C6.82902 14.6103 6.75 14.8011 6.75 15C6.75 15.1989 6.82902 15.3897 6.96967 15.5303C7.11032 15.671 7.30109 15.75 7.5 15.75ZM8.25 17.25C8.25 17.4489 8.17098 17.6397 8.03033 17.7803C7.88968 17.921 7.69891 18 7.5 18C7.30109 18 7.11032 17.921 6.96967 17.7803C6.82902 17.6397 6.75 17.4489 6.75 17.25C6.75 17.0511 6.82902 16.8603 6.96967 16.7197C7.11032 16.579 7.30109 16.5 7.5 16.5C7.69891 16.5 7.88968 16.579 8.03033 16.7197C8.17098 16.8603 8.25 17.0511 8.25 17.25ZM9.75 15.75C9.94891 15.75 10.1397 15.671 10.2803 15.5303C10.421 15.3897 10.5 15.1989 10.5 15C10.5 14.8011 10.421 14.6103 10.2803 14.4697C10.1397 14.329 9.94891 14.25 9.75 14.25C9.55109 14.25 9.36032 14.329 9.21967 14.4697C9.07902 14.6103 9 14.8011 9 15C9 15.1989 9.07902 15.3897 9.21967 15.5303C9.36032 15.671 9.55109 15.75 9.75 15.75ZM10.5 17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18C9.55109 18 9.36032 17.921 9.21967 17.7803C9.07902 17.6397 9 17.4489 9 17.25C9 17.0511 9.07902 16.8603 9.21967 16.7197C9.36032 16.579 9.55109 16.5 9.75 16.5C9.94891 16.5 10.1397 16.579 10.2803 16.7197C10.421 16.8603 10.5 17.0511 10.5 17.25ZM12 15.75C12.1989 15.75 12.3897 15.671 12.5303 15.5303C12.671 15.3897 12.75 15.1989 12.75 15C12.75 14.8011 12.671 14.6103 12.5303 14.4697C12.3897 14.329 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.329 11.4697 14.4697C11.329 14.6103 11.25 14.8011 11.25 15C11.25 15.1989 11.329 15.3897 11.4697 15.5303C11.6103 15.671 11.8011 15.75 12 15.75ZM12.75 17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25C11.25 17.0511 11.329 16.8603 11.4697 16.7197C11.6103 16.579 11.8011 16.5 12 16.5C12.1989 16.5 12.3897 16.579 12.5303 16.7197C12.671 16.8603 12.75 17.0511 12.75 17.25ZM14.25 15.75C14.4489 15.75 14.6397 15.671 14.7803 15.5303C14.921 15.3897 15 15.1989 15 15C15 14.8011 14.921 14.6103 14.7803 14.4697C14.6397 14.329 14.4489 14.25 14.25 14.25C14.0511 14.25 13.8603 14.329 13.7197 14.4697C13.579 14.6103 13.5 14.8011 13.5 15C13.5 15.1989 13.579 15.3897 13.7197 15.5303C13.8603 15.671 14.0511 15.75 14.25 15.75ZM15 17.25C15 17.4489 14.921 17.6397 14.7803 17.7803C14.6397 17.921 14.4489 18 14.25 18C14.0511 18 13.8603 17.921 13.7197 17.7803C13.579 17.6397 13.5 17.4489 13.5 17.25C13.5 17.0511 13.579 16.8603 13.7197 16.7197C13.8603 16.579 14.0511 16.5 14.25 16.5C14.4489 16.5 14.6397 16.579 14.7803 16.7197C14.921 16.8603 15 17.0511 15 17.25ZM16.5 15.75C16.6989 15.75 16.8897 15.671 17.0303 15.5303C17.171 15.3897 17.25 15.1989 17.25 15C17.25 14.8011 17.171 14.6103 17.0303 14.4697C16.8897 14.329 16.6989 14.25 16.5 14.25C16.3011 14.25 16.1103 14.329 15.9697 14.4697C15.829 14.6103 15.75 14.8011 15.75 15C15.75 15.1989 15.829 15.3897 15.9697 15.5303C16.1103 15.671 16.3011 15.75 16.5 15.75ZM15 12.75C15 12.9489 14.921 13.1397 14.7803 13.2803C14.6397 13.421 14.4489 13.5 14.25 13.5C14.0511 13.5 13.8603 13.421 13.7197 13.2803C13.579 13.1397 13.5 12.9489 13.5 12.75C13.5 12.5511 13.579 12.3603 13.7197 12.2197C13.8603 12.079 14.0511 12 14.25 12C14.4489 12 14.6397 12.079 14.7803 12.2197C14.921 12.3603 15 12.5511 15 12.75ZM16.5 13.5C16.6989 13.5 16.8897 13.421 17.0303 13.2803C17.171 13.1397 17.25 12.9489 17.25 12.75C17.25 12.5511 17.171 12.3603 17.0303 12.2197C16.8897 12.079 16.6989 12 16.5 12C16.3011 12 16.1103 12.079 15.9697 12.2197C15.829 12.3603 15.75 12.5511 15.75 12.75C15.75 12.9489 15.829 13.1397 15.9697 13.2803C16.1103 13.421 16.3011 13.5 16.5 13.5Z" fill="#6B7280" />
        <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.25C6.94891 2.25 7.13968 2.32902 7.28033 2.46967C7.42098 2.61032 7.5 2.80109 7.5 3V4.5H16.5V3C16.5 2.80109 16.579 2.61032 16.7197 2.46967C16.8603 2.32902 17.0511 2.25 17.25 2.25C17.4489 2.25 17.6397 2.32902 17.7803 2.46967C17.921 2.61032 18 2.80109 18 3V4.5H18.75C19.5456 4.5 20.3087 4.81607 20.8713 5.37868C21.4339 5.94129 21.75 6.70435 21.75 7.5V18.75C21.75 19.5456 21.4339 20.3087 20.8713 20.8713C20.3087 21.4339 19.5456 21.75 18.75 21.75H5.25C4.45435 21.75 3.69129 21.4339 3.12868 20.8713C2.56607 20.3087 2.25 19.5456 2.25 18.75V7.5C2.25 6.70435 2.56607 5.94129 3.12868 5.37868C3.69129 4.81607 4.45435 4.5 5.25 4.5H6V3C6 2.80109 6.07902 2.61032 6.21967 2.46967C6.36032 2.32902 6.55109 2.25 6.75 2.25ZM20.25 11.25C20.25 10.8522 20.092 10.4706 19.8107 10.1893C19.5294 9.90804 19.1478 9.75 18.75 9.75H5.25C4.85218 9.75 4.47064 9.90804 4.18934 10.1893C3.90804 10.4706 3.75 10.8522 3.75 11.25V18.75C3.75 19.1478 3.90804 19.5294 4.18934 19.8107C4.47064 20.092 4.85218 20.25 5.25 20.25H18.75C19.1478 20.25 19.5294 20.092 19.8107 19.8107C20.092 19.5294 20.25 19.1478 20.25 18.75V11.25Z" fill="#6B7280" />
      </svg>
    )
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setPageName("Welcome back, Admin");
    } else if (location.pathname.includes("user-profile")) {
      setPageName(location.state.userName + "'s Profile");
    } else {
      setPageName(formatPath(location.pathname));
    }
  }, [location, formatPath]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLogoutMenu(false);
      }
    };

    if (logoutMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [logoutMenu]);

  return (
    <div className="fixed top-0 z-50 bg-white w-full">
      <div className="fixed top-0 z-10 bg-white flex justify-between border-b border-b-gray-200 left-0 right-0 h-16 lg:pl-12 pl-5 pr-5 items-center lg:ml-[200px] ">

        <Link to="/dashboard" className="lg:hidden block z-50">
          <img src={imageAsset.logo_dashboard} alt="logo" className="w-24" />
        </Link>

        <div className="fixed lg:hidden top-5 right-5">
          <p
            className="text-[#656565] size-7 cursor-pointer"
            onClick={toggleSidebar}
          >
            {icons.menu}
          </p>
        </div>

        <div className="lg:flex justify-between items-center gap-8 hidden w-full">
          <h1 className="text-lg font-medium flex items-center gap-2">
            {location.pathname.includes("user-profile") && <FaArrowLeftLong onClick={() => navigate(-1)} className="cursor-pointer" />}
            {pageName}
          </h1>

          <div className="flex gap-4">
            {/* <div className="flex items-center gap-1 rounded-lg border p-1">
              {icons.date}
              <div className="flex gap-1 items-center">
                <p className="text-xs">Today</p>
                {icons.dropDown}
              </div>
            </div> */}

            <div
              ref={dropdownRef}
              className="flex cursor-pointer items-center relative"
              onClick={() => setLogoutMenu(!logoutMenu)}
            >
              <div className="relative mr-1">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userInfo?.imageUrl || imageAsset.avatar}
                  alt="User Avatar"
                />
                {/* <span className="w-3.5 h-3.5 bg-[#8937CE] rounded-full border-2 border-white absolute bottom-0 right-0"></span> */}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col text-[12px]">
                  <p className="font-medium">{userInfo?.name || ''}</p>
                </div>
                {icons.dropDown}
              </div>

              {logoutMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg border shadow-lg z-50 w-full min-w-[210px]">
                  <div className="font-medium py-2 px-6 flex items-center gap-2 text-sm" onClick={() => navigate(`/user-profile/${userInfo?.id}`, { state: { userId: userInfo?.id, userName: userInfo?.name } })}>
                    <User className="w-4 h-4" />
                    <p>{userInfo?.name || ''}</p>
                  </div>
                  <div className="text-sm cursor-pointer hover:bg-red-600 hover:text-white p-1 rounded flex items-center px-6 border-t py-2" onClick={handleLogout}>
                    <IoLogOut className="mr-2 text-lg" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <div className="lg:flex items-center hidden grow">
            <Icon icon="basil:notification-outline" className="text-[32px] mr-7" />
            <Icon icon="stash:question" className="size-9" />
            {staffStatus === "Admin" && (
              <div className="border border-[#E8E8E833] rounded-lg flex items-center space-x-0 p-1 ml-auto mr-7">
                <p
                  className={`text-[1.3vw] px-3  w-30 rounded-md py-1  cursor-pointer ${
                    selected === "Company" ? "bg-[#fcf7ff] font-[600]" : "font-[500]"
                  }`}
                  onClick={() => handleToggle("Company")}
                >
                  Company
                </p>
                <p
                  className={`text-[1.3vw] w-28 text-center px-3 rounded-md py-1  cursor-pointer ${
                    selected === "Portal" ? "bg-[#fcf7ff] font-[600]" : "font-[500]"
                  }`}
                  onClick={() => handleToggle("Portal")}
                >
                  Portal
                </p>
              </div>
            )}
            <div
              className="h-12 w-12 bg-iris-100 ml-6 text-[18px] rounded-full text-white font-semibold flex justify-self-end items-center justify-center relative cursor-pointer"
              onClick={() => setLogoutMenu(!logoutMenu)}
            >
              <p>{user !== null ? `${user.firstName[0]}${user.lastName[0]}` : ""}</p>
            </div>
            
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;