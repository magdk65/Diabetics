import React from 'react';

const Communication = ({ patientInfo }) => {
  return (
    <div className="card">
      <div className="card-content communication-section">
        <div className="patient-avatar-wrapper">
          <img
            src={patientInfo.avatar}
            alt={patientInfo.name}
            className="patient-avatar"
          />
        </div>
        <h2 className="card-title">{patientInfo.name}</h2>
        <div className="communication-actions">
          <button className="button" onClick={() => alert('Start chat')}>
            💬 Start Chat
          </button>
          <button className="button secondary" onClick={() => alert('Call patient')}>
            📞 Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communication;
