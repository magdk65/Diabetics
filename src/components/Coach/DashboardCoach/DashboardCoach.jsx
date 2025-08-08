import React, { useState, useEffect } from "react";
import { Eye, Edit3 } from "lucide-react"; // icons
import { Link } from "react-router-dom"; // استيراد Link
import '../CoachDashboard/CoachDashboard.css'
const DashboardCoach = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // مثال بيانات من الباك
    const fetchedPatients = [
      { id: 1, name: "Clara Bennett", lastActivity: "10/26/2024, 2:30 PM", adherence: "Adherent" },
      { id: 2, name: "Owen Carter", lastActivity: "10/25/2024, 11:15 AM", adherence: "Non-Adherent" },
      { id: 3, name: "Emma Foster", lastActivity: "10/26/2024, 9:45 AM", adherence: "Adherent" },
      { id: 4, name: "Noah Hughes", lastActivity: "10/24/2024, 4:00 PM", adherence: "Non-Adherent" },
      { id: 5, name: "Ava Jenkins", lastActivity: "10/26/2024, 1:00 PM", adherence: "Adherent" },
    ];
    setPatients(fetchedPatients);
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" || patient.adherence.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // نفترض أن لديك id الكوتش
  const CoachId = 101;

  return (
    <div className="coach-dashboard-container">
      <div className="coach-main-content">
        <h1 className="coach-page-title">Patients</h1>

        {/* Search and Filter */}
        <div className="coach-search-filters">
          <div className="coach-search-container">
            <input
              type="text"
              placeholder="Search by name"
              className="coach-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="coach-filter-container">
            <select
              className="coach-filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Adherent">Adherent</option>
              <option value="Non-Adherent">Non-Adherent</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="coach-table-container">
          <table className="coach-patients-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Last Recorded Activity</th>
                <th>Adherence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="coach-patient-name">{patient.name}</td>
                  <td className="coach-last-activity">{patient.lastActivity}</td>
                  <td>
                    <span
                      className={`coach-adherence-badge ${
                        patient.adherence === "Adherent" ? "coach-adherent" : "coach-non-adherent"
                      }`}
                    >
                      {patient.adherence}
                    </span>
                  </td>
                  <td>
                    <div className="coach-actions">
                      {/* View Patient Profile */}
                      <Link
                        to={`/coach/${coachId}/patient/${patient.id}/view`}
                        className="coach-icon-btn"
                        title="View Profile"
                      >
                        <Eye size={18} />
                      </Link>

                      {/* Edit Exercise Plan */}
                      <Link
                        to={`/coach/${CoachId}/patient/${patient.id}/edit`}
                        className="coach-icon-btn"
                        title="Modify Exercise Plan"
                      >
                        <Edit3 size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <div style={{ padding: "20px", textAlign: "center", color: "#6b7582" }}>
              No patients found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCoach;
