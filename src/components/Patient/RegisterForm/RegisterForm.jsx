import React, { useState } from "react";
import "../LoginForm/LoginForm.css";  // تستخدم نفس التنسيق، فما في داعي لعمل css جديد
import logo1 from '../../../assets/img/Screenshot_2025-07-05_224640-removebg-preview 1.png';
import logo2 from '../../../assets/img/Screenshot_2025-07-05_230814-removebg-preview 1.png';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    diabetesType: "",
    diagnosisDate: ""
  });

  const diabetesTypes = [
    "Type 1",
    "Type 2",
    "Gestational",
    "Other"
  ];

  const fields = [
    { id: "fullName", type: "text", placeholder: "Full Name", label: "Full Name" },
    { id: "email", type: "email", placeholder: "Email", label: "Email" },
    { id: "age", type: "number", placeholder: "Age", label: "Age" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDiabetesChange = (e) => {
    setFormData(prev => ({ ...prev, diabetesType: e.target.value }));
  };

  const handleDateChange = (e) => {
    setFormData(prev => ({ ...prev, diagnosisDate: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
    // هنا تضيف منطق التسجيل، مثل API call
  };

  return (
    <div className="login-container">
      {/* Header */}
      <div className="header">
        <div className="header-image-left">
          <img src={logo2} alt="Left decoration" className="image-contain" />
        </div>
        <div className="header-image-right">
          <img src="/images/right-decoration.png" alt="Right decoration" className="image-contain" />
        </div>
      </div>

      {/* Line separator */}
      <div className="line-separator"></div>

      {/* Register form */}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div className="form-title">
            <h1 className="title-text">Welcome to Diabetox</h1>
          </div>

          <div className="form-fields">
            {fields.map(({ id, type, placeholder, label }) => (
              <div className="field-group" key={id}>
                <label htmlFor={id} className="sr-only">{label}</label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  className="input-field"
                  value={formData[id]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Dropdown for diabetes type */}
            <div className="field-group">
              <label htmlFor="diabetesType" className="sr-only">Type of Diabetes</label>
              <select
                id="diabetesType"
                className="input-field"
                value={formData.diabetesType}
                onChange={handleDiabetesChange}
                required
              >
                <option value="" disabled>Select Type of Diabetes</option>
                {diabetesTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Date of diagnosis */}
            <div className="field-group">
              <label htmlFor="diagnosisDate" className="sr-only">Date of Diagnosis</label>
              <input
                id="diagnosisDate"
                type="date"
                className="input-field"
                value={formData.diagnosisDate}
                onChange={handleDateChange}
                required
              />
            </div>

            <button type="submit" className="login-button">Register</button>

            <div className="signup-text" style={{ marginTop: "12px" }}>
              <span className="signup-prompt">
                Already have an account?{" "}
                <a href="/login_p" className="signup-link">
                  Log in
                </a>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
