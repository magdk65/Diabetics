import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import './CoachDashboard.css';
import Sidebar from '../Sidbar/Sidbar';

const CoachDashboard = () => {
  const [overviewData, setOverviewData] = useState({
    totalPatients: 250,
    activePlans: 125,
    avgPlanAdherence: 85,
  });

  const [alerts, setAlerts] = useState([
    { id: 1, text: 'Patients Inactive for 30+ Days', number: 15 },
    { id: 2, text: 'Doctor Notes on Exercise Plans', number: 3 },
  ]);

  const [patientActivities, setPatientActivities] = useState([
    { id: 1, patient: 'Clara Bennett', exercise: 'Walking', duration: '30 minutes', date: '2024-01-15' },
    { id: 2, patient: 'Sophia Bennett', exercise: 'Cycling', duration: '45 minutes', date: '2024-01-14' },
    { id: 3, patient: 'Oliver Hayes', exercise: 'Swimming', duration: '60 minutes', date: '2024-01-13' },
    { id: 4, patient: 'Isabella Thompson', exercise: 'Yoga', duration: '60 minutes', date: '2024-01-12' },
    { id: 5, patient: 'Jackson Reed', exercise: 'Running', duration: '40 minutes', date: '2024-01-11' },
  ]);

  // بيانات الرسم البياني - مثال بيانات أسبوعية
  const lineChartData = [
    { day: 'Mon', adherence: 60 },
    { day: 'Tue', adherence: 75 },
    { day: 'Wed', adherence: 65 },
    { day: 'Thu', adherence: 70 },
    { day: 'Fri', adherence: 80 },
    { day: 'Sat', adherence: 55 },
    { day: 'Sun', adherence: 90 },
  ];

  const [progressData, setProgressData] = useState({
    planAdherenceRate: 85,
    planAdherenceChange: 5,
    activityVsGoals: 75,
    activityChange: -2,
    progressBars: {
      steps: 80,
      distance: 65,
      duration: 70,
    },
  });

  return (
    <div className="coach-das-dashboard-container">
        <Sidebar/>
      <div className="coach-das-main-content">
        <div className="coach-das-content-wrapper">
          {/* Header */}
          <div className="coach-das-header">
            <h1 className="coach-das-main-title">Coach Dashboard</h1>
            <h2 className="coach-das-section-title">Overview</h2>
          </div>

          {/* Overview Cards */}
          <div className="coach-das-overview-cards">
            <div className="coach-das-card">
              <div className="coach-das-card-content">
                <div className="coach-das-card-label">Total Patients</div>
                <div className="coach-das-card-value">{overviewData.totalPatients}</div>
              </div>
            </div>
            <div className="coach-das-card">
              <div className="coach-das-card-content">
                <div className="coach-das-card-label">Patients with Active Plans</div>
                <div className="coach-das-card-value">{overviewData.activePlans}</div>
              </div>
            </div>
            <div className="coach-das-card">
              <div className="coach-das-card-content">
                <div className="coach-das-card-label">Average Plan Adherence</div>
                <div className="coach-das-card-value">{overviewData.avgPlanAdherence}%</div>
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="coach-das-card coach-das-alerts-card">
            <div className="coach-das-card-header">
              <h3 className="coach-das-card-title">Alerts & Notifications</h3>
            </div>
            <div className="coach-das-card-content">
              {alerts.map(alert => (
                <div key={alert.id} className="coach-das-alert-item">
                  <span className="coach-das-alert-text">{alert.text}</span>
                  <span className="coach-das-alert-number">{alert.number}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Patient Activity */}
          <div className="coach-das-card coach-das-activity-card">
            <div className="coach-das-card-header">
              <h3 className="coach-das-card-title">Latest Patient Activity</h3>
            </div>
            <div className="coach-das-card-content">
              <table className="coach-das-activity-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Exercise</th>
                    <th>Duration</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {patientActivities.map(activity => (
                    <tr key={activity.id}>
                      <td className="coach-das-patient-name">{activity.patient}</td>
                      <td className="coach-das-exercise-type">{activity.exercise}</td>
                      <td className="coach-das-duration">{activity.duration}</td>
                      <td className="coach-das-date">{activity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Progress Monitoring Charts */}
          <div className="coach-das-card coach-das-charts-card">
            <div className="coach-das-card-header">
              <h3 className="coach-das-card-title">Progress Monitoring Charts</h3>
            </div>
            <div className="coach-das-card-content">
              <div className="coach-das-charts-grid">
                {/* Plan Adherence Rate */}
                <div className="coach-das-chart-section">
                  <div className="coach-das-chart-header">
                    <h4 className="coach-das-chart-title">Plan Adherence Rate</h4>
                    <div className="coach-das-chart-value">{progressData.planAdherenceRate}%</div>
                    <div className={`coach-das-chart-change ${progressData.planAdherenceChange >= 0 ? 'positive' : 'negative'}`}>
                      Last 7 Days {progressData.planAdherenceChange >= 0 ? '+' : ''}{progressData.planAdherenceChange}%
                    </div>
                  </div>
                  <div style={{ width: '100%', height: 140 }}>
                    <ResponsiveContainer>
                      <LineChart data={lineChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="day" tick={{ fill: '#6b7582', fontSize: 12 }} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="adherence"
                          stroke="#5e91c9"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Activity vs. Goals */}
                <div className="coach-das-chart-section">
                  <div className="coach-das-chart-header">
                    <h4 className="coach-das-chart-title">Activity vs. Goals</h4>
                    <div className="coach-das-chart-value">{progressData.activityVsGoals}%</div>
                    <div className={`coach-das-chart-change ${progressData.activityChange >= 0 ? 'positive' : 'negative'}`}>
                      This Month {progressData.activityChange >= 0 ? '+' : ''}{progressData.activityChange}%
                    </div>
                  </div>
                  <div className="coach-das-progress-bars">
                    {[
                      { label: 'Steps', value: progressData.progressBars.steps, color: '#5e91c9' },
                      { label: 'Distance', value: progressData.progressBars.distance, color: '#757575' },
                      { label: 'Duration', value: progressData.progressBars.duration, color: '#757575' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="coach-das-progress-item">
                        <div className="coach-das-progress-label">{label}</div>
                        <div className="coach-das-progress-bar">
                          <div
                            className="coach-das-progress-fill"
                            style={{ width: `${value}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
