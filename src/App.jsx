import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./Layouts/SideBar";
import Dashboard from "./pages/Dashboard";
import PointageSystem from "./pages/PointageSystem";
import Stock from "./pages/Stock";
import Suppliers from "./pages/Suppliers";
import Bills from "./pages/Bills";
import VerifyPayment from "./pages/VerifyPayment";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Parameters from "./pages/Parameters";
import Navbar from "./Layouts/NavBar";
import Footer from "./Layouts/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";  // import our custom css

const App = () => {
  // manage sidebar state in App so we can adjust main content margin accordingly
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // set width based on sidebar state
  const sidebarWidth = isCollapsed ? 60 : 200;

  return (
    <Router>
      <div className="app d-flex">
        <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <div 
          className="main-content flex-grow-1 d-flex flex-column"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <Navbar />
          <div className="content flex-grow-1 overflow-auto p-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pointage-system" element={<PointageSystem />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/verify-payment" element={<VerifyPayment />} />
              <Route path="/students" element={<Students />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/parameters" element={<Parameters />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
