import React from "react";
import { Link } from "react-router-dom";
import Header_Child from "../Header_Child/Header_Child";
import "../BloodSugarReminder/BloodSugarReminder.css";

const BloodSugarReminder = () => {
  return (
    <div className="blood-sugar-container">
      <div className="felx-blood">
        <Header_Child />
        <div className="content-wrapper-p">
          <h1 className="main-heading-p">Time for your blood sugar check!</h1>

          <p className="description">
            It's important to check your blood sugar regularly to keep your
            energy levels steady and feel your best. Let's do it together!
          </p>

          <Link to="/bloodsugarlogger" className="check-button">
            Check Blood Sugar
          </Link>

          <p className="help-text">
            If you need help, ask your parent or guardian.
          </p>

          <p className="reminder-text">Next reminder in 6 hours</p>
        </div>
      </div>
    </div>
  );
};

export default BloodSugarReminder;
