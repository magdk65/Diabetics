import React from 'react'
import { useState } from "react";
import Sidebar from '../Dashboard/Sidebar';
import Header from '../Dashboard/Header';
import '../AddMedical/AddMedical.css'
const AddMedical = () => {
     const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    timing: "",
    method: "",
    notificationTime: "",
    appNotification: false,
    emailNotification: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // هون رح تضيف طلب API لاحقاً
    // مثال:
    // await axios.post('/api/medications', formData)
  };
  return (
 <div className="health-tracker-layout">
    <Header/>
    <div className='flex4'>
      <Sidebar/>

      <main className="main-content">
        <div className="container-addm">
          <h1 className="page-title">Add Medication</h1>

          <form className="medication-form" onSubmit={handleSubmit}>
            {/* Medication Name */}
            <div className="form-group">
              <label htmlFor="medicationName" className="form-label">Medication Name</label>
              <input
                type="text"
                id="medicationName"
                name="medicationName"
                className="form-input"
                placeholder="e.g., Metformin"
                value={formData.medicationName}
                onChange={handleInputChange}
              />
            </div>

            {/* Dosage */}
            <div className="form-group">
              <label htmlFor="dosage" className="form-label">Dosage</label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                className="form-input"
                placeholder="e.g., 500mg"
                value={formData.dosage}
                onChange={handleInputChange}
              />
            </div>

            {/* Timing */}
            <div className="form-group">
              <label htmlFor="timing" className="form-label">Timing</label>
              <div className="select-wrapper">
                <select
                  id="timing"
                  name="timing"
                  className="form-select"
                  value={formData.timing}
                  onChange={handleInputChange}
                >
                  <option value="">Select timing</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="bedtime">Bedtime</option>
                  <option value="with-meals">With meals</option>
                  <option value="before-meals">Before meals</option>
                  <option value="after-meals">After meals</option>
                </select>
              </div>
            </div>

            {/* Method */}
            <div className="form-group">
              <label htmlFor="method" className="form-label">Method</label>
              <div className="select-wrapper">
                <select
                  id="method"
                  name="method"
                  className="form-select"
                  value={formData.method}
                  onChange={handleInputChange}
                >
                  <option value="">Select method</option>
                  <option value="oral">Oral</option>
                  <option value="injection">Injection</option>
                  <option value="topical">Topical</option>
                  <option value="inhaler">Inhaler</option>
                  <option value="drops">Drops</option>
                </select>
              </div>
            </div>

            {/* Notifications */}
            <div className="notifications-section">
              <h3 className="section-title">Notifications</h3>

              {/* Notification Time */}
              <div className="form-group">
                <label htmlFor="notificationTime" className="form-label">Notification Time</label>
                <div className="select-wrapper">
                  <select
                    id="notificationTime"
                    name="notificationTime"
                    className="form-select"
                    value={formData.notificationTime}
                    onChange={handleInputChange}
                  >
                    <option value="">Select time</option>
                    <option value="8:00">8:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="custom">Custom time</option>
                  </select>
                </div>
              </div>

              {/* Notification Options */}
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="appNotification"
                    name="appNotification"
                    className="checkbox-input"
                    checked={formData.appNotification}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="appNotification" className="checkbox-label">App Notification</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="emailNotification"
                    name="emailNotification"
                    className="checkbox-input"
                    checked={formData.emailNotification}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="emailNotification" className="checkbox-label">Email Notification</label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn">Add Medication</button>
          </form>
        </div>
      </main>
      </div>
    </div>
  );
};

export default AddMedical