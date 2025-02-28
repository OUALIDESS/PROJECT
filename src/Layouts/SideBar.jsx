import React from "react";
import {
  FaThLarge,
  FaClock,
  FaBoxes,
  FaUserFriends,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaUserGraduate,
  FaBed,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SideBar = ({ isCollapsed, toggleSidebar }) => {
  const sidebarStyle = {
    width: isCollapsed ? "60px" : "200px",
    transition: "width 0.3s ease",
  };

  return (
    <div
      className="bg-dark text-light vh-100 d-flex flex-column position-fixed"
      style={sidebarStyle}
    >
      {/* Toggle Button */}
      <button
  className="d-flex justify-content-center align-items-center mx-auto my-2"
  style={{
    border: "none",
    background: "transparent",
    padding: "4px",
    cursor: "pointer",
    color:"white"
  }}
  onClick={toggleSidebar}
>
  {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
</button>



      {/* Sidebar Links */}
      <ul className="nav flex-column">
        <SideBarItem to="/dashboard" icon={<FaThLarge />} text="Dashboard" collapsed={isCollapsed} />
        <SideBarItem to="/pointage-system" icon={<FaClock />} text="Pointage System" collapsed={isCollapsed} />
        <SideBarItem to="/stock" icon={<FaBoxes />} text="Stock" collapsed={isCollapsed} />
        <SideBarItem to="/suppliers" icon={<FaUserFriends />} text="Suppliers" collapsed={isCollapsed} />
        <SideBarItem to="/bills" icon={<FaFileInvoiceDollar />} text="Bills" collapsed={isCollapsed} />
        <SideBarItem to="/verify-payment" icon={<FaCheckCircle />} text="Verify Payment" collapsed={isCollapsed} />
        <SideBarItem to="/students" icon={<FaUserGraduate />} text="Students" collapsed={isCollapsed} />
        <SideBarItem to="/rooms" icon={<FaBed />} text="Rooms" collapsed={isCollapsed} />
        <SideBarItem to="/parameters" icon={<FaCog />} text="Parameters" collapsed={isCollapsed} />
      </ul>
    </div>
  );
};

const SideBarItem = ({ to, icon, text, collapsed }) => {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-link text-light d-flex align-items-center">
        <span className="me-2">{icon}</span>
        {!collapsed && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default SideBar;
