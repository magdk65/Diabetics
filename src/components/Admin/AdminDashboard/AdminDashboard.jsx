import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import '../AdminDashboard/AdminDashboard.css'
const AdminDashboard = () => {
  const [stats] = useState({
    newUsers: {
      percentage: 15,
      chart: [
        { day: "Mon", value: 12 },
        { day: "Tue", value: 18 },
        { day: "Wed", value: 14 },
        { day: "Thu", value: 20 },
        { day: "Fri", value: 16 },
        { day: "Sat", value: 22 },
        { day: "Sun", value: 19 },
      ],
    },
    userActivity: {
      percentage: 8,
      chart: [
        { day: "Mon", value: 65 },
        { day: "Tue", value: 45 },
        { day: "Wed", value: 55 },
        { day: "Thu", value: 35 },
        { day: "Fri", value: 75 },
        { day: "Sat", value: 40 },
        { day: "Sun", value: 60 },
      ],
    },
    totalUsers: { value: 1250, change: 10 },
    activeUsers: { value: 980, change: 5 },
    averageEngagement: { value: "4.5 hours", change: 3 },
  });

  const [activityData] = useState([
    { user: "Sophia Clark", activity: "Logged food intake", timestamp: "2025-08-08T10:30:00" },
    { user: "Ethan Miller", activity: "Checked blood sugar", timestamp: "2025-08-08T09:15:00" },
    { user: "Olivia Davis", activity: "Completed exercise", timestamp: "2025-08-07T18:45:00" },
    { user: "Liam Wilson", activity: "Reviewed health report", timestamp: "2025-08-06T14:20:00" },
    { user: "Ava Thompson", activity: "Set medication reminder", timestamp: "2025-08-05T11:00:00" },
    { user: "Noah Brown", activity: "Logged water intake", timestamp: "2025-08-02T08:15:00" },
    { user: "Mia Johnson", activity: "Completed exercise", timestamp: "2025-07-30T17:30:00" },
  ]);

  const [filterDate, setFilterDate] = useState("");

  const getStartDate = (filter) => {
    const now = new Date();
    if (!filter) return null;
    if (filter === "today") return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (filter === "week") {
      const start = new Date(now);
      start.setDate(now.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return start;
    }
    if (filter === "month") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
      return start;
    }
    return null;
  };

  const filteredActivity = useMemo(() => {
    const start = getStartDate(filterDate);
    if (!start) return activityData.slice();
    return activityData.filter((item) => new Date(item.timestamp) >= start);
  }, [activityData, filterDate]);

  const formatChange = (val) => (val > 0 ? `+${val}%` : `${val}%`);

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-main-title">Admin Dashboard</h1>
        </div>

        <div className="admin-statistics-section">
          <h2 className="admin-section-title">Statistics</h2>

          <div className="admin-main-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">New Users</h3>
              </div>
              <div className="admin-card-content">
                <div className="admin-stat-value">{`${stats.newUsers.percentage}%`}</div>
                <div className="admin-stat-meta">
                  <span className="admin-stat-period">Last 30 Days</span>
                  <span className="admin-stat-change positive">{`${stats.newUsers.percentage}%`}</span>
                </div>
                <div className="admin-chart-container" style={{ width: "100%", height: 120 }}>
                  <ResponsiveContainer>
                    <LineChart data={stats.newUsers.chart}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#61758a" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">User Activity</h3>
              </div>
              <div className="admin-card-content">
                <div className="admin-stat-value">{`${stats.userActivity.percentage}%`}</div>
                <div className="admin-stat-meta">
                  <span className="admin-stat-period">Last 7 Days</span>
                  <span className="admin-stat-change positive">{`${stats.userActivity.percentage}%`}</span>
                </div>
                <div className="admin-bar-chart-container" style={{ width: "100%", height: 120 }}>
                  <ResponsiveContainer>
                    <BarChart data={stats.userActivity.chart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-metric-cards-grid">
            <div className="admin-metric-card">
              <div className="admin-metric-label">Total Users</div>
              <div className="admin-metric-value">{stats.totalUsers.value.toLocaleString()}</div>
              <div className="admin-metric-change positive">{formatChange(stats.totalUsers.change)}</div>
            </div>

            <div className="admin-metric-card">
              <div className="admin-metric-label">Active Users</div>
              <div className="admin-metric-value">{stats.activeUsers.value.toLocaleString()}</div>
              <div className="admin-metric-change positive">{formatChange(stats.activeUsers.change)}</div>
            </div>

            <div className="admin-metric-card">
              <div className="admin-metric-label">Average Engagement</div>
              <div className="admin-metric-value">{stats.averageEngagement.value}</div>
              <div className="admin-metric-change positive">{formatChange(stats.averageEngagement.change)}</div>
            </div>
          </div>
        </div>

        <div className="admin-activity-log-section">
          <h2 className="admin-section-title">Activity Log</h2>

          <div className="admin-filters">
            <select
              className="admin-filter-select"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="">All</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="admin-table-container">
            <table className="admin-activity-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivity.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "12px" }}>
                      لا توجد سجلات لعرضها
                    </td>
                  </tr>
                ) : (
                  filteredActivity.map((item, idx) => (
                    <tr key={idx}>
                      <td className="admin-user-name">{item.user}</td>
                      <td className="admin-activity-desc">{item.activity}</td>
                      <td className="admin-timestamp">
                        {new Date(item.timestamp).toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
