"use client"

import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import "../HealthcareRegister/HealthcareRegister.css"

const HealthcareRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: ""
  })

  const [activeRole, setActiveRole] = useState("nutritionist")
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.repassword) {
      alert("Passwords do not match!")
      return
    }

    const registerPayload = {
      ...formData,
      role: activeRole,
    }

    console.log("Registering User:", registerPayload)

    // تخزين الدور في localStorage لاستخدامه في الصفحة التالية
    localStorage.setItem("role", activeRole)

    // مثال: الانتقال للصفحة التالية
    window.location.href = "/provider-register"

    // axios.post("/api/register", registerPayload)
  }

  const roleText = {
    nutritionist: "Register as a Nutritionist and guide users nutritionally.",
    doctor: "Register as a Doctor to manage and consult patients.",
    coach: "Register as a Coach and help users with workouts and health."
  }

  return (
    <div className="container-register-health">
      {/* Decorations */}
      <div className="decoration decoration-1" />
      <div className="decoration decoration-2" />
      <div className="decoration decoration-3" />

      <div className="main-content-register-h">
        {/* Left Panel */}
        <aside className="left-panel">
          <button className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="left-content">
            <h1 className="main-title">
              Join our healthcare platform
              <br /> and improve your wellbeing
            </h1>

            <ul className="features-list">
              {[
                "Create your account and access top health experts",
                "Available 24/7 on any device",
                "Track your progress and stay healthy",
              ].map((text, index) => (
                <li className="feature-item" key={index}>
                  <div className="feature-icon">
                    <div className="icon-dot" />
                  </div>
                  <p className="feature-text">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="wave-container">
            <svg viewBox="0 0 400 100" className="wave">
              <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="currentColor" />
            </svg>
          </div>
        </aside>

        {/* Right Panel */}
        <section className="right-panel">
          <div className="form-container">
            
            {/* Welcome Section */}
            <div className="welcome-section">
              <h2 className="welcome-title">Create your account</h2>
              <p className="welcome-subtitle">{roleText[activeRole]}</p>
            </div>

            {/* Role Tabs */}
            <div className="tab-navigation">
              {["nutritionist", "doctor", "coach"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setActiveRole(role)}
                  className={`tab-button ${activeRole === role ? "active" : ""}`}
                >
                  <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </button>
              ))}
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-container">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="form-input password-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="repassword" className="form-label">Confirm Password</label>
                <div className="password-container">
                  <input
                    id="repassword"
                    name="repassword"
                    type={showRePassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="form-input password-input"
                    value={formData.repassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRePassword(!showRePassword)}
                    className="password-toggle"
                  >
                    {showRePassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-button">Sign up</button>
            </form>

            <p className="signup-link">
              Already have an account?
              <button className="signup-button">Sign in</button>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HealthcareRegister
