import React from 'react';

const TreatmentPlans = ({ treatmentPlans }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Treatment Plans</h2>
      </div>

      <div className="card-content-plan">
        <div className="plan-section">
          <h3 className="section-title">Medical Plan</h3>
          <p>{treatmentPlans.medical}</p>
          <button className="button">Edit Medical Plan</button>
        </div>

        <div className="plan-section">
          <h3 className="section-title">Nutritional Plan</h3>
          <p>{treatmentPlans.nutritional}</p>
          <button className="button">Edit Nutritional Plan</button>
        </div>

        <div className="plan-section">
          <h3 className="section-title">Exercise Plan</h3>
          <p>{treatmentPlans.exercise}</p>
          <button className="button">Edit Exercise Plan</button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlans;
