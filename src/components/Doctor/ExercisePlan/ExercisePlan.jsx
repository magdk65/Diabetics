import React, { useEffect, useState } from 'react';
import '../ExercisePlan/ExercisePlan.css'
import SidebarCustom from '../SidebarCustom/SidebarCustom';
const ExercisePlan = () => {
  const [patientName, setPatientName] = useState('');
  const [coachName, setCoachName] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [lastModified, setLastModified] = useState('');
  const [exercisesByDay, setExercisesByDay] = useState({});
  const [collaborationNote, setCollaborationNote] = useState('');
  const [comments, setComments] = useState([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const response = {
      patient: 'Sophia Bennett',
      coach: 'Liam Carter',
      created: '03/15/2024',
      lastModified: '03/22/2024',
      exercisesByDay: {
  Monday: [
    { exercise: 'Warm-up', duration: '5 minutes', frequency: 'Daily', instructions: 'Light cardio, stretching' },
    { exercise: 'Strength Training', duration: '3 sets of 10 reps', frequency: '3 times a week', instructions: 'Focus on major muscle groups' },
  ],
  Tuesday: [
    { exercise: 'Cardio', duration: '30 minutes', frequency: '3 times a week', instructions: 'Moderate intensity' },
  ],
  Wednesday: [
    { exercise: 'Rest', duration: 'N/A', frequency: 'N/A', instructions: 'Active recovery or rest' },
  ],
  Thursday: [
    { exercise: 'Strength Training', duration: '3 sets of 10 reps', frequency: '3 times a week', instructions: 'Focus on major muscle groups' },
  ],
  Friday: [
    { exercise: 'Cardio', duration: '30 minutes', frequency: '3 times a week', instructions: 'Moderate intensity' },
  ],
  Saturday: [
    { exercise: 'Flexibility', duration: '15 minutes', frequency: 'Weekly', instructions: 'Yoga or Pilates' },
  ],
  Sunday: [
    { exercise: 'Rest', duration: 'N/A', frequency: 'N/A', instructions: 'Complete rest or light walking' },
  ],
      },
      collaborationNote: '',
      comments: [
        { author: 'Liam Carter', date: '03/22/2024 10:00 AM', text: 'Added a flexibility routine for Saturdays.', avatarText: 'LC' },
        { author: 'Dr. Olivia Hayes', date: '03/22/2024 9:00 AM', text: 'Looks good! Just a minor adjustment on the strength training reps.', avatarText: 'OH' },
        { author: 'Liam Carter', date: '03/15/2024 2:00 PM', text: "Here's the initial exercise plan for Sophia.", avatarText: 'LC' }
      ]
    };

    setPatientName(response.patient);
    setCoachName(response.coach);
    setCreatedDate(response.created);
    setLastModified(response.lastModified);
    setExercisesByDay(response.exercisesByDay);
    setCollaborationNote(response.collaborationNote);
    setComments(response.comments);
  }, []);

  const handleSendToCoach = () => {
    if (!collaborationNote.trim()) {
      alert('يرجى كتابة ملاحظة قبل الإرسال.');
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      const newComment = {
        author: 'Dr. Olivia Hayes',
        date: new Date().toLocaleString(),
        text: collaborationNote,
        avatarText: 'OH',
      };

      setComments(prev => [...prev, newComment]);
      setCollaborationNote('');
      setIsSending(false);
      alert('تم إرسال الملاحظة بنجاح.');
    }, 1000);
  };

  return (
    <div className="plan-coach-container">
        <SidebarCustom/>
      <div className="plan-coach-wrapper">
        <div className="plan-coach-header-section">
          <h1 className="plan-coach-main-title">Modify Exercise Plan</h1>
          <p className="plan-coach-subtitle">
            Patient: {patientName} • Coach: {coachName} • Created on: {createdDate} • Last Modified: {lastModified}
          </p>
        </div>

        <div className="plan-coach-card">
          <div className="plan-coach-card-header">
            <h2 className="plan-coach-card-title">Exercise Plan</h2>
          </div>
          <div className="plan-coach-card-content">
            <div className="plan-coach-table-container">
              <table className="plan-coach-exercise-table">
                <thead>
                  <tr className="plan-coach-table-header">
                    <th className="plan-coach-table-cell plan-coach-header-cell">Day</th>
                    <th className="plan-coach-table-cell plan-coach-header-cell">Exercise</th>
                    <th className="plan-coach-table-cell plan-coach-header-cell">Duration/Repetition</th>
                    <th className="plan-coach-table-cell plan-coach-header-cell">Frequency</th>
                    <th className="plan-coach-table-cell plan-coach-header-cell">Instructions/Warnings</th>
                  </tr>
                </thead>
                <tbody>
  {Object.entries(exercisesByDay).map(([day, exercises]) => (
    <tr key={day} className="plan-coach-table-row">
      <td className="plan-coach-table-cell">{day}</td>
      
      <td className="plan-coach-table-cell">
        {exercises.map((ex, i) => `${i + 1}. ${ex.exercise}`).join('\n').split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </td>

      <td className="plan-coach-table-cell">
        {exercises.map((ex, i) => `${i + 1}. ${ex.duration}`).join('\n').split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </td>

      <td className="plan-coach-table-cell plan-coach-frequency">
        {exercises.map((ex, i) => `${i + 1}. ${ex.frequency}`).join('\n').split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </td>

      <td className="plan-coach-table-cell plan-coach-instructions">
        {exercises.map((ex, i) => `${i + 1}. ${ex.instructions}`).join('\n').split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
        </div>

        <div className="plan-coach-card">
          <div className="plan-coach-card-header">
            <h2 className="plan-coach-card-title">Collaboration</h2>
          </div>
          <div className="plan-coach-card-content">
            <textarea 
              className="plan-coach-collaboration-textarea" 
              placeholder="Add your comments or suggestions here..."
              value={collaborationNote}
              onChange={(e) => setCollaborationNote(e.target.value)}
              rows={5}
              disabled={isSending}
            />
          </div>
        </div>

        <div className="plan-coach-button-group">
          <button 
            className="plan-coach-btn plan-coach-btn-primary" 
            onClick={handleSendToCoach}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send to Coach'}
          </button>
          <button className="plan-coach-btn plan-coach-btn-secondary">Print/Export</button>
        </div>

        <div className="plan-coach-card">
          <div className="plan-coach-card-header">
            <h2 className="plan-coach-card-title">Comment Log</h2>
          </div>
          <div className="plan-coach-card-content">
            <div className="plan-coach-comment-list">
              {comments.map((comment, idx) => (
                <div className="plan-coach-comment-item" key={idx}>
                  <div className="plan-coach-avatar">
                    <span className="plan-coach-avatar-text">{comment.avatarText}</span>
                  </div>
                  <div className="plan-coach-comment-content">
                    <div className="plan-coach-comment-header">
                      <span className="plan-coach-comment-author">{comment.author}</span>
                      <span className="plan-coach-comment-date">{comment.date}</span>
                    </div>
                    <p className="plan-coach-comment-text">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="plan-coach-card plan-coach-suggestion-card">
          <div className="plan-coach-card-content">
            <div className="plan-coach-suggestion-content">
              <div className="plan-coach-suggestion-text">
                <h3 className="plan-coach-suggestion-title">New Suggestion</h3>
                <p className="plan-coach-suggestion-description">Dr. Hayes has suggested modifications to the exercise plan.</p>
              </div>
              <button className="plan-coach-btn plan-coach-btn-primary">Review Suggestion</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePlan;
