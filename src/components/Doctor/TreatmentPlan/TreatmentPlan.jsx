import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../TreatmentPlan/TreatmentPlan.css';
import SidebarCustom from '../SidebarCustom/SidebarCustom';

const TreatmentPlan = () => {
  const navigate = useNavigate();
  const { doctorId, patientId } = useParams();
  const location = useLocation();

  const { patientName } = location.state || {};

  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'Twice a day',
      notes: 'After meals',
    },
    {
      id: 2,
      name: 'Amoxicillin',
      dosage: '250mg',
      frequency: 'Three times a day',
      notes: 'Before meals',
    },
  ]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  useEffect(() => {
    axios
      .get(`/api/treatment-plan/${patientId}`)
      .then(({ data }) => {
        if (data) {
          setDiagnosis(data.diagnosis || '');
          setMedications(data.medications?.length ? data.medications : medications);
          setAppointmentDate(data.appointmentDate || '');
          setAppointmentTime(data.appointmentTime || '');
        }
      })
      .catch((err) => {
        console.error('Error fetching treatment plan:', err);
      });
  }, [patientId]);

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSave = () => {
    const payload = {
      patientId,
      diagnosis,
      medications,
      appointmentDate,
      appointmentTime,
    };

    axios
      .put(`/api/treatment-plan/${patientId}`, payload)
      .then(() => {
        alert('Changes saved successfully');
      })
      .catch((err) => {
        console.error('Error saving treatment plan:', err);
        alert('Failed to save changes');
      });
  };

  const handleAddMedication = () => {
    navigate(`/doctor/${doctorId}/patients/${patientId}/add-medication`, {
      state: { doctorId, patientId },
    });
  };

  return (
    <div className="T-container">
      <SidebarCustom />
      <div className="T-content">
        <div className="T-breadcrumb">
          <span>Patients / Modify Plan</span>
        </div>

        <h1 className="T-main-heading">
          Modify Treatment Plan for Patient: {patientName || 'Loading...'}
        </h1>

        {/* Diagnosis */}
        <div className="T-section">
          <h2 className="T-section-heading">Current Diagnosis</h2>
          <div className="T-form-group">
            <label className="T-label">Diagnosis</label>
            <textarea
              className="T-textarea"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
        </div>

        {/* Medication Table */}
        <div className="T-section">
          <h2 className="T-section-heading">Medication Plan</h2>
          <div className="T-table-container">
            <table className="T-medication-table">
              <thead>
                <tr className="T-table-header">
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med, index) => (
                  <tr key={med.id || index} className="T-table-row">
                    <td>
                      <input
                        className="T-input-field"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="T-input-field"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="T-input-field"
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="T-input-field"
                        value={med.notes}
                        onChange={(e) => handleMedicationChange(index, 'notes', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Medication Button */}
        <div className="T-section">
          <h3 className="T-subsection-heading">Add Medication</h3>
          <button onClick={handleAddMedication} className="T-save-button">
            + Add New Medication
          </button>
        </div>

        {/* Follow-up Appointments */}
        <div className="T-section">
          <h2 className="T-section-heading">Follow-up Appointments</h2>
          <div className="T-form-fields">
            <div className="T-form-group">
              <label className="T-label">Next Appointment Date</label>
              <input
                type="date"
                className="T-input-field"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div className="T-form-group">
              <label className="T-label">Appointment Time</label>
              <input
                type="time"
                className="T-input-field"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="T-button-container">
          <button className="T-save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;
