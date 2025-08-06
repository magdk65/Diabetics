import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpDown, Eye } from "lucide-react";
import "../PatientList/PatientList.css";
import SidebarCustom from "../SidebarCustom/SidebarCustom";

const PatientList = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([
    { id: 1, name: "Sophia Clark", avatar: "/placeholder.svg?height=40&width=40", condition: "Managing hypertension and monitoring cholesterol levels.", metrics: "Blood Sugar: 110 mg/dL, Weight: 145 lbs", lastInteraction: "03/15/2024", status: "Stable" },
    { id: 2, name: "Ethan Bennett", avatar: "/placeholder.svg?height=40&width=40", condition: "Recovering from a recent surgery, attending physical therapy.", metrics: "Activity: 5000 steps/day, Weight: 170 lbs", lastInteraction: "03/20/2024", status: "Good" },
    { id: 3, name: "Olivia Hayes", avatar: "/placeholder.svg?height=40&width=40", condition: "Requires regular check-ups for diabetes management.", metrics: "Blood Sugar: 180 mg/dL, Weight: 160 lbs", lastInteraction: "03/10/2024", status: "Needs Follow-up" },
    { id: 4, name: "Liam Carter", avatar: "/placeholder.svg?height=40&width=40", condition: "Undergoing treatment for a respiratory infection.", metrics: "Activity: 2000 steps/day, Weight: 185 lbs", lastInteraction: "03/18/2024", status: "Stable" },
    { id: 5, name: "Ava Morgan", avatar: "/placeholder.svg?height=40&width=40", condition: "Monitoring heart condition, attending cardiac rehab sessions.", metrics: "Activity: 3500 steps/day, Weight: 150 lbs", lastInteraction: "03/22/2024", status: "Good" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewProfile = (id) => {
    navigate(`/patients/${id}`);
  };

  return (
    <div className="pl-container">
      <main className="pl-main">
        <SidebarCustom />
        <div className="felx-patientlist">
          <div className="pl-header">
            <h1 className="pl-title">Patient List</h1>
            <p className="pl-subtitle">Manage and monitor patient health records and treatment plans.</p>
          </div>

          {/* Search and Filter */}
          <div className="pl-controls">
            <div className="pl-search-wrapper">
              <Search className="pl-search-icon" />
              <input
                type="text"
                placeholder="Search by patient name"
                className="pl-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="pl-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Good">Good</option>
              <option value="Stable">Stable</option>
              <option value="Needs Follow-up">Needs Follow-up</option>
            </select>
          </div>

          {/* Patient Table */}
          <div className="pl-table-wrapper">
            <table className="pl-table">
              <thead>
                <tr>
                  <th className="pl-th">Patient Name <ArrowUpDown className="h-4 w-4" /></th>
                  <th className="pl-th">Condition Overview</th>
                  <th className="pl-th">Key Metrics</th>
                  <th className="pl-th">Last Interaction</th>
                  <th className="pl-th">Status</th>
                  <th className="pl-th">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="pl-row">
                    <td className="pl-patient">
                      <img src={patient.avatar || "/placeholder.svg"} alt={patient.name} className="pl-avatar" />
                      <span className="pl-name">{patient.name}</span>
                    </td>
                    <td className="pl-td">{patient.condition}</td>
                    <td className="pl-td">{patient.metrics}</td>
                    <td className="pl-td">{patient.lastInteraction}</td>
                    <td
                      className={`pl-td pl-status ${
                        patient.status === "Good"
                          ? "pl-status-good"
                          : patient.status === "Stable"
                          ? "pl-status-stable"
                          : "pl-status-followup"
                      }`}
                    >
                      {patient.status}
                    </td>
                    <td className="pl-td pl-action">
                      <button onClick={() => handleViewProfile(patient.id)} className="pl-view-btn" title="View Profile">
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientList;
