import React, { useState } from 'react';
import '../Survey/Survey.css'
const rolesList = [
  { label: 'All', value: 'all' },
  { label: 'User', value: 'user' },
  { label: 'Doctor', value: 'doctor' },
  { label: 'أخصائي تغذية', value: 'nutritionist' },
  { label: 'Coach', value: 'coach' },
  { label: 'Family', value: 'family' },
  { label: 'المريض', value: 'patient' },
];

const Survey = () => {
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [duration, setDuration] = useState('');

  const handleRoleChange = (roleValue) => {
    if (roleValue === 'all') {
      // لو اخترنا "All"، نخليها بس في المصفوفة
      setSelectedRoles(['all']);
    } else {
      let updatedRoles = [...selectedRoles];
      // لو "All" موجودة نزيلها لأنه اخترنا غيرها
      if (updatedRoles.includes('all')) {
        updatedRoles = updatedRoles.filter((r) => r !== 'all');
      }
      if (updatedRoles.includes(roleValue)) {
        // لو مفعلة، نلغي التفعيل
        updatedRoles = updatedRoles.filter((r) => r !== roleValue);
      } else {
        // نضيف الدور
        updatedRoles.push(roleValue);
      }
      setSelectedRoles(updatedRoles);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا ممكن تضيف ربط للباك API
    console.log({
      question,
      answerOptions: answerOptions.split('\n').filter(opt => opt.trim() !== ''),
      selectedRoles,
      duration,
    });
    alert('Survey data logged to console.');
  };

  return (
    <div className="Admin4-container">
      <main className="Admin4-main-content">
        <h1 className="Admin4-main-title">Create Poll/Survey</h1>

        <form onSubmit={handleSubmit} className="Admin4-form-grid">
          <div className="Admin4-form-group">
            <label htmlFor="question" className="Admin4-form-label">
              Question
            </label>
            <input
              id="question"
              type="text"
              placeholder="Enter your question here"
              className="Admin4-form-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="Admin4-form-group">
            <label htmlFor="answer-options" className="Admin4-form-label">
              Answer Options
            </label>
            <textarea
              id="answer-options"
              placeholder="Enter answer options, one per line"
              rows={6}
              className="Admin4-form-textarea"
              value={answerOptions}
              onChange={(e) => setAnswerOptions(e.target.value)}
              required
            />
          </div>

          <div className="Admin4-form-group">
            <label className="Admin4-form-label">Target Audience (Roles)</label>
            <div className="Admin4-multi-select">
              {rolesList.map((role) => (
                <label key={role.value} className="Admin4-checkbox-label">
                  <input
                    type="checkbox"
                    value={role.value}
                    checked={selectedRoles.includes(role.value)}
                    onChange={() => handleRoleChange(role.value)}
                    disabled={selectedRoles.includes('all') && role.value !== 'all'}
                  />
                  {role.label}
                </label>
              ))}
            </div>
          </div>

          <div className="Admin4-form-group">
            <label htmlFor="duration" className="Admin4-form-label">
              Duration
            </label>
            <input
              id="duration"
              type="text"
              placeholder="e.g., 7 days, 24 hours"
              className="Admin4-form-input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <div className="Admin4-form-actions">
            <button type="submit" className="Admin4-create-survey-button">
              Create Survey
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Survey;
