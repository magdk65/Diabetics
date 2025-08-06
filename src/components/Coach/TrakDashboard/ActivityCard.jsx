import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from "recharts";

const ActivityCard = ({ activitySummary, dailyStepsData, goalComparisonData, activityLog }) => {
  return (
    <>
      {/* Activity Summary */}
      <section className="ft-activity-summary">
        <h2 className="ft-section-title">Activity Summary</h2>
        <div className="ft-summary-grid">
          <div className="ft-card">
            <div className="ft-card-content">
              <div className="ft-metric-label">Avg. Daily Steps</div>
              <div className="ft-metric-value">{activitySummary.steps}</div>
            </div>
          </div>
          <div className="ft-card">
            <div className="ft-card-content">
              <div className="ft-metric-label">Goal Completion</div>
              <div className="ft-metric-value">{activitySummary.goalCompletion}%</div>
            </div>
          </div>
          <div className="ft-card">
            <div className="ft-card-content">
              <div className="ft-metric-label">Workouts Completed</div>
              <div className="ft-metric-value">{activitySummary.workouts}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Steps Chart */}
      <section className="ft-daily-steps card">
        <div className="ft-card-header">
          <h2 className="ft-section-title">Daily Steps</h2>
        </div>
        <div className="ft-card-content" style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyStepsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="steps" stroke="#61758a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Goal Comparison + Activity Log */}
      <div className="ft-bottom-grid">
        {/* Goal Comparison */}
        <div className="ft-card">
          <div className="ft-card-header">
            <h2 className="ft-section-title">Goal Comparison</h2>
          </div>
          <div className="ft-card-content" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percent" fill="#61758a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Log */}
        <div className="ft-card">
          <div className="ft-card-header">
            <h2 className="ft-section-title">Activity Log</h2>
          </div>
          <div className="ft-card-content">
            <div className="activity-log">
              {activityLog.map((item, i) => (
                <div key={i} className="ft-activity-item">
                  <div className="ft-activity-icon">🏃</div>
                  <div className="ft-activity-details">
                    <div className="ft-activity-time">{item.time}</div>
                    <div className="ft-activity-type">{item.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
