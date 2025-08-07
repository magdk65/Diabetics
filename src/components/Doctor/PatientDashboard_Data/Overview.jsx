import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Overview = ({ overviewData }) => {
  const {
    sugarLevel,
    sugarChange,
    weight,
    weightChange,
    steps,
    stepsChange,
    sugarChartData,
    weightChartData,
  } = overviewData;

  const activityLabels = ["Activity 1", "Activity 2", "Activity 3", "Activity 4", "Activity 5", "Activity 6", "Activity 7"];

  return (
    <div className="content-wrapper-hh">
      <div className="patient-data-grid">

        {/* Sugar */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Sugar Level</h3>
          </div>
          <div className="card-content">
            <div className="metric-header">
              <div className="metric-value">
                <span className="metric-number">{sugarLevel} mg/dL</span>
                <span className={`badge ${sugarChange >= 0 ? 'positive' : 'negative'}`}>
                  {sugarChange >= 0 ? `+${sugarChange}%` : `${sugarChange}%`}
                </span>
              </div>
              <div className="metric-subtitle">Last 30 Days
                <span className={sugarChange >= 0 ? 'positive-change' : 'negative-change'}>
                  {sugarChange >= 0 ? ` +${sugarChange}%` : ` ${sugarChange}%`}
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={sugarChartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weight */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weight</h3>
          </div>
          <div className="card-content">
            <div className="metric-header">
              <div className="metric-value">
                <span className="metric-number">{weight} lbs</span>
                <span className={`badge ${weightChange >= 0 ? 'positive' : 'negative'}`}>
                  {weightChange >= 0 ? `+${weightChange}%` : `${weightChange}%`}
                </span>
              </div>
              <div className="metric-subtitle">Last 30 Days
                <span className={weightChange >= 0 ? 'positive-change' : 'negative-change'}>
                  {weightChange >= 0 ? ` +${weightChange}%` : ` ${weightChange}%`}
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={weightChartData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Steps / Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Activity</h3>
          </div>
          <div className="card-content">
            <div className="metric-header">
              <div className="metric-value">
                <span className="metric-number">{steps} steps</span>
                <span className={`badge ${stepsChange >= 0 ? 'positive' : 'negative'}`}>
                  {stepsChange >= 0 ? `+${stepsChange}%` : `${stepsChange}%`}
                </span>
              </div>
              <div className="metric-subtitle">Last 30 Days
                <span className={stepsChange >= 0 ? 'positive-change' : 'negative-change'}>
                  {stepsChange >= 0 ? ` +${stepsChange}%` : ` ${stepsChange}%`}
                </span>
              </div>
            </div>
             <ResponsiveContainer width="100%" height={200}>
  <LineChart data={overviewData.stepsChartData}>
    <XAxis 
      dataKey="day"
      angle={-45} 
      textAnchor="end"
      interval={4} // يعرض كل 4 أيام فقط لتفادي التزاحم
    />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="steps" stroke="#82ca9d" strokeWidth={2} dot={false} />
  </LineChart>
</ResponsiveContainer>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;
