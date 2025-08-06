"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import Sidebar from '../Sidbar/Sidbar';
import './SettingsContent.css';

export function SettingsContent() {
  // Account states
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // Base64 string
  const [preview, setPreview] = useState(null); // Preview image

  // Security
  const [password, setPassword] = useState("");

  // Consultation
  const [availability, setAvailability] = useState("");

  // Privacy
  const [profileVisibility, setProfileVisibility] = useState("public");

  // Notifications
  const [notifications, setNotifications] = useState({
    newMessagesEmail: true,
    newMessagesPush: true,
    upcomingAppointmentsEmail: true,
    upcomingAppointmentsPush: true,
  });

  const handleSave = async (endpoint, data, successMsg, errorMsg) => {
    try {
      await axios.post(endpoint, data);
      alert(successMsg);
    } catch (e) {
      alert(errorMsg);
      console.error(e);
    }
  };

  // دالة رفع الصورة وتحويلها لـ Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result); // Base64
      setPreview(URL.createObjectURL(file)); // preview
    };
    reader.readAsDataURL(file);
  };

  const radioOptions = [
    { id: "public", title: "Public", desc: "Your profile is visible to everyone on CoachConnect." },
    { id: "private", title: "Private", desc: "Your profile is only visible to clients you’ve accepted." },
  ];

  const toggleSections = [
    {
      title: "New Messages",
      items: [
        { id: "newMessagesEmail", label: "Email", desc: "Receive an email when you have a new message" },
        { id: "newMessagesPush", label: "Push", desc: "Receive a push notification when you have a new message" },
      ],
    },
    {
      title: "Upcoming Appointments",
      items: [
        { id: "upcomingAppointmentsEmail", label: "Email", desc: "Receive an email when you have an upcoming appointment" },
        { id: "upcomingAppointmentsPush", label: "Push", desc: "Receive a push notification when you have an upcoming appointment" },
      ],
    },
  ];

  const handleToggleChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="sett-container">
      <Sidebar />
      <div className="sett-felx">
        <h1 className="sett-page-title">Settings</h1>

        {/* Account Section */}
        <section className="sett-section">
          <h2 className="sett-section-title">Account</h2>
          <div className="sett-input-grid">

            {/* Name */}
            <div>
              <label htmlFor="name" className="sett-input-label">Name</label>
              <input
                id="name"
                placeholder="Coach Amelia"
                className="sett-text-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Expertise */}
            <div>
              <label htmlFor="expertise" className="sett-input-label">Expertise</label>
              <input
                id="expertise"
                placeholder="Fitness Coach"
                className="sett-text-input"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              />
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label htmlFor="profile-picture" className="sett-input-label">Profile Picture</label>
              <div className="sett-input-with-icon">
                <input
                  type="file"
                  accept="image/*"
                  id="profile-picture"
                  className="sett-text-input"
                  onChange={handleImageUpload}
                />
                <button type="button" className="sett-icon-button">
                  <Pencil className="sett-icon" />
                </button>
              </div>
              {preview && (
                <div style={{ marginTop: '10px' }}>
                  <img src={preview} alt="Preview" style={{ width: '80px', borderRadius: '8px' }} />
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="sett-btn-save"
            onClick={() => handleSave("/api/account/save", { name, expertise, profilePicture }, "Account info saved successfully", "Failed to save account info")}
          >
            Save Changes
          </button>
        </section>

        {/* Security Section */}
        <section className="sett-section">
          <h2 className="sett-section-title">Security</h2>
          <div className="sett-input-grid">
            <div>
              <label htmlFor="password" className="sett-input-label">Password</label>
              <div className="sett-input-with-icon">
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="sett-text-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="sett-icon-button">
                  <Pencil className="sett-icon" />
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="sett-btn-save"
            onClick={() => handleSave("/api/security/save", { password }, "Security info saved successfully", "Failed to save security info")}
          >
            Save
          </button>
        </section>

        {/* Consultation Section */}
        <section className="sett-section">
          <h2 className="sett-section-title">Consultation Availability</h2>
          <div className="sett-input-grid">
            <div>
              <label htmlFor="availability" className="sett-input-label">Availability</label>
              <div className="sett-input-with-icon">
                <input
                  id="availability"
                  placeholder="Monday - Friday, 9 AM - 5 PM"
                  className="sett-text-input"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                />
                <button type="button" className="sett-icon-button">
                  <Pencil className="sett-icon" />
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="sett-btn-save"
            onClick={() => handleSave("/api/consultation/save", { availability }, "Consultation availability saved successfully", "Failed to save consultation availability")}
          >
            Save Changes
          </button>
        </section>

        {/* Privacy Section */}
        <section className="sett-section">
          <h2 className="sett-section-title">Privacy</h2>
          <div className="sett-radio-container">
            <label className="sett-input-label">Profile visibility</label>
            <div className="sett-radio-group">
              {radioOptions.map((option) => (
                <div key={option.id} className="sett-radio-item">
                  <input
                    type="radio"
                    id={option.id}
                    name="profile-visibility"
                    value={option.id}
                    checked={profileVisibility === option.id}
                    onChange={() => setProfileVisibility(option.id)}
                    className="sett-radio-input"
                  />
                  <label htmlFor={option.id} className="sett-radio-label">
                    <span className="sett-radio-title">{option.title}</span>
                    <span className="sett-radio-desc">{option.desc}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="sett-btn-save"
            onClick={() => handleSave("/api/privacy/save", { profileVisibility }, "Privacy settings saved successfully", "Failed to save privacy settings")}
          >
            Save
          </button>
        </section>

        {/* Notifications Section */}
        <section className="sett-section">
          <h2 className="sett-section-title">Notifications</h2>
          <p className="sett-section-desc">Manage how you receive notifications</p>

          <div className="sett-input-grid">
            {toggleSections.map((section) => (
              <React.Fragment key={section.title}>
                <h3 className="sett-sub-title" style={{ marginTop: "1rem" }}>{section.title}</h3>
                {section.items.map((item) => (
                  <div key={item.id} className="sett-toggle-item">
                    <div className="sett-toggle-labels">
                      <label htmlFor={item.id} className="sett-toggle-title">{item.label}</label>
                      <span className="sett-toggle-desc">{item.desc}</span>
                    </div>
                    <label className="sett-switch">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={notifications[item.id]}
                        onChange={() => handleToggleChange(item.id)}
                      />
                      <span className="sett-slider round"></span>
                    </label>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          <button
            type="button"
            className="sett-btn-save"
            onClick={() => handleSave("/api/notifications/save", notifications, "Notification settings saved successfully", "Failed to save notification settings")}
          >
            Save
          </button>
        </section>
      </div>
    </div>
  );
}
