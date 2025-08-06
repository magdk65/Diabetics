import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import '../Patients_page/Patients_page.css'
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";
const Patients_page = () => {
  const [activeTab, setActiveTab] = useState("my-plans");
  const [searchTerm, setSearchTerm] = useState("");
  const [dietPlans, setDietPlans] = useState([
    { name: "Weight Loss Plan", patient: "Sarah Miller", status: "Active", lastModified: "2023-08-15" },
    { name: "Diabetes Management", patient: "Robert Johnson", status: "Inactive", lastModified: "2023-07-22" },
    { name: "Heart Healthy Diet", patient: "Emily Davis", status: "Active", lastModified: "2023-09-01" },
  ]);

  // مستقبلياً لو عنا API
  useEffect(() => {
    // fetch("/api/diet-plans")
    //   .then((res) => res.json())
    //   .then((data) => setDietPlans(data))
  }, []);

const filteredPlans = dietPlans.filter((plan) => {
  const search = searchTerm.toLowerCase();

  const matchesWordStart = (text) =>
    text
      .toLowerCase()
      .split(" ") 
      .some((word) => word.startsWith(search)); 

  return matchesWordStart(plan.name) || matchesWordStart(plan.patient);
});
  return (
    <div className="app-container-patient-nut">
      <Sidebar_Nut/>

      {/* Main Content */}
      <div className="main-content-patient-nut">
        <div className="main-header-patient-nut">
          <h1 className="page-title-pa">Diet Plans</h1>
          <button className="new-plan-btn">
            <Plus className="btn-icon" />
            New Plan
          </button>
        </div>

        <div className="content-area">
          <div className="tabs-container-patient-nut">
            <div className="tabs-list">
              <button
                className={`tab-trigger ${activeTab === "my-plans" ? "active" : ""}`}
                onClick={() => setActiveTab("my-plans")}
              >
                My Plans
              </button>
              <button
                className={`tab-trigger ${activeTab === "templates" ? "active" : ""}`}
                onClick={() => setActiveTab("templates")}
              >
                Templates
              </button>
            </div>

            {activeTab === "my-plans" && (
              <div className="tab-content">
                <div className="search-container-p">
                  <div className="search-input-wrapper">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search diet plans"
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-container">
                  <table className="diet-plans-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Patient</th>
                        <th>Status</th>
                        <th>Last Modified</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlans.length > 0 ? (
                        filteredPlans.map((plan, index) => (
                          <tr key={index}>
                            <td className="plan-name">{plan.name}</td>
                            <td className="patient-name">{plan.patient}</td>
                            <td>
                              <span className={`status-badge ${plan.status.toLowerCase()}`}>{plan.status}</span>
                            </td>
                            <td className="last-modified">{plan.lastModified}</td>
                            <td>
                              <button className="view-btn">View</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                            No diet plans found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "templates" && (
              <div className="tab-content">
                <div className="empty-state">Templates content would go here</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients_page;
