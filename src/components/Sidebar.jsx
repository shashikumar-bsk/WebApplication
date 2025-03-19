import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Product Details
          </Link>
        </li>
        <li>
          <Link
            to="/compare"
            className={location.pathname === "/compare" ? "active" : ""}
          >
            Compare Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;