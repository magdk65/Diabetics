import { useState, useEffect } from "react"
import {
  FaUsers,
  FaCalendarAlt,
  FaRegCommentDots,
  FaCog,
  FaQuestionCircle,
  FaSearch,
  FaChartBar,
} from "react-icons/fa"
import SidebarCustom from "../SidebarCustom/SidebarCustom"
import './PatientDashboard_Doctor.css';

const PatientDashboard_Doctor = () => {
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchPatients = async () => {
      const data = [
        { name: "Layla", bloodSugar: "120 mg/dL", medication: "Metformin", dietPlan: "Moderate Carbs", lastVisit: "3 hours ago" },
        { name: "Khalid", bloodSugar: "180 mg/dL", medication: "Insulin", dietPlan: "Low Carbs", lastVisit: "1 hour ago" },
        { name: "Nora", bloodSugar: "90 mg/dL", medication: "Gliclazide", dietPlan: "Balanced", lastVisit: "5 hours ago" },
        { name: "Abdullah", bloodSugar: "150 mg/dL", medication: "Sitagliptin", dietPlan: "Moderate Carbs", lastVisit: "2 hours ago" },
        { name: "Fatima", bloodSugar: "110 mg/dL", medication: "Dapagliflozin", dietPlan: "Balanced", lastVisit: "4 hours ago" },
      ]
      setPatients(data)
    }

    fetchPatients()
  }, [])

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard-container--d">
      <div className="main-content--d">
        <SidebarCustom/>
        <div className="body-flex11">
        <div className="header--d">
          <h1 className="page-title--d">Patients</h1>
          <button className="add-button--d">Add Patient</button>
        </div>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a patient..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab-button active">All</button>
          <button className="tab-button">Favorites</button>
        </div>

        {/* جدول المرضى */}
        <div className="table-card">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Blood Sugar Level</th>
                <th>Medications</th>
                <th>Diet Plan</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell ">{patient.name}</td>
                  <td className="table-cell">{patient.bloodSugar}</td>
                  <td className="table-cell">{patient.medication}</td>
                  <td className="table-cell">{patient.dietPlan}</td>
                  <td className="table-cell">{patient.lastVisit}</td>
                  <td className="table-cell">
                    <button className="view-button">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard_Doctor
