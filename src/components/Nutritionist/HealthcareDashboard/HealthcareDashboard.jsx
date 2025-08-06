import { useState } from "react";
import './HealthcareDashboard.css';
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";

const HealthcareDashboard = () => {
  // بيانات المرضى الجدد
  const [newPatients, setNewPatients] = useState([
    { id: 1, name: "Sophia Bennett", age: 28, goal: "Weight Loss" },
    { id: 2, name: "Ethan Walker", age: 35, goal: "Muscle Gain" },
    { id: 3, name: "Olivia Hayes", age: 42, goal: "Diabetes Management" },
  ]);

  // بيانات التنبيهات
  const [alerts, setAlerts] = useState([
    { id: 1, name: "Sophia Bennett", type: "Dietary Challenge" },
    { id: 2, name: "Ethan Walker", type: "Dietary Challenge" },
  ]);

  // بيانات المواعيد القادمة
  const [appointments, setAppointments] = useState([
    { id: 1, name: "Sophia Bennett", time: "10:00 AM - 11:00 AM" },
    { id: 2, name: "Ethan Walker", time: "11:30 AM - 12:30 PM" },
    { id: 3, name: "Olivia Hayes", time: "1:00 PM - 2:00 PM" },
  ]);

  return (
    <div className="dashboard-container">

      {/* Main Content */}
      <div className="main-content-care">
        {/* New Patients Section */}
        <div className="section-care0">
            <Sidebar_Nut/>
            <div className="health-care">
                <h1 className="section-title--care-p">patients</h1>
          <h2 className="section-title-care-theath-p">New Patients</h2>
          <div className="patients-grid">
            {newPatients.map((patient) => (
              <div className="patient-card" key={patient.id}>
                <div className="patient-avatar-container">
                  <div className="patient-avatar">
                    <img src="/placeholder.svg?height=96&width=96" alt={patient.name} />
                  </div>
                </div>
                <h3 className="patient-name">{patient.name}</h3>
                <p className="patient-info">
                  Age: {patient.age}, Goal: {patient.goal}
                </p>
              </div>
            ))}
          </div>
        

        {/* Alerts Section */}
        <div className="section-care">
          <h2 className="section-title-care-theath-p">Alerts</h2>
          <div className="alerts-list">
            {alerts.map((alert) => (
              <div className="alert-item" key={alert.id}>
                <div className="alert-content">
                  <div className="alert-avatar">
                    <img src="/placeholder.svg?height=40&width=40" alt={alert.name} />
                  </div>
                  <div className="alert-info">
                    <h4 className="alert-name">{alert.name}</h4>
                    <p className="alert-description">{alert.type}</p>
                  </div>
                </div>
                <svg className="chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments Section */}
        <div className="section-care2">
          <h2 className="section-title-care-theath-p">Upcoming Appointments</h2>
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div className="appointment-item" key={appointment.id}>
                <div className="appointment-content">
                  <div className="appointment-avatar">
                    <img src="/placeholder.svg?height=40&width=40" alt={appointment.name} />
                  </div>
                  <div className="appointment-info">
                    <h4 className="appointment-name">{appointment.name}</h4>
                    <p className="appointment-time">{appointment.time}</p>
                  </div>
                </div>
                <svg className="chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
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

export default HealthcareDashboard;
