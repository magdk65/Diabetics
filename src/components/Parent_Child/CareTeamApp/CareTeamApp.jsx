"use client";

import React, { useState, useEffect } from "react";
import { FiMessageSquare, FiPhone, FiChevronRight, FiHeart } from "react-icons/fi";
import "../CareTeamApp/CareTeamApp.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidbar/Sidbar";

const CareTeamApp = () => {
  const [careTeam, setCareTeam] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Endocrinologist",
      avatar: "/placeholder.svg?height=60&width=60",
      phone: "+123456789",
    },
    {
      id: 2,
      name: "Dr. Sarah Smith",
      specialty: "Nutritionist",
      avatar: "/placeholder.svg?height=60&width=60",
      phone: "+987654321",
    },
    {
      id: 3,
      name: "Dr. magd kouli",
      specialty: "Coach",
      avatar: "/placeholder.svg?height=60&width=60",
      phone: "+987654321",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareTeam = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/care-team", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        if (data && data.length > 0) {
          setCareTeam(data);
        }
      } catch (error) {
        console.error("Failed to fetch care team:", error);
      }
    };

    fetchCareTeam();
  }, []);

  const handleCall = (phone) => {
    if (phone) {
      alert(`Please call: ${phone}`);
    } else {
      alert("Phone number not available");
    }
  };

  const handleChat = (doctorId) => {
    navigate(`/chat/${doctorId}`);
  };

  // زر طلب موعد يحول إلى صفحة الطلب مع تمرير ID الدكتور
  const handleRequestAppointment = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  return (
    <div className="care-team-page">
      <Sidebar />
      <div className="flex-care-team-t">
        <h1 className="care-team-title">My Care Team</h1>

        <div className="care-team-cards">
          {careTeam.length === 0 ? (
            <p className="care-team-empty">No doctors assigned yet.</p>
          ) : (
            careTeam.map((member) => (
              <div key={member.id} className="doctor-card">
                <div className="doctor-info">
                  <div className="doctor-avatar">
                    <img
                      src={member.avatar || "/placeholder.svg?height=60&width=60"}
                      alt={member.name || "Doctor"}
                    />
                  </div>
                  <div className="doctor-details">
                    <h3>{member.name || "Unnamed Doctor"}</h3>
                    <p>{member.specialty || "General Physician"}</p>
                  </div>
                </div>

                <div className="doctor-actions">
                  <button
                    className="doctor-btn chat-btn"
                    onClick={() => handleChat(member.id)}
                  >
                    <FiMessageSquare /> Chat
                  </button>
                  <button
                    className="doctor-btn call-btn"
                    onClick={() => handleCall(member.phone)}
                  >
                    <FiPhone /> Call
                  </button>
                  <button
                    className="doctor-btn appointment-btn"
                    onClick={() => handleRequestAppointment(member.id)}
                  >
                    Request Appointment
                  </button>
                  <FiChevronRight className="arrow-icon" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Emergency Contact */}
        <button className="emergency-btn">
          <FiHeart /> Emergency Contact
        </button>
      </div>
    </div>
  );
};

export default CareTeamApp;
