import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import '../DiabCareAdmin/DiabCareAdmin.css'

const DiabCareAdmin = () => {
  const [tickets, setTickets] = useState([
    {
      id: "#12345",
      subject: "Issue with data sync",
      status: "Open",
      priority: "High",
      createdAt: "2023-08-15"
    },
    {
      id: "#12346",
      subject: "Cannot log in",
      status: "Open",
      priority: "Critical",
      createdAt: "2023-08-16"
    },
    {
      id: "#12347",
      subject: "Feature request",
      status: "Open",
      priority: "Low",
      createdAt: "2023-08-17"
    },
    {
      id: "#12348",
      subject: "App crashes on startup",
      status: "Open",
      priority: "High",
      createdAt: "2023-08-18"
    },
    {
      id: "#12349",
      subject: "Incorrect data display",
      status: "Open",
      priority: "Medium",
      createdAt: "2023-08-19"
    }
  ]);

  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case "Critical":
        return "Admin3-badge-critical";
      case "High":
        return "Admin3-badge-high";
      case "Medium":
        return "Admin3-badge-medium";
      case "Low":
        return "Admin3-badge-low";
      default:
        return "Admin3-badge-default";
    }
  };

  return (
    <div className="Admin3-app-container">
      {/* Header */}
      <div className="Admin3-content-header">
        <h1 className="Admin3-page-title">Support</h1>
      

      <div className="Admin3-table-container">
        <table className="Admin3-tickets-table">
          <thead>
            <tr className="Admin3-table-header-row">
              <th className="Admin3-table-head">Ticket ID</th>
              <th className="Admin3-table-head">Subject</th>
              <th className="Admin3-table-head">Status</th>
              <th className="Admin3-table-head">Priority</th>
              <th className="Admin3-table-head">Created At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className="Admin3-table-row">
                <td className="Admin3-table-cell Admin3-font-medium">{ticket.id}</td>
                <td className="Admin3-table-cell">{ticket.subject}</td>
                <td className="Admin3-table-cell">
                  <span className="Admin3-badge Admin3-badge-status">
                    {ticket.status}
                  </span>
                </td>
                <td className="Admin3-table-cell">
                  <span className={`Admin3-badge ${getPriorityColorClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="Admin3-table-cell">{ticket.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="Admin3-help-button"  
        aria-label="Help"
      >
        <HelpCircle size={24} />
      </button>
    </div>
    </div>
  );
};

export default DiabCareAdmin;
