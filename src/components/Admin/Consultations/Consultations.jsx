import React, { useState, useMemo } from 'react';
import './Consultations.css';

function Consultations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [consultations] = useState([
    { id: "#12345", patient: "Liam Harper", specialist: "Dr. Emily Carter", type: "Video", dateTime: "2024-03-15 10:00 AM", status: "Completed", duration: "30 mins" },
    { id: "#12346", patient: "Olivia Bennett", specialist: "Dr. Ethan Clark", type: "Phone", dateTime: "2024-03-16 02:00 PM", status: "Scheduled", duration: "45 mins" },
    { id: "#12347", patient: "Noah Foster", specialist: "Dr. Sophia Green", type: "In-person", dateTime: "2024-03-17 11:30 AM", status: "Completed", duration: "60 mins" },
    { id: "#12348", patient: "Ava Mitchell", specialist: "Dr. Emily Carter", type: "Video", dateTime: "2024-03-18 09:00 AM", status: "Canceled", duration: "30 mins" },
    { id: "#12349", patient: "Lucas Hayes", specialist: "Dr. Ethan Clark", type: "Phone", dateTime: "2024-03-19 03:00 PM", status: "Scheduled", duration: "45 mins" },
    { id: "#12350", patient: "Isabella Reed", specialist: "Dr. Sophia Green", type: "In-person", dateTime: "2024-03-20 10:00 AM", status: "Completed", duration: "60 mins" },
    { id: "#12351", patient: "Owen Parker", specialist: "Dr. Emily Carter", type: "Video", dateTime: "2024-03-21 01:00 PM", status: "Scheduled", duration: "30 mins" },
    { id: "#12352", patient: "Sophia Turner", specialist: "Dr. Ethan Clark", type: "Phone", dateTime: "2024-03-22 04:00 PM", status: "Completed", duration: "45 mins" },
    { id: "#12353", patient: "Jackson Cole", specialist: "Dr. Sophia Green", type: "In-person", dateTime: "2024-03-23 09:30 AM", status: "Scheduled", duration: "60 mins" },
    { id: "#12354", patient: "Mia Brooks", specialist: "Dr. Emily Carter", type: "Video", dateTime: "2024-03-24 12:00 PM", status: "Completed", duration: "30 mins" }
  ]);

  const totalConsultations = consultations.length;
  const completedCount = consultations.filter(c => c.status === "Completed").length;
  const canceledCount = consultations.filter(c => c.status === "Canceled").length;

  const mostActiveSpecialist = useMemo(() => {
    const countMap = {};
    consultations.forEach(c => {
      countMap[c.specialist] = (countMap[c.specialist] || 0) + 1;
    });
    return Object.entries(countMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  }, [consultations]);

  const filteredData = consultations.filter(c => {
    const matchesSearch = c.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.specialist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status) => {
    let className = "admin1-status-badge ";
    switch (status) {
      case "Completed": className += "admin1-status-completed"; break;
      case "Scheduled": className += "admin1-status-scheduled"; break;
      case "Canceled": className += "admin1-status-canceled"; break;
      default: className += "admin1-status-default";
    }
    return <span className={className}>{status}</span>;
  };

  return (
    <div className="admin1-app">

      <div className="admin1-page-header">
        <h1>Consultations</h1>
        <p>Manage and monitor all patient consultations with the care team.</p>
      </div>

      <div className="admin1-search-filters">
        <input 
          type="text" 
          placeholder="Search by patient, specialist, or ID" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          className="admin1-search-input"
        />

        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin1-select"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="scheduled">Scheduled</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="admin1-summary-section">
        <h2>Consultation Summary</h2>
        <div className="admin1-summary-cards">
          <div className="admin1-card"><h3>Total Consultations</h3><div className="admin1-card-number">{totalConsultations}</div></div>
          <div className="admin1-card"><h3>Completed</h3><div className="admin1-card-number">{completedCount}</div></div>
          <div className="admin1-card"><h3>Canceled</h3><div className="admin1-card-number">{canceledCount}</div></div>
          <div className="admin1-card"><h3>Most Active Specialist</h3><div className="admin1-card-specialist">{mostActiveSpecialist}</div></div>
        </div>
      </div>

      <div className="admin1-table-section">
        <h2>All Consultations</h2>
        <table className="admin1-consultations-table">
          <thead>
            <tr>
              <th>Consultation ID</th>
              <th>Patient</th>
              <th>Specialist</th>
              <th>Type</th>
              <th>Date/Time</th>
              <th>Status</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((c) => (
              <tr key={c.id}>
                <td className="admin1-consultation-id">{c.id}</td>
                <td>{c.patient}</td>
                <td>{c.specialist}</td>
                <td>{c.type}</td>
                <td>{c.dateTime}</td>
                <td>{getStatusBadge(c.status)}</td>
                <td>{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="admin1-pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>{'<'}</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i} 
              className={currentPage === i + 1 ? "admin1-pagination-button active" : "admin1-pagination-button"} 
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>{'>'}</button>
        </div>
      </div>
    </div>
  );
}

export default Consultations;
