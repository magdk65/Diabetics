import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar"; // npm install react-calendar
import "react-calendar/dist/Calendar.css";
import "../AppointmentScheduler/AppointmentScheduler.css";
import SidebarCustom from "../SidebarCustom/SidebarCustom";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

const defaultPatients = [
  { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Ali Ahmed", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Maria Smith", avatar: "https://i.pravatar.cc/150?img=4" },
];

export default function AppointmentScheduler() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/patients")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setPatients(res.data);
          setSelectedPatient(res.data[0]);
        } else {
          setPatients(defaultPatients);
          setSelectedPatient(defaultPatients[0]);
        }
      })
      .catch(() => {
        setPatients(defaultPatients);
        setSelectedPatient(defaultPatients[0]);
      });
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleSelectTime = (time) => {
    const dateKey = formatDate(selectedDate);
    const bookedForDay = bookedSlots[dateKey] || [];

    if (bookedForDay.includes(time)) return; 
    setSelectedTime(time);
  };

  const handleScheduleAppointment = () => {
    if (!selectedPatient || !selectedDate || !selectedTime) return alert("اكمل كل الحقول");

    const dateKey = formatDate(selectedDate);
    setBookedSlots((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), selectedTime],
    }));

    alert(
      `تم حجز موعد للمريض ${selectedPatient.name} بتاريخ ${selectedDate.toDateString()} الساعة ${selectedTime}`
    );
    setSelectedTime("");
  };

  return (
    <div className="app-p-container">
      <div className="app-p-main-layout">
        <SidebarCustom/>
        <div className="app-p-main-content">
          <div className="app-p-content-container">
            <h1 className="app-p-page-title">Schedule Appointment</h1>
            <p className="app-p-page-subtitle">
              Select a patient and time to book an appointment
            </p>

            {selectedPatient && (
              <div className="app-p-patient-info-card">
                <img
                  src={selectedPatient.avatar || "/placeholder.svg"}
                  alt={selectedPatient.name}
                  className="app-p-patient-info-avatar"
                />
                <div className="app-p-patient-info-details">
                  <div className="app-p-patient-name">{selectedPatient.name}</div>
                  <div className="app-p-patient-id">ID: {selectedPatient.id}</div>
                </div>
              </div>
            )}

            {/* Calendar */}
            <div className="app-p-section">
              <h2 className="app-p-section-title">Select Date</h2>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
              />
            </div>

            {/* Time Slots */}
            <div className="app-p-section">
              <h2 className="app-p-section-title">Available Times</h2>
              <div className="app-p-time-slots">
                {timeSlots.map((time) => {
                  const booked = bookedSlots[formatDate(selectedDate)]?.includes(time);
                  return (
                    <button
                      key={time}
                      disabled={booked}
                      className={`app-p-time-slot ${
                        selectedTime === time ? "selected" : ""
                      } ${booked ? "disabled" : ""}`}
                      onClick={() => handleSelectTime(time)}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              
            </div>

            <div className="app-p-schedule-button-container">
              <button
                className="app-p-schedule-button"
                disabled={!selectedTime || !selectedPatient}
                onClick={handleScheduleAppointment}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
       <div className="app-p-sidebar">
          <div className="app-p-search-container">
            <input
              type="text"
              placeholder="Search patients"
              className="app-p-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="app-p-patients-list">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`app-p-patient-item ${
                  selectedPatient?.id === patient.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <img
                  src={patient.avatar || "/placeholder.svg"}
                  alt={patient.name}
                  className="app-p-patient-avatar"
                />
                <div className="app-p-patient-info">
                  <div className="app-p-patient-name">{patient.name}</div>
                  <div className="app-p-patient-id">ID: {patient.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
