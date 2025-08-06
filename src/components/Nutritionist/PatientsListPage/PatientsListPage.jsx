import { useState } from "react";
import { Search, Eye, Pencil } from "lucide-react";
import "../PatientsListPage/PatientsListPage.css";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";

// بيانات افتراضية
const patientsData = [
  { id: "1", name: "Ethan Bennett", lastLog: "2 days ago", adherence: "High" },
  { id: "2", name: "Chloe Carter", lastLog: "1 day ago", adherence: "Medium" },
  { id: "3", name: "Liam Harper", lastLog: "3 days ago", adherence: "Low" },
  { id: "4", name: "Ava Thompson", lastLog: "2 days ago", adherence: "High" },
  { id: "5", name: "Noah Walker", lastLog: "1 day ago", adherence: "Medium" },
];

export default function PatientsListPage() {
  const { nutId } = useParams(); 
  const navigate = useNavigate();
  const [patients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) =>
    patient.name
      .toLowerCase()
      .split(" ")
      .some((word) => word.startsWith(searchTerm.toLowerCase()))
  );

  const renderTableRows = () =>
    filteredPatients.map(({ id, name, lastLog, adherence }) => (
      <tr key={id} className="custom-table-row">
        <td className="custom-table-cell">{name}</td>
        <td className="custom-table-cell text-medium-gray">{lastLog}</td>
        <td className="custom-table-cell">
          <span
            className={`adherence-badge ${
              adherence.toLowerCase() === "high"
                ? "high"
                : adherence.toLowerCase() === "medium"
                ? "medium"
                : "low"
            }`}
          >
            {adherence}
          </span>
        </td>
        <td className="custom-table-cell text-sm actions-cell">
          <button
            className="icon-button view"
            onClick={() =>
              navigate(`/nutritionist/${nutId}/patients/${id}`)
            }
          >
            <Eye size={18} />
          </button>
          <button
            className="icon-button edit"
            onClick={() =>
              navigate(`/nutritionist/${nutId}/patients/${id}/modify-plan`)
            }
          >
            <Pencil size={18} />
          </button>
        </td>
      </tr>
    ));

  return (
    <main className="patients-page--list">
      <Sidebar_Nut nutId={nutId} />
      <div className="flex-page-list">
        <h1 className="page-title--list">Patients List</h1>

        {/* Search & Button */}
        <div className="search-section">
          <div className="search-wrapper-1">
            <Search className="search-icon" />
            <input
              type="search"
              placeholder="Search patients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="custom-input"
            />
          </div>
          <button className="custom-button">Plan Adherence</button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="custom-table">
            <thead className="custom-table-header">
              <tr className="custom-table-row">
                <th className="custom-table-head">Patient</th>
                <th className="custom-table-head">Last Food Log</th>
                <th className="custom-table-head">Adherence</th>
                <th className="custom-table-head">Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>

          {filteredPatients.length === 0 && (
            <p className="no-data">No patients found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
