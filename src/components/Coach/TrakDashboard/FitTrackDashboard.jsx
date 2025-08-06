import React, { useState, useEffect } from "react";
import '../TrakDashboard/FitTrackDashboard.css'
import ActivityCard from "./ActivityCard";
import Sidebar from "../Sidbar/Sidbar";

const FitTrackDashboard = () => {
  // بيانات المريض من الباك
  const [patient, setPatient] = useState({ name: "Sophia Carter", id: 1 });

  // تبويب نشط
  const [activeTab, setActiveTab] = useState("activity");

  // Activity Summary
  const [activitySummary, setActivitySummary] = useState({
    steps: 0,
    goalCompletion: 0,
    workouts: 0,
  });

  // بيانات الرسوميات
  const [dailyStepsData, setDailyStepsData] = useState([]);
  const [goalComparisonData, setGoalComparisonData] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // ملاحظات
  const [note, setNote] = useState("");

  useEffect(() => {
    // محاكاة جلب البيانات من الباك
    setActivitySummary({
      steps: 7200,
      goalCompletion: 85,
      workouts: 12,
    });

    setDailyStepsData([
      { day: "Mon", steps: 7000 },
      { day: "Tue", steps: 8000 },
      { day: "Wed", steps: 6500 },
      { day: "Thu", steps: 9000 },
      { day: "Fri", steps: 7500 },
      { day: "Sat", steps: 8200 },
      { day: "Sun", steps: 7800 },
    ]);

    setGoalComparisonData([
      { day: "Mon", percent: 85 },
      { day: "Tue", percent: 75 },
      { day: "Wed", percent: 90 },
      { day: "Thu", percent: 70 },
      { day: "Fri", percent: 95 },
      { day: "Sat", percent: 80 },
      { day: "Sun", percent: 88 },
    ]);

    setActivityLog([
      { time: "Today, 7:00 AM", type: "Morning Run" },
      { time: "Yesterday, 6:00 PM", type: "Strength Training" },
      { time: "2 Days Ago, 8:00 AM", type: "Yoga Session" },
    ]);
  }, []);

  const handleModifyPlan = () => {
    window.location.href = `/coach/${patient.id}/modify-plan`; // رابط تعديل الخطة
  };

  return (
    <div className="ft-dashboard">
      <div className="ft-main-content">
        <Sidebar />
        <div className="felx-dashboard-pc">

          {/* Profile Header */}
          <div className="ft-profile-header">
            <h1 className="ft-profile-title">{patient.name}</h1>
            <button className="ft-modify-btn" onClick={handleModifyPlan}>
              Modify Plan
            </button>
          </div>

          {/* Tabs */}
          <div className="ft-tab-nav">
            <button
              className={`ft-tab-btn ${activeTab === "activity" ? "active" : "inactive"}`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>
            <button
              className={`ft-tab-btn ${activeTab === "notes" ? "active" : "inactive"}`}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </button>
            <button
              className={`ft-tab-btn ${activeTab === "messages" ? "active" : "inactive"}`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
          </div>

          {/* محتوى التبويبات */}
          {activeTab === "activity" && (
            <ActivityCard
              activitySummary={activitySummary}
              dailyStepsData={dailyStepsData}
              goalComparisonData={goalComparisonData}
              activityLog={activityLog}
            />
          )}

          {activeTab === "notes" && (
            <div className="ft-card">
              <div className="ft-card-content">
                <h2 className="ft-section-title">Notes for {patient.name}</h2>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your note here..."
                  style={{
                    width: "100%",
                    height: "150px",
                    padding: "12px",
                    border: "1px solid #e5e8eb",
                    borderRadius: "6px",
                    resize: "none",
                    marginTop: "16px",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="ft-card">
              <div className="ft-card-content">
                <h2 className="ft-section-title">Chat with {patient.name}</h2>
                <p style={{ color: "#61758a", marginTop: "12px" }}>
                  Messaging interface placeholder – integrate chat component here.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FitTrackDashboard;
