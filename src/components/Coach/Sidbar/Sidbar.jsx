// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiBook,
  FiSettings,
  FiMessageSquare,
  FiActivity,
  FiUser,
} from "react-icons/fi";
import '../Sidbar/Sidbar.css'
const navItems = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "patients", label: "Patients", icon: FiUsers },
  { id: "sessions", label: "Sessions", icon: FiCalendar },
  { id: "resources", label: "Resources", icon: FiBook },
  { id: "settings", label: "Settings", icon: FiSettings },
  { id: "messages", label: "Messages", icon: FiMessageSquare },
];

const Sidebar = ({ onItemClick }) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleClick = (id) => {
    setActiveItem(id);
    if (onItemClick) onItemClick(id);
  };

  return (
    <div className="sidebar11">
      {/* User Profile */}
      <div className="user-profile">
        <div className="avatar">
          <FiUser className="avatar-icon" />
        </div>
        <div className="user-info">
          <h3>Sarah</h3>
          <p>Coach</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        {navItems.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            className={`nav-item ${activeItem === id ? "active" : ""}`}
            onClick={() => handleClick(id)}
          >
            <Icon className="nav-icon" />
            <span>{label}</span>
          </div>
        ))}
      </nav>

    </div>
  );
};

export default Sidebar;
