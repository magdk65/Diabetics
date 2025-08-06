"use client";

import React, { useEffect, useState } from "react";
import '../ParentAlerts/ParentAlerts.css';

import { FiDroplet, FiZap, FiCpu, FiBell } from "react-icons/fi";
import Sidebar from "../Sidbar/Sidbar";

// تحديد لون الحالة حسب مستوى السكر
const getSugarStatus = (value) => {
  if (value > 160) return "high";
  if (value < 70) return "low";
  return "normal";
};

const ParentAlerts = () => {
  const [reminders, setReminders] = useState([
    { id: 1, type: "measure", title: "Time to measure blood sugar", time: "10:00 AM" },
    { id: 2, type: "blood", title: "Blood sugar level", time: "10:05 AM", sugarValue: 180 },
    { id: 3, type: "insulin", title: "Take insulin", time: "12:00 PM" },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  // إظهار أو إخفاء القائمة
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="alert-p-dashboard">
      <Sidebar />
      <div className="flex-p-alerts">
        <div className="alert-p-header">
          <h1 className="alert-p-main-title">Parent Alerts & Reminders</h1>

          {/* أيقونة الجرس مع القائمة */}
          <div className="alert-p-bell-wrapper">
            <FiBell 
              size={28} 
              color="#82666b" 
              className="alert-p-bell-icon"
              style={{ padding: "2.5%" }}
              onClick={toggleDropdown} 
            />
            {showDropdown && (
              <div className="alert-p-dropdown">
                {reminders.length === 0 ? (
                  <p className="alert-p-empty">No new alerts</p>
                ) : (
                  reminders.map((reminder) => {
                    const status =
                      reminder.type === "blood" && reminder.sugarValue !== undefined
                        ? getSugarStatus(reminder.sugarValue)
                        : null;

                    return (
                      <div key={reminder.id} className={`alert-p-dropdown-item ${status ? `alert-p-${status}` : ""}`}>
                        {reminder.type === "blood" ? (
                          <FiDroplet size={20} color="#82666b" />
                        ) : reminder.type === "insulin" ? (
                          <FiZap size={20} color="#82666b" />
                        ) : (
                          <FiCpu size={20} color="red" />
                        )}
                        <span>{reminder.title}</span>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* قائمة التذكيرات العادية */}
        <div className="alert-p-section">
          <h2 className="alert-p-section-title">Today</h2>
          <div className="alert-p-reminders-list">
            {reminders.map((reminder) => {
              const status =
                reminder.type === "blood" && reminder.sugarValue !== undefined
                  ? getSugarStatus(reminder.sugarValue)
                  : null;

              return (
                <div key={reminder.id} className={`alert-p-reminder-item ${status ? `alert-p-${status}` : ""}`}>
                  <div className="alert-p-reminder-icon">
                    {reminder.type === "blood" ? (
                      <FiDroplet size={28} color="#82666b" />
                    ) : reminder.type === "insulin" ? (
                      <FiZap size={28} color="#82666b" />
                    ) : (
                      <FiCpu size={28} color="red" />
                    )}
                  </div>
                  <div className="alert-p-reminder-content">
                    <h3>{reminder.title}</h3>
                    <p>
                      {reminder.time}
                      {reminder.type === "blood" && reminder.sugarValue !== undefined
                        ? ` - ${reminder.sugarValue} mg/dL (${status.toUpperCase()})`
                        : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentAlerts;
