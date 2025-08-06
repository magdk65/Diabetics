import { useState } from "react";
import { Link } from "react-router-dom";
import { FiBell, FiEdit, FiLock, FiChevronRight } from "react-icons/fi";
import { GiWaterDrop, GiKnifeFork } from "react-icons/gi";
import "../EditProfilePage/EditProfilePage.css";
import Header from "../Dashboard/Header";
import logo4 from "../../../assets/img/Depth 4, Frame 1.png";
import Sidebar from "../Dashboard/Sidebar";  // Sidebar ثابت مستقل

const initialData = {
  name: "Sophia Carter",
  email: "sophia.carter@example.com",
  phone: "+1 234 567 890",
  dateOfBirth: "1990-05-15",
  diabetesType: "Type 1",
  diagnosisDate: "2010-04-12",
};

const diabetesOptions = ["Type 1", "Type 2", "Gestational", "Other"];

const EditProfilePage = () => {
  const [formData, setFormData] = useState(initialData);
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="profile-container">
      <Header />

      <div className="main-content2">
        <div className="flex2">
          {/* Sidebar بدون تمرير بيانات، لأنه موجود داخل مكون Sidebar.jsx */}
          <Sidebar activeIndex={0} onSelect={() => {}} />

          <div className="content-grid">
            <div className="main-section">
              <div className="profile-header">
                <h1 className="page-title">Profile</h1>
                <p className="page-subtitle">
                  Manage your personal information and settings
                </p>
              </div>

              <div className="user-profile-card">
                <div className="user-info">
                  <div className="user-avatar-large">
                    <label htmlFor="upload-image">
                      <img
                        src={profileImage || logo4}
                        alt="User"
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                    <input
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="upload-input"
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="user-details">
                    <h2 className="user-name">{formData.name}</h2>
                    <p className="user-type">{formData.diabetesType} Diabetes</p>
                    <p className="user-joined">Joined 2021</p>
                  </div>
                </div>
              </div>

              <div className="personal-info-card">
                <h3 className="section-title">Personal Information</h3>
                <div className="form-grid">
                  {[
                    { id: "name", label: "Name", type: "text" },
                    { id: "email", label: "Email", type: "email" },
                    { id: "phone", label: "Phone", type: "text" },
                    { id: "dateOfBirth", label: "Date of Birth", type: "date" },
                    { id: "diagnosisDate", label: "Diagnosis Date", type: "date" },
                  ].map(({ id, label, type }) => (
                    <div className="form-group" key={id}>
                      <label htmlFor={id} className="form-label">
                        {label}
                      </label>
                      <input
                        id={id}
                        type={type}
                        value={formData[id]}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  ))}

                  <div className="form-group">
                    <label htmlFor="diabetesType" className="form-label">
                      Diabetes Type
                    </label>
                    <select
                      id="diabetesType"
                      value={formData.diabetesType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {diabetesOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3 className="section-title">Settings</h3>
                <div className="settings-list">
                  <Link to="/notification" className="settings-item">
                    <div className="settings-item-content">
                      <div className="settings-icon">
                        <FiBell />
                      </div>
                      <div className="settings-text">
                        <p className="settings-title">Notifications</p>
                        <p className="settings-description">
                          Manage your notification preferences
                        </p>
                      </div>
                    </div>
                    <div className="chevron-icon">
                      <FiChevronRight />
                    </div>
                  </Link>

                  <Link to="/security" className="settings-item">
                    <div className="settings-item-content">
                      <div className="settings-icon">
                        <FiLock />
                      </div>
                      <div className="settings-text">
                        <p className="settings-title">Security</p>
                        <p className="settings-description">Change your password</p>
                      </div>
                    </div>
                    <div className="chevron-icon">
                      <FiChevronRight />
                    </div>
                  </Link>

                  <Link to="/devices" className="settings-item">
                    <div className="settings-item-content">
                      <div className="settings-icon">
                        <FiEdit />
                      </div>
                      <div className="settings-text">
                        <p className="settings-title">Devices</p>
                        <p className="settings-description">Manage your connected devices</p>
                      </div>
                    </div>
                    <div className="chevron-icon">
                      <FiChevronRight />
                    </div>
                  </Link>
                </div>
              </div>

              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
            </div>

            {/* Sidebar on right for quick actions (إذا تحب تحافظ عليه) */}
            <div className="sidebar">
              <div className="quick-actions-card">
                <h3 className="sidebar-title">Quick Actions</h3>
                <div className="quick-actions-list">
                  {[
                    { text: "Log Blood Sugar", icon: <GiWaterDrop />, to: "/log-blood-sugar" },
                    { text: "Add Medication", icon: <FiEdit />, to: "/add-medication" },
                    { text: "Record Meal", icon: <FiLock />, to: "/record-meal" },
                    { text: "Track Exercise", icon: <GiKnifeFork />, to: "/track-exercise" },
                  ].map(({ text, icon, to }) => (
                    <Link to={to} className="quick-action-item" key={text}>
                      <div className="quick-action-content">
                        <div className="quick-action-icon">{icon}</div>
                        <span className="quick-action-text">{text}</span>
                      </div>
                      <div className="chevron-icon">
                        <FiChevronRight />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
