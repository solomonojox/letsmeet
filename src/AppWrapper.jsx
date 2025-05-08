import { BrowserRouter, useLocation } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { useState } from "react";

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
  const noLayoutRoutes = ["/login", "/forgot-password", "/otp", "/reset-password"];
  const isAuthRoute = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthRoute && <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
      {!isAuthRoute && <TopBar toggleSidebar={toggleSidebar} />}
      <div className={!isAuthRoute ? "lg:ml-[200px] px-6" : ""}>
        <AllRoutes />
      </div>
    </>
  );
}

export default AppWrapper;