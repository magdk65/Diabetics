import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiBell, FiEdit, FiLock, FiLogOut } from "react-icons/fi";
import Header from "../Dashboard/Header";
import Sidebar from "../Dashboard/Sidebar";

import "../ProfilePage/ProfilePage.css";
import "../Dashboard/Dashboard.css";

const defaultUserData = {
  id: "1",
  name: "magd kouli",
  email: "default@example.com",
  dob: "1990-01-01",
  gender: "Not specified",
  phone: "000-000-0000",
  address: "Unknown",
  avatar: "/path/to/default-avatar.png", // مثال على رابط صورة افتراضية
  subscription: {
    status: "inactive",
    plan: "Free",
  },
  appointments: [],
  notifications: 0,
};

const ProfilePage = () => {
  const [userData, setUserData] = useState(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setUserData((prev) => ({
          ...prev,
          ...response.data,
          subscription: {
            ...prev.subscription,
            ...response.data.subscription,
          },
          appointments: Array.isArray(response.data.appointments)
            ? response.data.appointments
            : [],
        }));
      } catch (err) {
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <p className="pp-loading">Loading profile...</p>;
  if (error) return <p className="pp-error">{error}</p>;

  return (
    <div className="pp-page">
      <Header />
      <div className="pp-dashboard-layout">
        <div className="flex">
          {/* Sidebar هنا بدون تمرير عناصر لأنه يحتويها داخلياً */}
          <Sidebar activeIndex={activeIndex} onSelect={setActiveIndex} />

          <main className="pp-main-content">
            <h1 className="pp-page-title">My Profile</h1>

            <div className="pp-profile-section">
              <div className="pp-profile-info">
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
              </div>
              <div className="pp-profile-avatar">
                <img src={userData.avatar} alt="User Avatar" />
              </div>
            </div>

            {/* Personal Info */}
            <section className="pp-section">
              <h3 className="pp-section-title">Personal Information</h3>
              <div className="pp-info-grid">
                <div className="pp-info-item">
                  <label>Date of Birth</label>
                  <p>{userData.dob || "N/A"}</p>
                </div>
                <div className="pp-info-item">
                  <label>Gender</label>
                  <p>{userData.gender || "N/A"}</p>
                </div>
                <div className="pp-info-item">
                  <label>Phone Number</label>
                  <p>{userData.phone || "N/A"}</p>
                </div>
                <div className="pp-info-item">
                  <label>Address</label>
                  <p>{userData.address || "N/A"}</p>
                </div>
              </div>
            </section>

            {/* Subscription */}
            <section className="pp-section">
              <h3 className="pp-section-title">Subscription</h3>
              <div className="pp-info-grid">
                <div className="pp-info-item">
                  <label>Status</label>
                  <p>{userData.subscription.status || "N/A"}</p>
                </div>
                <div className="pp-info-item">
                  <label>Plan</label>
                  <p>{userData.subscription.plan || "N/A"}</p>
                </div>
              </div>
            </section>

            {/* Appointments */}
            <section className="pp-section">
              <h3 className="pp-section-title">Upcoming Appointments</h3>
              <div className="pp-appointments-list">
                {userData.appointments.length > 0 ? (
                  userData.appointments.map((appt, idx) => (
                    <div key={idx} className="pp-appointment-item">
                      <p className="pp-date-time">
                        {appt.date}, {appt.time}
                      </p>
                      <p className="pp-type">{appt.type}</p>
                      <p className="pp-provider">{appt.provider}</p>
                    </div>
                  ))
                ) : (
                  <p>No upcoming appointments.</p>
                )}
              </div>
            </section>

            {/* Settings */}
            <section className="pp-section">
              <h3 className="pp-section-title">Settings</h3>
              <div className="pp-settings-list">
                <button className="pp-settings-btn">
                  <span>Edit Profile</span>
                  <FiEdit size={18} />
                </button>
                <button className="pp-settings-btn">
                  <span>Change Password</span>
                  <FiLock size={18} />
                </button>
                <button className="pp-settings-btn pp-logout-btn">
                  <FiLogOut size={18} style={{ marginRight: "0.5rem" }} />
                  <span>Log Out</span>
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
