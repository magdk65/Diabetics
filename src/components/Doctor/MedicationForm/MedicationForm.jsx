import React, { useState } from 'react';
import '../MedicationForm/MedicationForm.css';
import SidebarCustom from '../SidebarCustom/SidebarCustom';

const MedicationForm = () => {
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    routeOfAdministration: "",
    startDate: "",
    endDate: "",
    additionalNotes: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="modic-container">
        <SidebarCustom/>
      <div className="modic-wrapper">
        {/* Breadcrumb */}
        <div className="modic-breadcrumb">
          <span className="modic-breadcrumb-item">Patients</span>
          <span className="modic-breadcrumb-separator">/</span>
          <span className="modic-breadcrumb-current">Modify Medication</span>
        </div>

        {/* Main Heading */}
        <h1 className="modic-main-heading">
          Add New Medication for Patient
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modic-form">
          {/* Medication Name */}
          <div className="modic-form-group">
            <label htmlFor="medicationName" className="modic-form-label">
              Medication Name
            </label>
            <input
              id="medicationName"
              type="text"
              placeholder="Enter medication name"
              value={formData.medicationName}
              onChange={(e) => handleInputChange("medicationName", e.target.value)}
              className="modic-form-input"
            />
          </div>

          {/* Dosage */}
          <div className="modic-form-group">
            <label htmlFor="dosage" className="modic-form-label">
              Dosage
            </label>
            <input
              id="dosage"
              type="text"
              placeholder="e.g., 200mg"
              value={formData.dosage}
              onChange={(e) => handleInputChange("dosage", e.target.value)}
              className="modic-form-input"
            />
          </div>

          {/* Frequency */}
          <div className="modic-form-group">
            <label htmlFor="frequency" className="modic-form-label">
              Frequency
            </label>
            <input
              id="frequency"
              type="text"
              placeholder="e.g., Twice daily"
              value={formData.frequency}
              onChange={(e) => handleInputChange("frequency", e.target.value)}
              className="modic-form-input"
            />
          </div>

          {/* Route of Administration */}
          <div className="modic-form-group">
            <label htmlFor="routeOfAdministration" className="modic-form-label">
              Route of Administration
            </label>
            <input
              id="routeOfAdministration"
              type="text"
              placeholder="e.g., Oral"
              value={formData.routeOfAdministration}
              onChange={(e) => handleInputChange("routeOfAdministration", e.target.value)}
              className="modic-form-input"
            />
          </div>

          {/* Start Date */}
          <div className="modic-form-group">
            <label htmlFor="startDate" className="modic-form-label">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              placeholder="Select start date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="modic-form-input"
            />
          </div>

          {/* End Date */}
          <div className="modic-form-group">
            <label htmlFor="endDate" className="modic-form-label">
              End Date (Optional)
            </label>
            <input
              id="endDate"
              type="date"
              placeholder="Select end date"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              className="modic-form-input"
            />
          </div>

          {/* Additional Notes */}
          <div className="modic-form-group">
            <label htmlFor="additionalNotes" className="modic-form-label">
              Additional Notes/Instructions
            </label>
            <textarea
              id="additionalNotes"
              placeholder=""
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              className="modic-form-textarea"
              rows="5"
            />
          </div>

          {/* Submit Button */}
          <div className="modic-submit-section">
            <button type="submit" className="modic-submit-button">
              Save Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationForm;
