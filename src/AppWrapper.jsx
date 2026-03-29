import { BrowserRouter, useLocation, matchPath } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { useState } from "react";
import BankProvider from "./Context/BankProvider";

// Define all valid routes in your app
const validRoutes = [
  "/",
  "about",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/cookies",
  "/login",
  "/forgot-password",
  "/otp",
  "/reset-password",
  "/dashboard",
  "/users",
  "/user-profile/:id",
  "/requests",
  "/subscriptions",
  "/reports",
  "/settings",
  "/feedback",
  "/construction",
  "/user-profile/:id",
  "/referrals",
  "/chat",
  "/notifications",
  "/admin-chat",
  "/referrals/:id",
  "blocked-users",
];

// Wrapper component to use hooks outside BrowserRouter
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const location = useLocation();
  const path = location.pathname;
  const noLayoutRoutes = ["/", "/contact", "/about", "/faq", "/privacy-policy", "/terms", "/cookies", "/login", "/forgot-password", "/otp", "/reset-password", "/construction"];
  const isAuthRoute = noLayoutRoutes.includes(location.pathname);
  const isValidRoute = validRoutes.some((route) =>
    matchPath({ path: route, end: true }, path)
  );

  const shouldShowLayout = !isAuthRoute && isValidRoute;

  return (
    <>
      {shouldShowLayout && (
        <>
          <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <TopBar toggleSidebar={toggleSidebar} />
        </>
      )}
      <div className={!isAuthRoute ? "lg:ml-[200px] px-2" : ""}>
        <AllRoutes />
      </div>
    </>
  );
}

export default AppWrapper;