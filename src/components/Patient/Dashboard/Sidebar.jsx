import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  GiWaterDrop as DropletIcon, 
  GiKnifeFork as UtensilsIcon 
} from "react-icons/gi";
import { 
  FaPills as PillIcon, 
  FaBullseye as TargetIcon, 
  FaUsers as UsersIcon, 
  FaCalendarAlt as CalendarIcon, 
  FaStethoscope as StethoscopeIcon, 
  FaPhoneAlt as PhoneIcon 
} from "react-icons/fa";
import { AiFillHeart as HeartIcon } from "react-icons/ai";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import '../Dashboard/Sidebar.css';

const sidebarItems = [
  { icon: <DropletIcon size={20} color="#617afa" />, label: "Sugar Logging", path: "/dashborad_p" },
  { icon: <PillIcon size={20} color="#617afa" />, label: "Medication", path: "/medicaldashboard" },
  { icon: <UtensilsIcon size={20} color="#617afa" />, label: "Meal Plans", path: "/meal-plans" },
  { icon: <TargetIcon size={20} color="#617afa" />, label: "Exercise", path: "/exercise" },
  { icon: <UsersIcon size={20} color="#617afa" />, label: "Care Team", path: "/careteamdashboard" },
  { icon: <HeartIcon size={20} color="#617afa" />, label: "Education", path: "/education" },
  { icon: <CalendarIcon size={20} color="#617afa" />, label: "Consultations", path: "/consultations" },
  { icon: <StethoscopeIcon size={20} color="#617afa" />, label: "Reports", path: "/reports" },
  { icon: <PhoneIcon size={20} color="#617afa" />, label: "Emergency", path: "/emergencypage" },
  { icon: <SettingsIcon size={20} color="#617afa" />, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(() => {
    // تحديد العنصر النشط حسب المسار الحالي
    const currentPath = location.pathname;
    const currentIndex = sidebarItems.findIndex(item => item.path === currentPath);
    return currentIndex === -1 ? 0 : currentIndex;
  });

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
