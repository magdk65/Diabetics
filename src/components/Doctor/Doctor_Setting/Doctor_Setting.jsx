import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Doctor_Setting/Doctor_Setting.css';
import SidebarCustom from '../SidebarCustom/SidebarCustom';

const Doctor_Setting = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    critical: false,
    inApp: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/profile')
      .then(({ data }) => {
        setProfile({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
        setNotifications({
          email: data.notifications.email,
          sms: data.notifications.sms,
          critical: data.notifications.critical || false,
          inApp: data.notifications.inApp || false,
        });
      })
      .catch(() => setMessage('Failed to fetch profile data.'));
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setLoading(true);
    axios.put('/api/profile', profile)
      .then(() => {
        setMessage('Profile updated successfully.');
        setLoading(false);
      })
      .catch(() => {
        setMessage('Error updating profile.');
        setLoading(false);
      });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    axios.put('/api/password', {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    })
      .then(() => setMessage('Password updated successfully.'))
      .catch(() => setMessage('Error updating password.'));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    const updated = { ...notifications, [name]: checked };
    setNotifications(updated);

    axios.put('/api/notifications', updated).catch(() => {
      setMessage('Failed to update notification preferences.');
    });
  };

  return (
    <div className="D_Sett-container">
      <SidebarCustom />
      <div className="flex-sett">
        <h2 className="D_Sett-title">Doctor Settings</h2>

        <div className="D_Sett-section">
          <h3 className="D_Sett-subtitle">Personal Information</h3>
          <label className="D_Sett-label">
            Full Name:
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              className="D_Sett-input"
            />
          </label>
          <label className="D_Sett-label">
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="D_Sett-input"
            />
          </label>
          <label className="D_Sett-label">
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleProfileChange}
              className="D_Sett-input"
            />
          </label>
          <button onClick={handleSaveProfile} disabled={loading} className="D_Sett-button">
            Save Changes
          </button>
        </div>

        <div className="D_Sett-section">
          <h3 className="D_Sett-subtitle">Security</h3>
          <label className="D_Sett-label">
            Current Password:
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="D_Sett-input"
            />
          </label>
          <label className="D_Sett-label">
            New Password:
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="D_Sett-input"
            />
          </label>
          <label className="D_Sett-label">
            Confirm New Password:
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="D_Sett-input"
            />
          </label>
          <button onClick={handleUpdatePassword} className="D_Sett-button">
            Update Password
          </button>
        </div>

        <div className="D_Sett-notifications">
          <label className="D_Sett-toggle-switch">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              name="email"
              checked={notifications.email}
              onChange={handleNotificationChange}
            />
            <span className="D_Sett-slider"></span>
          </label>

          <label className="D_Sett-toggle-switch">
            <span>SMS Notifications</span>
            <input
              type="checkbox"
              name="sms"
              checked={notifications.sms}
              onChange={handleNotificationChange}
            />
            <span className="D_Sett-slider"></span>
          </label>

          <label className="D_Sett-toggle-switch">
            <span>Critical Alerts</span>
            <input
              type="checkbox"
              name="critical"
              checked={notifications.critical}
              onChange={handleNotificationChange}
            />
            <span className="D_Sett-slider"></span>
          </label>

          <label className="D_Sett-toggle-switch">
            <span>In-App Messages</span>
            <input
              type="checkbox"
              name="inApp"
              checked={notifications.inApp}
              onChange={handleNotificationChange}
            />
            <span className="D_Sett-slider"></span>
          </label>
        </div>

        {message && <p className="D_Sett-message">{message}</p>}
      </div>
    </div>
  );
};

export default Doctor_Setting;
