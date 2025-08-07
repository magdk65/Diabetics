import React, { useEffect, useState } from 'react';
import '../NutritionalPlan/NutritionalPlan.css';
import SidebarCustom from '../SidebarCustom/SidebarCustom';

const NutritionalPlan = () => {
  const [patientName, setPatientName] = useState('');
  const [nutritionistName, setNutritionistName] = useState('');
  const [lastModified, setLastModified] = useState('');
  const [meals, setMeals] = useState([]);
  const [note, setNote] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = {
        patient: 'Amelia Harper',
        nutritionist: 'Dr. Olivia Bennett',
        lastModified: 'March 15, 2024',
        meals: [
          { meal: 'Breakfast', food: 'Oatmeal with berries and nuts', quantity: '1 cup' },
          { meal: 'Lunch', food: 'Grilled chicken salad with mixed greens', quantity: '1 serving' },
          { meal: 'Dinner', food: 'Baked salmon with roasted vegetables', quantity: '1 serving' },
          { meal: 'Snacks', food: 'Greek yogurt with fruit', quantity: '1 cup' }
        ],
        note: 'Stay hydrated, eat mindfully, and consult with your nutritionist for personalized advice.',
        comments: [
          {
            author: 'Dr. Olivia Bennett',
            avatar: '/professional-woman-doctor.png',
            date: 'March 15, 2024',
            text: 'Initial plan created based on patient\'s dietary needs and preferences.'
          },
          {
            author: 'Dr. Ethan Carter',
            avatar: '/professional-man-doctor.png',
            date: 'March 16, 2024',
            text: 'Looks good, Olivia. I\'ve added a note about adjusting the protein intake slightly.'
          }
        ]
      };

      setPatientName(response.patient);
      setNutritionistName(response.nutritionist);
      setLastModified(response.lastModified);
      setMeals(response.meals);
      setNote(response.note);
      setComments(response.comments);
    };

    fetchData();
  }, []);

  return (
    <div className="plan-nut-container">
        <SidebarCustom/>
      <div className="plan-nut-content">
        <div className="plan-nut-header">
          <h1 className="plan-nut-title">Modify Nutritional Plan</h1>
          <p className="plan-nut-patient-info">Patient: {patientName}</p>
        </div>

        <div className="plan-nut-section">
          <h2 className="plan-nut-section-title">Plan Details</h2>
          <div className="plan-nut-details-grid">
            <div className="plan-nut-detail-item">
              <p className="plan-nut-detail-label">Nutritionist</p>
              <p className="plan-nut-detail-value">{nutritionistName}</p>
            </div>
            <div className="plan-nut-detail-item">
              <p className="plan-nut-detail-label">Last Modified</p>
              <p className="plan-nut-detail-value">{lastModified}</p>
            </div>
          </div>
        </div>

        <div className="plan-nut-section">
          <h2 className="plan-nut-section-title">Meal Schedule</h2>

       { /*  <div className="plan-nut-tabs">
            <button className="plan-nut-tab-button plan-nut-active">Daily</button>
            <button className="plan-nut-tab-button">Weekly</button>
          </div>
*/}
          <div className="plan-nut-table-card">
            <table className="plan-nut-meal-table">
              <thead>
                <tr className="plan-nut-table-header">
                  <th className="plan-nut-table-header-cell">Meal</th>
                  <th className="plan-nut-table-header-cell">Food Items</th>
                  <th className="plan-nut-table-header-cell">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, index) => (
                  <tr className="plan-nut-table-row" key={index}>
                    <td className="plan-nut-table-cell plan-nut-meal-name">{meal.meal}</td>
                    <td className="plan-nut-table-cell plan-nut-food-item">{meal.food}</td>
                    <td className="plan-nut-table-cell plan-nut-quantity">{meal.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="plan-nut-section">
          <h2 className="plan-nut-section-title">Allowed Foods</h2>
          <p className="plan-nut-section-text">Fruits, vegetables, lean proteins, whole grains, low-fat dairy, nuts, and seeds.</p>
        </div>

        <div className="plan-nut-section">
          <h2 className="plan-nut-section-title">Restricted Foods</h2>
          <p className="plan-nut-section-text">Processed foods, sugary drinks, high-fat foods, excessive salt, and alcohol.</p>
        </div>

        <div className="plan-nut-section">
          <h2 className="plan-nut-section-title">General Recommendations</h2>
          <p className="plan-nut-section-text">{note}</p>
        </div>

        <div className="plan-nut-section">
          <h2 className="plan-nut-section-title">Notes & Collaboration</h2>
          <textarea
            className="plan-nut-notes-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="5"
          />
        </div>

        <div className="plan-nut-action-buttons">
          <button className="plan-nut-btn-primary">Send to Nutritionist</button>
          <button className="plan-nut-btn-secondary">Export</button>
        </div>

        <div className="plan-nut-section">
          <h2 className="plan-nut-section-title">Comment Log</h2>
          <div className="plan-nut-comments">
            {comments.map((comment, index) => (
              <div className="plan-nut-comment" key={index}>
                <div className="plan-nut-avatar">
                  <img src={comment.avatar} alt={comment.author} className="plan-nut-avatar-image" />
                </div>
                <div className="plan-nut-comment-content">
                  <div className="plan-nut-comment-header">
                    <span className="plan-nut-comment-author">{comment.author}</span>
                    <span className="plan-nut-comment-date">{comment.date}</span>
                  </div>
                  <p className="plan-nut-comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NutritionalPlan;
