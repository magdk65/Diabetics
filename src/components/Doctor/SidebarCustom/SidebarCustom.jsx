import React, { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  Home,
  Mail,
  Settings,
  LogOut,
  Menu,
  User
} from "lucide-react";
import "../SidebarCustom/SidebarCustom.css";
import { Link, useLocation } from "react-router-dom";

const SidebarCustom = ({ DocID, onItemClick }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialty: "",
    imageUrl: "",
  });

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const response = await fetch("/api/doctor-profile");
        const data = await response.json();
        setDoctorData({
          name: data.name,
          specialty: data.specialty,
          imageUrl: data.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    }
    fetchDoctorData();
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const doctorIdValue = DocID || "123";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: `/doctor/${doctorIdValue}/dashboard` },
  { id: "documents", label: "Documents", icon: FileText, path: `/doctor/${doctorIdValue}/documents` },
  { id: "patients", label: "Patients List", icon: User, path: `/doctor/${doctorIdValue}/patients` },  // <-- هنا أضفتها
  { id: "appointments", label: "Appointments", icon: Calendar, path: `/doctor/${doctorIdValue}/appointments` },
  { id: "messages", label: "Messages", icon: Mail, path: `/doctor/${doctorIdValue}/messages` },
  { id: "settings", label: "Settings", icon: Settings, path: `/doctor/${doctorIdValue}/settings` },
  { id: "logout", label: "Logout", icon: LogOut, path: `/login` },
];


  return (
    <div className={`sidebar1 ${collapsed ? "collapsed" : ""}`}>
      <button className="menu-toggle" onClick={toggleSidebar}>
        <Menu />
      </button>

      {!collapsed && (
        <div className="user-profile-NU">
          <div className="avatar-NU">
            {doctorData.imageUrl ? (
              <img
                src={doctorData.imageUrl}
                alt="Doctor Avatar"
                className="avatar-img"
              />
            ) : (
              <User className="avatar-icon" />
            )}
          </div>
          <div className="user-info-NU">
            <h3>{doctorData.name || "Loading..."}</h3>
            <p>{doctorData.specialty || "..."}</p>
          </div>
        </div>
      )}

      <nav className="nav-menu">
        {navItems.map(({ id, label, icon: Icon, path }) => (
          <Link
            key={id}
            to={path}
            className={`nav-item ${location.pathname.startsWith(path) ? "active" : ""}`}
            onClick={() => {
              if (onItemClick) onItemClick(id);
            }}
          >
            <Icon className="nav-icon" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SidebarCustom;
