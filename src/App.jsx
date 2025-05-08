import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { useState } from "react";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
      <TopBar toggleSidebar={toggleSidebar}/>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App
