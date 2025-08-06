import React, { useState, useEffect } from 'react';
import '../Sidebar_Nut/Sidebar_Nut.css';
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiBook,
  FiSettings,
  FiUser,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Sidebar_Nut = ({ nutId, onItemClick }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialty: '',
    imageUrl: '',
  });

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const response = await fetch('/api/doctor-profile');
        const data = await response.json();
        setDoctorData({
          name: data.name,
          specialty: data.specialty,
          imageUrl: data.imageUrl,
        });
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    }
    fetchDoctorData();
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // استخدم nutId من props فقط (لا تستخدم useParams هنا)
  const actualNutId = nutId || "123"; // قيمة افتراضية إذا لم تُمرر nutId

  const navItems = [
    { id: "home", label: "Home", icon: FiHome, path: `/nutritionist/${actualNutId}/dashboard` },
    { id: "patientsList", label: "Patients List", icon: FiUsers, path: `/nutritionist/${actualNutId}/patients` },
    { id: "mealPlansLibrary", label: "Meal Plans Library", icon: FiCalendar, path: `/nutritionist/${actualNutId}/meals` },
    { id: "communication", label: "Communication", icon: FiBook, path: `/nutritionist/${actualNutId}/chat` },
    { id: "settings", label: "Settings", icon: FiSettings, path: `/nutritionist/${actualNutId}/settings` },
    { id: "logout", label: "Logout", icon: FiLogOut, path: `/login` },
  ];

  return (
    <div className={`sidebar1 ${collapsed ? 'collapsed' : ''}`}>
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FiMenu />
      </button>

      {!collapsed && (
        <div className="user-profile-NU">
          <div className="avatar-NU">
            {doctorData.imageUrl ? (
              <img src={doctorData.imageUrl} alt="Doctor Avatar" className="avatar-img" />
            ) : (
              <FiUser className="avatar-icon" />
            )}
          </div>
          <div className="user-info-NU">
            <h3>{doctorData.name || 'Loading...'}</h3>
            <p>{doctorData.specialty || '...'}</p>
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

export default Sidebar_Nut;
