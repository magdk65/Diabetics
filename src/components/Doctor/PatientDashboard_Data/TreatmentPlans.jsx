import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TreatmentPlans = ({ treatmentPlans }) => {
  const navigate = useNavigate();
  const { doctorId, id } = useParams();

  const handleEdit = (planType ) => {
    let path = '';
    switch (planType) {
      case 'medical':
        path = `/doctor/${doctorId}/patients/${id}/treatment-plan`;
        break;
      case 'nutritional':
        path = `/doctor/${doctorId}/patients/${id}/nutritional-plan`;
        break;
      case 'exercise':
        path = `/doctor/${doctorId}/patients/${id}/exercise-plan`;
        break;
      default:
        path = `/doctor/${doctorId}/patients/${id}`;
    }
    navigate(path);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Treatment Plans</h2>
      </div>

      <div className="card-content-plan">
        <div className="plan-section">
          <h3 className="section-title-ppp2">Medical Plan</h3>
          <p>{treatmentPlans.medical}</p>
          <button className="button-pp" onClick={() => handleEdit('medical')}>
            Edit Medical Plan
          </button>
        </div>

        <div className="plan-section">
          <h3 className="section-title-ppp2">Nutritional Plan</h3>
          <p>{treatmentPlans.nutritional}</p>
          <button className="button-pp" onClick={() => handleEdit('nutritional')}>
            Edit Nutritional Plan
          </button>
        </div>

        <div className="plan-section">
          <h3 className="section-title-ppp2">Exercise Plan</h3>
          <p>{treatmentPlans.exercise}</p>
          <button className="button-pp" onClick={() => handleEdit('exercise')}>
            Edit Exercise Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlans;
