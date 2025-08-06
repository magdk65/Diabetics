import React, { useState } from "react";
import "../HealthDashboard/HealthDashboard.css";
import Sidebar from "../Sidbar/Sidbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HealthDashboard = () => {
  const [activeItem, setActiveItem] = useState("Overview");

  // 🔹 بيانات القياسات اليومية (عدد قياسات مختلف لكل يوم)
  const rawBloodSugarData = [
    { day: "Mon", readings: [100, 110, 105] },
    { day: "Tue", readings: [90, 120, 115, 130] },
    { day: "Wed", readings: [95, 100] },
    { day: "Thu", readings: [105, 110, 120] },
    { day: "Fri", readings: [100, 130, 125, 140] },
    { day: "Sat", readings: [110] },
    { day: "Sun", readings: [95, 105, 115] },
  ];

  // 🔹 تحويل البيانات إلى متوسط يومي
  const chartData = rawBloodSugarData.map((dayData) => {
    const sum = dayData.readings.reduce((a, b) => a + b, 0);
    const avg = sum / dayData.readings.length;
    return { day: dayData.day, value: avg };
  });

  // 🔹 حساب المتوسط العام
  const allReadings = rawBloodSugarData.flatMap((d) => d.readings);
  const averageBloodSugar =
    allReadings.reduce((sum, val) => sum + val, 0) / allReadings.length;

  const [medications] = useState([
    { name: "Insulin", dosage: "10 units" },
    { name: "Metformin", dosage: "500 mg" },
  ]);

  const [meals] = useState([
    { name: "Breakfast: Oatmeal with berries", carbs: "45g" },
    { name: "Lunch: Chicken salad sandwich", carbs: "60g" },
    { name: "Dinner: Salmon with quinoa", carbs: "50g" },
  ]);

  const [activities] = useState([
    { name: "Soccer practice", duration: "30 minutes", icon: "⚽" },
    { name: "Bike ride", duration: "45 minutes", icon: "🚴" },
  ]);

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="main-content">
        <h1 className="page-title">Child's Health Overview</h1>

        {/* Blood Sugar Readings */}
        <div className="section">
          <h2 className="section-title">Blood Sugar Readings</h2>
          <div className="card">
            <div className="card-content">
              <div className="blood-sugar-header">
                <h3 className="metric-label">Blood Sugar Levels</h3>
                <div className="metric-value-container">
                  <span className="metric-value">
                    {averageBloodSugar.toFixed(1)} mg/dL
                  </span>
                  <div className="metric-trend">
                    <span className="trend-label">Last 7 Days</span>
                    <span className="trend-badge">
                      {(
                        ((allReadings[allReadings.length - 1] - allReadings[0]) /
                          allReadings[0]) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="chart-container" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={chartData}
                    margin={{ top: 50, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid stroke="#e3dede" strokeDasharray="3 3" />
                    <XAxis dataKey="day" stroke="#82666b" />
                    <YAxis stroke="#82666b" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#82666b"
                      strokeWidth={2}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Medication */}
        <div className="section">
          <h2 className="section-title">Medication</h2>
          {medications.map((med, index) => (
            <div className="info-item" key={index}>
              <div className="info-icon medication-icon">💊</div>
              <div className="info-content">
                <p className="info-title">Dosage: {med.dosage}</p>
                <p className="info-subtitle">{med.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Meals */}
        <div className="section">
          <h2 className="section-title">Meals</h2>
          <div className="info-list">
            {meals.map((meal, index) => (
              <div className="info-item" key={index}>
                <div className="info-icon meal-icon">🍽️</div>
                <div className="info-content">
                  <p className="info-title">{meal.name}</p>
                  <p className="info-subtitle">Carbs: {meal.carbs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="section">
          <h2 className="section-title">Activity Log</h2>
          <div className="info-list">
            {activities.map((act, index) => (
              <div className="info-item" key={index}>
                <div className="info-icon activity-icon">{act.icon}</div>
                <div className="info-content">
                  <p className="info-title">{act.name}</p>
                  <p className="info-subtitle">Duration: {act.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;
