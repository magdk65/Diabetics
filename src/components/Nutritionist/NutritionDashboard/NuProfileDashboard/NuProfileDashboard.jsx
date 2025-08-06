"use client";

import { useState } from "react";
import "../NuProfileDashboard/NuProfileDashboard.css";
import Sidebar_Nut from "../../Sidebar_Nut/Sidebar_Nut";

const NuProfileDashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [language, setLanguage] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile);
  };

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications);
  };

  const handleSavePreferences = () => {
    console.log("Saving preferences:", language);
  };

  return (
    <div className="nu-dashboard-container">
      <div className="nu-main">
        <Sidebar_Nut/>
        <div className="flex-nu-peofile">

        <div className="nu-sections">
          <h1 className="nu-title">Settings</h1>
          <div className="nu-card">
                    

            <div className="nu-card-header">
              <h2 className="nu-card-title">Profile</h2>
            </div>
            <div className="nu-card-content">
              <div className="nu-form-grid">
                <div className="nu-form-group">
                  <label className="nu-form-label">Name</label>
                  <input
                    name="name"
                    type="text"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Enter your name"
                    className="nu-form-input"
                  />
                </div>
                <div className="nu-form-group">
                  <label className="nu-form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="Enter your email"
                    className="nu-form-input"
                  />
                </div>
              </div>

              <div className="nu-form-grid">
                <div className="nu-form-group">
                  <label className="nu-form-label">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    placeholder="Enter your phone number"
                    className="nu-form-input"
                  />
                </div>
                <div className="nu-form-group">
                  <label className="nu-form-label">Specialization</label>
                  <input
                    name="specialization"
                    type="text"
                    value={profile.specialization}
                    onChange={handleProfileChange}
                    placeholder="Enter your specialization"
                    className="nu-form-input"
                  />
                </div>
              </div>

              <div className="nu-form-group">
                <label className="nu-form-label">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  placeholder="Tell us about yourself"
                  className="nu-form-textarea"
                  rows="5"
                />
              </div>

              <div className="nu-form-actions">
                <button className="nu-btn nu-btn-primary" onClick={handleSaveProfile}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="nu-card">
            <div className="nu-card-header">
              <h2 className="nu-card-title">Notifications</h2>
            </div>
            <div className="nu-card-content">
              {["email", "push", "sms"].map((type) => (
                <div key={type} className="nu-checkbox-item">
                  <input
                    type="checkbox"
                    name={type}
                    checked={notifications[type]}
                    onChange={handleNotificationChange}
                    className="nu-checkbox"
                  />
                  <label className="nu-checkbox-label">
                    {type.toUpperCase()} Notifications
                  </label>
                </div>
              ))}
              <div className="nu-form-actions">
                <button className="nu-btn nu-btn-primary" onClick={handleSaveNotifications}>
                  Save Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="nu-card">
            <div className="nu-card-header">
              <h2 className="nu-card-title">Preferences</h2>
            </div>
            <div className="nu-card-content">
              <div className="nu-form-group">
                <label className="nu-form-label">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="nu-form-select"
                >
                  <option value="">Select language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="nu-form-actions">
                <button className="nu-btn nu-btn-primary" onClick={handleSavePreferences}>
                  Save Preferences
                </button>
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default NuProfileDashboard;



