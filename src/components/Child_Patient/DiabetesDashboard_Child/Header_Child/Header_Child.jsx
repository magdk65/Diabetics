"use client"

import React, { useContext, useRef, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { NotificationContext } from "../NotificationProvider/NotificationProvider"
import "../Header_Child/Header_Child.css"

const Header_Child = () => {
  const {
    notifications,
    showNotifications,
    setShowNotifications,
    markAsRead,
  } = useContext(NotificationContext)

  const navigate = useNavigate()

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  // التنقل حسب نوع الإشعار
  const handleClickNotification = (notif) => {
    markAsRead(notif.id)
    setShowNotifications(false)

    if (notif.type === "measure") {
      navigate("/measure")
    } else if (
      notif.type === "high" ||
      notif.type === "low" ||
      notif.type === "normal"
    ) {
      navigate("/dashboard-child")
    } else {
      navigate("/dashboard-child") 
    }
  }

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setShowNotifications])

  return (
    <div className="header-child">
      <div className="logo">
        <div className="logo-inner"></div>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/challenges"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Challenges
        </NavLink>
        <NavLink
          to="/rewards"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Rewards
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Profile
        </NavLink>
      </nav>

      <div className="header-actions" style={{ position: "relative" }}>
        <button
          ref={buttonRef}
          className="notification-btn"
          onClick={toggleNotifications}
          aria-label="Notifications"
        >
          <svg
            className="bell-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="m13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>

        <div className="avatar" aria-label="User Avatar" title="User Avatar">
          A
        </div>

        {showNotifications && (
          <div ref={dropdownRef} className="notification-dropdown">
            <div className="notification-header">
              <h3>Notification</h3>
            </div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">No notification</div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${!notif.read ? "unread" : ""}`}
                    onClick={() => handleClickNotification(notif)}
                  >
                    <div className="notification-content">
                      <p className="notification-title">{notif.title}</p>
                      <p className="notification-message">{notif.message}</p>
                      <p className="notification-time">{notif.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header_Child
