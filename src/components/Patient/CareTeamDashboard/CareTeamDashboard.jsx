import { useState } from "react"
import "./CareTeamDashboard.css"
import img from '../../../assets/img/Depth 6, Frame 0.png'
import Header from "../Dashboard/Header"
import Sidebar from "../Dashboard/Sidebar"
const CareTeamDashboard = () => {
  const [activeTab, setActiveTab] = useState("Appointments")

  const pastAppointments = [
    {
      id: 1,
      name: "Emily Carter",
      role: "Nutritionist",
      date: "2024-01-15",
      avatar: "/Depth 7, Frame 0.png", // ← غيّر المسار حسب صورتك
    },
    {
      id: 2,
      name: "David Lee",
      role: "Coach",
      date: "2023-12-05",
      avatar: "/your-image-2.jpg",
    },
    {
      id: 3,
      name: "Olivia Chen",
      role: "Care Team Member",
      date: "2023-11-20",
      avatar: "/your-image-3.jpg",
    },
  ]

  return (
    <div className="main-content-care1">
        <Header/>
        <div className="flex5">
        <Sidebar/>
      <div className="content-wrapper1">
        
        <h1 className="page-title">Care Team</h1>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "Appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("Appointments")}
          >
            Appointments
          </button>
          <button
            className={`tab ${activeTab === "Contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("Contacts")}
          >
            Contacts
          </button>
        </div>

        {activeTab === "Appointments" && (
          <>
            {/* Upcoming Section */}
            <div className="upcoming-section">
              <h2 className="section-title">Upcoming</h2>

                  <div className="calendar-illustration">
                    <img src="" alt=""/>
                  </div>

                  
                </div>
                
              <div className="body-care">
                  <h3 className="empty-title">No upcoming appointments</h3>
                  <div style={{ width: "42%" }}>
                  <img src={img} alt="" className="img"/>
                  </div>
                  <p className="empty-description">
                    Schedule an appointment with your care team to stay on top of your health.
                  </p>
                  <span>
                    <button className="schedule-btn">Schedule Appointment</button>
                    </span>
                    </div>
            {/* Past Section */}
            <div className="past-section">
              <h2 className="section-title">Past</h2>

              <div className="appointments-list">
                {pastAppointments.map((member) => (
                  <div key={member.id} className="appointment-item">
                    <div className="appointment-info">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="member-avatar"
                        style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                      />
                      <div className="doctor-details">
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                      </div>
                    </div>
                    <div className="appointment-date">{member.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "Contacts" && (
          <div className="contacts-section">
            <h2 className="section-title">Contacts</h2>
            <p className="empty-description">No contacts available yet.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default CareTeamDashboard
