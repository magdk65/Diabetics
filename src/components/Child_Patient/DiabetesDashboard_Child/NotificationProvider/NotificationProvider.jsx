"use client";

import { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // إضافة إشعار جديد
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
// ⬅️ ضعها فوق return
const sendNotificationToParent = async (notification) => {
  try {
    await fetch("http://127.0.0.1:8000/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // لو عندك توكن
      },
      body: JSON.stringify({
        child_id: localStorage.getItem("child_id"), // أو جيبها من السياق
        title: notification.title,
        message: notification.message,
      }),
    });
  } catch (error) {
    console.error("Failed to send notification to parent:", error);
  }
};

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        !event.target.closest(".notification-btn") &&
        !event.target.closest(".notification-dropdown")
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  // ⏰ كل 6 ساعات إشعار قياس السكر
  useEffect(() => {
    const interval = setInterval(() => {
      addNotification({
        title: "Blood Sugar Check Reminder",
        message: "Please check your blood sugar now!",
        time: new Date().toLocaleTimeString(),
        type: "measure", // يفتح صفحة قياس السكر
      });
    }, 6 * 60 * 60 * 1000); // كل 6 ساعات

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // محاكاة قياس السكر
      const value = Math.floor(Math.random() * 200) + 50; 
      let type = "normal";
      let message = `Your blood sugar is ${value} mg/dL (Normal) ✅`;

      if (value > 160) {
        type = "high";
        message = `⚠️ Your blood sugar is HIGH: ${value} mg/dL`;
      } else if (value < 70) {
        type = "low";
        message = `⚠️ Your blood sugar is LOW: ${value} mg/dL`;
      }

      addNotification({
        title: "Blood Sugar Status",
        message,
        time: new Date().toLocaleTimeString(),
        type, // high / low / normal
      });
    }, 4 * 60 * 60 * 1000); // كل 4 ساعات

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotifications,
        setShowNotifications,
        addNotification,
        markAsRead,
         sendNotificationToParent,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
