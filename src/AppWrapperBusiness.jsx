import { BrowserRouter, useLocation, matchPath } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { useState } from "react";
import BankProvider from "./Context/BankProvider";
import SidebarBusiness from "./components/SidebarBusiness";
import AllRoutesBusiness from "./routes/AllRoutesBusiness";

// Define all valid routes in your app
const validRoutes = [
  "/business-dashboard",
];

// Wrapper component to use hooks outside BrowserRouter
const AppWrapperBusiness = () => (
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
          <SidebarBusiness toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <TopBar toggleSidebar={toggleSidebar} />
        </>
      )}
      <div className={!isAuthRoute ? "lg:ml-[200px] px-2" : ""}>
        <AllRoutesBusiness />
      </div>
    </>
  );
}

export default AppWrapperBusiness;