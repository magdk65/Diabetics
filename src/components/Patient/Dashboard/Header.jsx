// Header.jsx
import React from "react";
import { FiBell } from "react-icons/fi"; // استيراد أيقونة الجرس الصحيحة
import logo2 from '../../../assets/img/Screenshot_2025-07-05_230814-removebg-preview 1.png';
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        {/* الشعار */}
        <div className="logo">

          <img  src={logo2} className="logo-text" alt=""/>
        </div>

        {/* روابط التنقل */}
       

        <div className="header-actions" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
             <nav className="nav" style={{ display: "flex", gap: "32px" }}>
          <a href="#" className="nav-link active" style={{ color: "#617afa", fontWeight: 500, textDecoration: "none" }}>
            Overview
          </a>
          <a href="#" className="nav-link" style={{ color: "#617afa", fontWeight: 500, textDecoration: "none" }}>
            Logbook
          </a>
          <a href="#" className="nav-link" style={{ color: "#617afa", fontWeight: 500, textDecoration: "none" }}>
            Reports
          </a>
          <a href="#" className="nav-link" style={{ color: "#617afa", fontWeight: 500, textDecoration: "none" }}>
            Learn
          </a>
        </nav>
          <FiBell size={20} color="#617afa" style={{ cursor: "pointer" }} />
          <div className="avatar" style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#47579e",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            userSelect: "none"
          }}>
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
