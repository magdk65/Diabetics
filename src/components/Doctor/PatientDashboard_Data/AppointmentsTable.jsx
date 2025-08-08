import React from "react";

const AppointmentsTable = ({ appointments }) => {
  return (
    <div className="apptable-card">
      <div className="apptable-title">Upcoming &amp; Past</div>
      <div className="apptable-tableWrap">
        <table className="apptable-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Status</th>
              <th className="apptable-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.type}</td>
                <td>
                  <span className={`apptable-pill ${r.status === "Scheduled" ? "apptable-pillDark" : "apptable-pillMuted"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="apptable-right">
                  {r.status === "Scheduled" ? (
                    <button className="apptable-linkBtn">Reschedule/Cancel</button>
                  ) : (
                    <span className="apptable-muted">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
