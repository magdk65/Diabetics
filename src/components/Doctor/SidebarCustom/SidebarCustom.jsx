import React, { useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import "../SidebarCustom/SidebarCustom.css";

const SidebarCustom = () => {
  const [active, setActive] = useState("patients");

  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <div className="sidebar-custom">
      <div className="sidebar-header-custom">
        <h1 className="sidebar-title-custom">Dashboard</h1>
        <p className="sidebar-subtitle-custom">Diabetes Specialist</p>
      </div>

      <nav className="nav-menu-custom">
        <button
          className={`nav-button-custom ${active === "patients" ? "active-custom" : ""}`}
          onClick={() => handleClick("patients")}
        >
          <FiUsers className="nav-icon-custom" />
          Patients
        </button>
        <button
          className={`nav-button-custom ${active === "appointments" ? "active-custom" : ""}`}
          onClick={() => handleClick("appointments")}
        >
          <FiCalendar className="nav-icon-custom" />
          Appointments
        </button>
        <button
          className={`nav-button-custom ${active === "messages" ? "active-custom" : ""}`}
          onClick={() => handleClick("messages")}
        >
          <FiMessageSquare className="nav-icon-custom" />
          Messages
        </button>
        <button
          className={`nav-button-custom ${active === "settings" ? "active-custom" : ""}`}
          onClick={() => handleClick("settings")}
        >
          <FiSettings className="nav-icon-custom" />
          Settings
        </button>
        <button
          className={`nav-button-custom ${active === "support" ? "active-custom" : ""}`}
          onClick={() => handleClick("support")}
        >
          <FiHelpCircle className="nav-icon-custom" />
          Support
        </button>
      </nav>
    </div>
  );
};

export default SidebarCustom;
