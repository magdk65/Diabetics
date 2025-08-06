"use client";

import React, { useContext } from "react";
import { NotificationContext } from "../NotificationProvider/NotificationProvider";
import '../NotificationDropdown/NotificationDropdown.css';

const NotificationDropdown = () => {
  const { notifications, markAsRead } = useContext(NotificationContext);

  const handleNotificationClick = (id) => {
    markAsRead(id);
  };

  if (notifications.length === 0) {
    return <div className="no-notifications">No notifications</div>;
  }

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h3>Notifications</h3>
      </div>
      <div className="notification-list">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification-item ${!notif.read ? "unread" : ""}`}
            onClick={() => handleNotificationClick(notif.id)}
          >
            <div className="notification-content">
              <p className="notification-title">{notif.title}</p>
              <p className="notification-message">{notif.message}</p>
              <p className="notification-time">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
