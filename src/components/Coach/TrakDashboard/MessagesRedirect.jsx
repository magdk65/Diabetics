// MessagesRedirect.jsx
import React from "react";
import '../TrakDashboard/FitTrackDashboard.css'

const MessagesRedirect = ({ patientId }) => {
  const handleRedirect = () => {
    window.location.href = `/coach/chat/${patientId}`;
  };

  return (
    <button className="ft-tab-btn inactive" onClick={handleRedirect}>
      Messages
    </button>
  );
};

export default MessagesRedirect;
