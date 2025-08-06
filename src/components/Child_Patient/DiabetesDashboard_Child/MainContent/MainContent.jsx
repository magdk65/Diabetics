"use client";

import { useContext } from "react";
import { NotificationContext } from "../NotificationProvider/NotificationProvider";
import "./MainContent.css";

const MainContent = () => {
  const { addNotification } = useContext(NotificationContext);

  const handleCheckBloodSugar = () => {
    // Add a notification when blood sugar check is initiated
    addNotification({
      title: "Blood Sugar Check Started",
      message: "Great job! Remember to wash your hands before testing.",
      time: new Date().toLocaleTimeString(),
    });

    // Simulate completion after 3 seconds
    setTimeout(() => {
      addNotification({
        title: "Blood Sugar Check Complete",
        message: "Your reading has been recorded. Next reminder in 2 hours.",
        time: new Date().toLocaleTimeString(),
      });
    }, 3000);
  };

  return (
    <main className="main-content">
      <div className="content-container">
        <h1 className="main-title">Time for your blood sugar check!</h1>

        <p className="main-description">
          It's important to check your blood sugar regularly to keep your energy levels steady and feel your best. Let's
          do it together!
        </p>

        <div className="button-container">
          <button className="check-button" onClick={handleCheckBloodSugar}>
            Check Blood Sugar
          </button>
        </div>

        <p className="help-text">If you need help, ask your parent or guardian.</p>

        <p className="reminder-text">Next reminder in 2 hours</p>
      </div>
    </main>
  );
};

export default MainContent;
