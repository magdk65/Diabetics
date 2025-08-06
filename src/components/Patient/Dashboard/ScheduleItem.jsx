import React from "react";

const ScheduleItem = ({ icon, task, time }) => (
  <div className="schedule-item">
    <div className="schedule-icon">{icon}</div>
    <div className="schedule-details">
      <div className="schedule-task">{task}</div>
      <div className="schedule-time">{time}</div>
    </div>
  </div>
);

export default ScheduleItem;
