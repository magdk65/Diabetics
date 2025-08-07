import React, { useState } from 'react';

const AddMedication = () => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Add Medication: ${formData.name}, ${formData.dosage}, ${formData.frequency}`);
    // هنا ممكن ترسل البيانات للباك
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add Medication</h2>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="form">

          <div className="form-group">
            <label className="form-label">Medication Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dosage</label>
            <input
              type="text"
              name="dosage"
              className="form-input"
              value={formData.dosage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Frequency</label>
            <input
              type="text"
              name="frequency"
              className="form-input"
              value={formData.frequency}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddMedication;
