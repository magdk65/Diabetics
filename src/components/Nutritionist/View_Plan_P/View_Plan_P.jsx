"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import "../View_Plan_P/View_Plan_P.css";
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";

const View_Plan_P = () => {
  // بيانات المرضى (ممكن تربطها مع API لاحقاً)
  const [patients] = useState([
    {
      id: "1",
      name: "Sophia Carter",
      status: "Active",
      plan: "Weight Loss",
      lastActivity: "2 days ago",
    },
    {
      id: "2",
      name: "Ethan Bennett",
      status: "Inactive",
      plan: "Muscle Gain",
      lastActivity: "1 week ago",
    },
    {
      id: "3",
      name: "Olivia Hayes",
      status: "Active",
      plan: "Diabetes Management",
      lastActivity: "3 days ago",
    },
    {
      id: "4",
      name: "Liam Foster",
      status: "Active",
      plan: "Heart Health",
      lastActivity: "1 day ago",
    },
    {
      id: "5",
      name: "Ava Morgan",
      status: "Inactive",
      plan: "General Wellness",
      lastActivity: "2 weeks ago",
    },
  ]);

  // الحالة الحالية للفلاتر
  const [filterStatus, setFilterStatus] = useState("All");

  // المرضى بعد الفلترة
  const filteredPatients =
    filterStatus === "All"
      ? patients
      : patients.filter((p) => p.status === filterStatus);

  // أيقونات SVG
  const SearchIcon = () => (
    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );

  const ChevronDown = () => (
    <svg className="chevron-down" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
    </svg>
  );

  return (
    <div className="dashboard--view">
      <Sidebar_Nut />
      <main className="main-content--view">
        <div className="header--view">
          <h1 className="page-title--view">Patients</h1>
          <button className="add-patient-btn">Add Patient</button>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="patient-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search patients" className="patient-search" />
          </div>

          <div className="filters">
            <button
              className={`filter-btn ${filterStatus === "All" ? "active" : ""}`}
              onClick={() => setFilterStatus("All")}
            >
              All <ChevronDown />
            </button>
            <button
              className={`filter-btn ${filterStatus === "Active" ? "active" : ""}`}
              onClick={() => setFilterStatus("Active")}
            >
              Active <ChevronDown />
            </button>
            <button
              className={`filter-btn ${filterStatus === "Inactive" ? "active" : ""}`}
              onClick={() => setFilterStatus("Inactive")}
            >
              Inactive <ChevronDown />
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="table-container">
          <div className="table-header">
            <div>Name</div>
            <div>Status</div>
            <div>Plan</div>
            <div>Last Activity</div>
            <div>Actions</div>
          </div>

          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <div key={patient.id || index} className="table-row">
                <div className="patient-name">{patient.name}</div>
                <div>
                  <span
                    className={`status-badge ${
                      patient.status === "Active" ? "status-active" : "status-inactive"
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
                <div className="plan-text">{patient.plan}</div>
                <div className="activity-text">{patient.lastActivity}</div>
                <div>
                  <Link to={`/patients/${patient.id}`} className="view-btn">
                    View
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="table-row">
              <div className="patient-name">No patients found</div>
            </div>
          )}
        </div>
      </main>


    </div>
  );
};

export default View_Plan_P;
