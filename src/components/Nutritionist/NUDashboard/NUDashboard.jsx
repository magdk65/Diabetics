import React, { useState, useMemo } from "react";
import { UserPlus, Calendar, FileText } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import '../NUDashboard/NUDashboard.css'
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";

export default function NU_NDashboard() {
  const [graphData, setGraphData] = useState([
    { week: "Week 1", value: 80 },
    { week: "Week 2", value: 40 },
    { week: "Week 3", value: 60 },
    { week: "Week 4", value: 20 },
  ]);

  const [appointments, setAppointments] = useState([
    { client: "Sophia Bennett", date: "July 15, 2024", time: "10:00 AM", type: "Initial Consultation" },
    { client: "Ethan Carter", date: "July 16, 2024", time: "2:00 PM", type: "Follow-up" },
    { client: "Olivia Davis", date: "July 18, 2024", time: "11:00 AM", type: "Meal Plan Review" },
  ]);

  const [activities, setActivities] = useState([
    { icon: <UserPlus className="NU_N-activity-icon" />, text: "New client, Sophia Bennett, signed up", date: "July 10, 2024" },
    { icon: <FileText className="NU_N-activity-icon" />, text: "Meal plan created for Ethan Carter", date: "July 9, 2024" },
    { icon: <Calendar className="NU_N-activity-icon" />, text: "Follow-up appointment scheduled with Olivia Davis", date: "July 8, 2024" },
  ]);

  // حساب التغير والنسبة
  const { weightChange, percentageChange } = useMemo(() => {
    if (graphData.length < 2) return { weightChange: 0, percentageChange: 0 };

    const firstValue = graphData[0].value;
    const lastValue = graphData[graphData.length - 1].value;

    const change = lastValue - firstValue; // ممكن يكون موجب أو سالب
    const percentage = ((change / firstValue) * 100).toFixed(1);

    return { weightChange: change, percentageChange: percentage };
  }, [graphData]);

  return (
    <div className="NU_N-dashboard-container">
      <main className="NU_N-main-content">
        <Sidebar_Nut/>
        <div className="flex-nu-main">
          <h1 className="NU_N-main-title">NU_N Dashboard</h1>

          <section className="NU_N-section-block">
            <h2 className="NU_N-section-title">Patient Progress</h2>
            <div className="NU_N-card NU_N-patient-progress-card">
              <div className="NU_N-card-title">Weight Loss Progress</div>
              <div className="NU_N-progress-summary">
                <span className="NU_N-progress-value">
                  {weightChange} lbs
                </span>
                <span className="NU_N-progress-period">Last 30 Days</span>
                <span className="NU_N-progress-percentage">
                  {percentageChange}%
                </span>
              </div>

              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer>
                  <LineChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e8eb" />
                    <XAxis dataKey="week" stroke="#6b7582" />
                    <YAxis stroke="#6b7582" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#6b7582" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="NU_N-section-block">
            <h2 className="NU_N-section-title">Upcoming Appointments</h2>
            <div className="NU_N-card NU_N-appointments-card">
              <table className="NU_N-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app, idx) => (
                    <tr key={idx}>
                      <td>{app.client}</td>
                      <td>{app.date}</td>
                      <td>{app.time}</td>
                      <td>
                        <span className="NU_N-badge">{app.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="NU_N-section-title">Recent Activity</h2>
            <div className="NU_N-activity-list">
              {activities.map((act, idx) => (
                <div className="NU_N-activity-item" key={idx}>
                  {act.icon}
                  <div>
                    <div className="NU_N-activity-text">{act.text}</div>
                    <div className="NU_N-activity-date">{act.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
