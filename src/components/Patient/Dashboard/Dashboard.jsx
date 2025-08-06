"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ScheduleItem from "./ScheduleItem";
import ProgressItem from "./ProgressItem";

import "./Dashboard.css";

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState("");

  const scheduleItems = [
    { iconName: "PillIcon", task: "Take Metformin", time: "8:00 AM" },
    { iconName: "DropletIcon", task: "Check Blood Sugar", time: "9:00 AM" },
    { iconName: "CalendarIcon", task: "Consultation with Dr. Ramirez", time: "11:00 AM" },
  ];

  const progressData = [
    { label: "Steps", value: 75, current: "7,500", total: "10,000" },
    { label: "Water Intake", value: 50, current: "1.5L", total: "3L" },
    { label: "Meal Adherence", value: 90, current: "90%", total: "" },
  ];

  const moodOptions = ["Happy", "Neutral", "Stressed", "Sad"];

  return (
    <div className="dashboard">
      <Header />

      <div className="layout">
        {/* Sidebar لا يحتاج بيانات من هنا، كل شيء في Sidebar.jsx */}
        <Sidebar />

        <main className="main-content1">
          <div className="content-wrapper1">
            <div className="page-header1">
              <h1 className="page-title">Overview</h1>
              <p className="welcome-text">Welcome back, Amelia</p>
            </div>

            {/* Latest Reading */}
            <section className="section">
              <h2 className="section-title">Latest Reading</h2>
              <div className="reading-container">
                <div className="glucose-meter">
                  <img
                    src="/placeholder.svg?height=120&width=120&text=Glucose+Meter"
                    alt="Glucose meter showing 120 mg/dL"
                    className="meter-image"
                  />
                </div>
                <div className="reading-info">
                  <div className="reading-value">120 mg/dL</div>
                  <div className="reading-status">Normal</div>
                  <div className="reading-time">Last checked 2 hours ago</div>
                </div>
              </div>
            </section>

            {/* Today's Schedule */}
            <section className="section">
              <h2 className="section-title">Today's Schedule</h2>
              <div className="schedule-list">
                {scheduleItems.map((item, idx) => (
                  <ScheduleItem key={idx} {...item} />
                ))}
              </div>
            </section>

            {/* Progress */}
            <section className="section">
              <h2 className="section-title">Progress</h2>
              <div className="progress-list">
                {progressData.map((item, idx) => (
                  <ProgressItem key={idx} {...item} />
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="section">
              <h2 className="section-title">Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-button">Log Sugar</button>
                <button className="action-button">Log Meal</button>
                <button className="action-button">Consultation</button>
                <button className="action-button">Emergency Button</button>
              </div>
            </section>

            {/* Mood */}
            <section className="section">
              <h2 className="section-title">Mood</h2>
              <div className="mood-buttons">
                {moodOptions.map((mood) => (
                  <button
                    key={mood}
                    className={`mood-button ${selectedMood === mood ? "selected" : ""}`}
                    onClick={() => setSelectedMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
