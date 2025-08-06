import React, { useState } from "react";
import '../TrakDashboard/FitTrackDashboard.css'

const NotesCard = ({ patientId }) => {
  const [note, setNote] = useState("");

  const handleSaveNote = () => {
    alert(`Note for patient ${patientId}: ${note}`);
  };

  return (
    <button
      className="ft-tab-button inactive"
      onClick={() => {
        const userNote = prompt("Write a note for this patient:");
        if (userNote) setNote(userNote);
      }}
    >
      Notes
    </button>
  );
};

export default NotesCard;
