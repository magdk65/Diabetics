import React from "react";
import "../Sidbar/Sidbar.css";
import { FaChartPie, FaFileAlt, FaCog, FaBell, FaUsers } from "react-icons/fa"; // أيقونات

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navItems = [
    { icon: <FaChartPie />, text: "Overview" },
    { icon: <FaFileAlt />, text: "Reports" },
    { icon: <FaCog />, text: "Settings" },
    { icon: <FaBell />, text: "Alerts" },
    { icon: <FaUsers />, text: "Healthcare Team" },
  ];


  return (
    <div className="sidebar-patient">
      {/* User Profile */}
      <div className="user-profile-patient">
        <div className="avatar-patient">
          <img src="/placeholder.svg?height=48&width=48" alt="Sophia" />
        </div>
        <div className="user-info-patient">
          <h3>Sophia</h3>
          <p>Parent</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-menu-patient">
        {navItems.map((item) => (
          <div
            key={item.text}
            className={`nav-item-patient ${activeItem === item.text ? "active" : ""}`}
            onClick={() => setActiveItem(item.text)}
          >
            <div className="nav-icon-patient">{item.icon}</div>
            <span>{item.text}</span>
          </div>
        ))}
      </nav>

      {/* Logo / Brand */}
      <div className="logo-container-patient">
        <div className="logo-icon-patient">D</div>
        <span className="logo-text-patient">DiabetoX</span>
      </div>
    </div>
  );
};

export default Sidebar;
