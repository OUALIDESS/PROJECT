import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <span className="navbar-brand">Dashboard</span>
        <div>
          <button className="btn btn-outline-light mx-2">
            <FaBell />
          </button>
          <button className="btn btn-outline-light">
            <FaUserCircle />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
