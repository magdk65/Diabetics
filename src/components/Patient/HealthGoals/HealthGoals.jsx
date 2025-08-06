import React, { useState } from "react";
import "./HealthGoals.css";
import logo2 from '../../../assets/img/Screenshot_2025-07-05_230814-removebg-preview 1.png';
import logo3 from '../../../assets/img/Depth 4, Frame 0 (1).png'
import logo4 from '../../../assets/img/Depth 4, Frame 1.png';
const HealthGoals = () => {
  const [fastingBloodSugar, setFastingBloodSugar] = useState("80-120");
  const [postMealBloodSugar, setPostMealBloodSugar] = useState("100-140");
  const [dailyActivity, setDailyActivity] = useState("30");
  const [weeklyActivity, setWeeklyActivity] = useState("5");

  const handleSave = () => {
    const goals = {
      fastingBloodSugar,
      postMealBloodSugar,
      dailyActivity,
      weeklyActivity,
    };
    console.log("Saved goals:", goals);
  };

  const GoalInput = ({ label, recommendation, value, onChange }) => (
    <div className="goal-item">
      <p className="recommendation">{recommendation}</p>
      <label className="input-label">{label}</label>
      <div className="input-group">
        <input
          type="text"
          className="goal-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="info-icon">i</div>
      </div>
    </div>
  );

  return (
    <div className="health-goals-container">
      {/* Header */}
      <div className="header">
        <div className="header-image-left">
          <img src={logo2} alt="Left decoration" className="image-contain" />
        </div>
        <div className="header-image-right">
            <nav className="img-right">
                <span><img src={logo3} alt="Left decoration" className="image-contain-right" /></span>
                <span><img src={logo4} alt="Left decoration" className="image-contain-right" /></span>

            </nav>
        </div>
      </div>
            <div className="line-separator"></div>

      {/* Main Content */}
      <div className="main-content-he">
        <div className="header-section">
          <h1 className="main-title">Set Your Health Goals</h1>
          <p className="description">
            Customize your health goals to align with your personal needs and preferences. These goals will help you stay on track and manage your diabetes effectively.
          </p>
        </div>

        <div className="goals-sections">
          {/* Blood Sugar Goals */}
          <div className="goal-section">
            <h2 className="section-title">Blood Sugar Goals</h2>
            <GoalInput
              label="Target Fasting Blood Sugar (mg/dL)"
              recommendation="Recommended fasting blood sugar: 80-120 mg/dL"
              value={fastingBloodSugar}
              onChange={setFastingBloodSugar}
            />
            <GoalInput
              label="Target Post-Meal Blood Sugar (mg/dL)"
              recommendation="Recommended post-meal blood sugar: 100-140 mg/dL"
              value={postMealBloodSugar}
              onChange={setPostMealBloodSugar}
            />
          </div>

          {/* Physical Activity Goals */}
          <div className="goal-section">
            <h2 className="section-title">Physical Activity Goals</h2>
            <GoalInput
              label="Daily Activity Goal (minutes)"
              recommendation="Recommended daily activity: 30 minutes"
              value={dailyActivity}
              onChange={setDailyActivity}
            />
            <GoalInput
              label="Weekly Activity Goal (days)"
              recommendation="Recommended weekly activity: 5 days"
              value={weeklyActivity}
              onChange={setWeeklyActivity}
            />
          </div>
        </div>

        {/* Save Button */}
        <button className="save-button" onClick={handleSave}>
          Save Goals
        </button>
      </div>    
    </div>
  );
};

export default HealthGoals;
