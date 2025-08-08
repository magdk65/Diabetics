import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Dumbbell, // أيقونة تمارين (lucide-react توفرها)
  Mail,
  Settings,
  Menu,
} from "lucide-react";
import '../Sidbar/Sidbar.css'
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ CoachID, onItemClick }) => {
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

  const doctorIdValue = CoachID || "123";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: `/CoachDashboard/${CoachID}` },
{ id: "patients", label: "Patients", icon: User, path: `/dashboardcoach/${CoachID}` },
  { id: "exercises", label: "Exercises", icon: Dumbbell, path: `/q/${CoachID}` },
  { id: "messages", label: "Messages", icon: Mail, path: `/Chat/${CoachID}` },
  { id: "settings", label: "Settings", icon: Settings, path: `/Setting/${CoachID}` },
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

export default Sidebar;
