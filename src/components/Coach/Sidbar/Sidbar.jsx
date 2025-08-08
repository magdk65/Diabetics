import React, { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  Home,
  Mail,
  Settings,
  LogOut,
  Menu,
  User,
  Dumbbell,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../Sidbar/Sidbar.css'

const Sidbar = ({ CoachID, onItemClick }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [coachData, setCoachData] = useState({
    name: "",
    specialty: "",
    imageUrl: "",
  });

  useEffect(() => {
    async function fetchCoachData() {
      try {
        const response = await fetch("/api/coach-profile");
        const data = await response.json();
        setCoachData({
          name: data.name,
          specialty: data.specialty,
          imageUrl: data.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    }
    fetchCoachData();
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const coachIdValue = CoachID || "123";

  const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: `/dashboard/coach/${coachIdValue}` },
  { id: "patients", label: "Patients", icon: User, path: `/patients/coach/${coachIdValue}` },
  { id: "exercises", label: "Exercises", icon: Dumbbell, path: `/exercises/coach/${coachIdValue}` },
  { id: "messages", label: "Messages", icon: Mail, path: `/messages/coach/${coachIdValue}` },
  { id: "settings", label: "Settings", icon: Settings, path: `/settings/coach/${coachIdValue}` },
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
            {coachData.imageUrl ? (
              <img
                src={coachData.imageUrl}
                alt="Coach Avatar"
                className="avatar-img"
              />
            ) : (
              <User className="avatar-icon" />
            )}
          </div>
          <div className="user-info-NU">
            <h3>{coachData.name || "Loading..."}</h3>
            <p>{coachData.specialty || "..."}</p>
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

export default Sidbar;
