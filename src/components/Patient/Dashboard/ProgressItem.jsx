import React from "react";

const ProgressItem = ({ label, value, current, total }) => (
  <div className="progress-item">
    <div className="progress-header">
      <span className="progress-label">{label}</span>
      <span className="progress-value">
        {total ? `${current} / ${total}` : current}
      </span>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default ProgressItem;
