import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Dr_Dashboard/Dr_Dashboard.css'
import SidebarCustom from "../SidebarCustom/SidebarCustom";
const Dr_Dashboard = () => {
  // --- States with Default Values ---
  const [overview, setOverview] = useState({
    totalPatients: 125,
    urgentAlerts: 5,
    followUps: 12,
  });

  const [patients, setPatients] = useState([
    { name: "Liam Carter", status: "Good", lastVisit: "2 weeks ago", nextAppointment: "In 3 months" },
    { name: "Olivia Bennett", status: "Stable", lastVisit: "1 week ago", nextAppointment: "In 2 months" },
    { name: "Noah Thompson", status: "Needs Follow-up", lastVisit: "3 weeks ago", nextAppointment: "In 1 week" },
    { name: "Emma Davis", status: "Good", lastVisit: "1 month ago", nextAppointment: "In 4 months" },
    { name: "Ethan Wilson", status: "Stable", lastVisit: "2 weeks ago", nextAppointment: "In 3 months" },
  ]);

  // --- Fetch Overview Stats ---
  const fetchOverview = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dashboard/overview");
      setOverview(response.data);
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  // --- Fetch Patients List ---
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // --- Load Data on Component Mount ---
  useEffect(() => {
    fetchOverview();
    fetchPatients();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Good":
        return "das-badge-good";
      case "Stable":
        return "das-badge-stable";
      case "Needs Follow-up":
        return "das-badge-needs-followup";
      default:
        return "";
    }
  };

  return (
    <main className="das-main-content">
        <SidebarCustom/>
        <div className="felx-das-dr">
      <h1 className="das-dashboard-title">Dashboard</h1>
      <div className="das-summary-cards-grid">
        <div className="das-card">
          <div className="das-card-label">Total Patients</div>
          <div className="das-card-value">{overview.totalPatients}</div>
        </div>
        <div className="das-card">
          <div className="das-card-label">Urgent Alerts</div>
          <div className="das-card-value">{overview.urgentAlerts}</div>
        </div>
        <div className="das-card">
          <div className="das-card-label">Follow-up Appointments</div>
          <div className="das-card-value">{overview.followUps}</div>
        </div>
      </div>

      <h2 className="das-patients-title">My Patients</h2>

      <div className="das-patients-table-container">
        <table className="das-patients-table">
          <thead>
            <tr className="das-table-header-row">
              <th>Patient Name</th>
              <th>Status</th>
              <th>Last Visit</th>
              <th>Next Appointment</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="das-table-row">
                <td className="das-patient-name">{patient.name}</td>
                <td>
                  <span className={`das-badge ${getStatusBadgeClass(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="das-patient-detail">{patient.lastVisit}</td>
                <td className="das-patient-detail">{patient.nextAppointment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </main>
  );
};

export default Dr_Dashboard;
