import React, { useState } from "react";
import Header from "../Dashboard/Header";
import "./MedicalDashboard.css";
import Sidebar from "../Dashboard/Sidebar";
import { Link } from "react-router-dom";

const MedicalDashboard = () => {
  const [todayMedications, setTodayMedications] = useState([
    { name: "Metformin", dosage: "100mg", time: "08:00 AM" },
    { name: "Glipizide", dosage: "20mg", time: "08:00 AM" },
    { name: "Insulin", dosage: "10 units", time: "08:00 AM" },
  ]);

  const [yesterdayMedications, setYesterdayMedications] = useState([
    { name: "Metformin", dosage: "100mg", time: "08:00 AM" },
    { name: "Glipizide", dosage: "20mg", time: "08:00 AM" },
    { name: "Insulin", dosage: "10 units", time: "08:00 AM" },
  ]);

  return (
    <div className="med-dashboard-container">
      <Header />
      <div className="med-content-header">
        <div className="felx3">
          <Sidebar />
          <div className="part2_dm">
            <div className="bodydm">
              <h1>Medication</h1>
              <Link to='/medicaldashboard/addmedical' className="med-add-medication-btn">
                <span className="med-btn-icon">+</span> Add Medication
              </Link>
            </div>

            <div className="medication-section">
              <h2>Today</h2>
              <div className="medication-list">
                {todayMedications.map((med, idx) => (
                  <div key={idx} className="medication-card">
                    <div className="medication-info">
                      <div className="medication-icon">💊</div>
                      <div className="medication-details">
                        <h3>{med.name}</h3>
                        <p>{med.dosage}</p>
                      </div>
                    </div>
                    <div className="medication-time">{med.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="medication-section">
              <h2>Yesterday</h2>
              <div className="medication-list">
                {yesterdayMedications.map((med, idx) => (
                  <div key={idx} className="medication-card">
                    <div className="medication-info">
                      <div className="medication-icon">💊</div>
                      <div className="medication-details">
                        <h3>{med.name}</h3>
                        <p>{med.dosage}</p>
                      </div>
                    </div>
                    <div className="medication-time">{med.time}</div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
