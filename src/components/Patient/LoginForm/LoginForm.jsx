import React, { useState } from "react";
import "./LoginForm.css";
import logo1 from '../../../assets/img/Screenshot_2025-07-05_224640-removebg-preview 1.png';
import logo2 from '../../../assets/img/Screenshot_2025-07-05_230814-removebg-preview 1.png';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: ""
  });

  const fields = [
    {
      id: "emailOrPhone",
      type: "text",
      placeholder: "Email or phone",
      label: "Email or phone"
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
      label: "Password"
    }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // هنا تضع منطق تسجيل الدخول
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

      {/* Login form */}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div className="form-title">
            <h1 className="title-text">Welcome back</h1>
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

            <div className="forgot-password">
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">Log in</button>

            <div className="signup-text">
              <span className="signup-prompt">
                Don't have an account?{" "}
                <a href="#" className="signup-link">
                  Sign up
                </a>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
