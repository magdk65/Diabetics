import React, { useState } from "react";
import Calendar from "react-calendar"; // npm install react-calendar
import "react-calendar/dist/Calendar.css";
import "./AppointmentsDashboard.css";

export default function AppointmentsDashboard() {
  // بيانات مواعيد افتراضية
  const [appointments, setAppointments] = useState([
    { date: "2025-08-06", time: "10:00 AM - 10:30 AM", patient: "Ethan Carter", status: "Confirmed", recurrence: "Weekly" },
    { date: "2025-08-06", time: "11:00 AM - 11:30 AM", patient: "Chloe Bennett", status: "Conflict", recurrence: "None" },
    { date: "2025-08-07", time: "12:00 PM - 12:30 PM", patient: "Noah Parker", status: "Confirmed", recurrence: "Monthly" },
    { date: "2025-08-08", time: "09:30 AM - 10:00 AM", patient: "Liam Johnson", status: "Confirmed", recurrence: "None" },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date("2025-08-06"));
  const [searchTerm, setSearchTerm] = useState("");

  // تحويل التاريخ لصيغة yyyy-mm-dd
  const formatDate = (date) => date.toISOString().split("T")[0];

  // فلترة المواعيد حسب اليوم والبحث
  const filteredAppointments = appointments.filter(
    (a) =>
      a.date === formatDate(selectedDate) &&
      a.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // إضافة موعد جديد كمثال
  const handleAddAppointment = () => {
    const newAppointment = {
      date: formatDate(selectedDate),
      time: "02:00 PM - 02:30 PM",
      patient: "New Patient",
      status: "Confirmed",
      recurrence: "None",
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <div className="ap-dashboard">
      {/* Header */}
      <div className="ap-header">
        <h1>Appointments</h1>
        <button className="ap-btn-primary" onClick={handleAddAppointment}>
          + Add Appointment
        </button>
      </div>

      {/* Search */}
      <div className="ap-search-section">
        <div className="ap-search-container">
          <span className="ap-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by patient name..."
            className="ap-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Calendar */}
      <div className="ap-calendar-section">
        <h2>Select a Date</h2>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date("2025-08-01")}
          maxDate={new Date("2025-08-31")}
        />
      </div>

      {/* Appointments Table */}
      <div className="ap-appointments-section">
        <h2>Appointments for {formatDate(selectedDate)}</h2>
        <table className="ap-appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Status</th>
              <th>Recurrence</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.date}</td>
                  <td className="ap-time-cell">{appointment.time}</td>
                  <td className="ap-patient-name">{appointment.patient}</td>
                  <td>
                    <span
                      className={`ap-status-badge ${
                        appointment.status === "Confirmed"
                          ? "ap-status-confirmed"
                          : "ap-status-conflict"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="ap-recurrence-cell">{appointment.recurrence}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#6b7582" }}>
                  No appointments for this day
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
