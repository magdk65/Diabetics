"use client"

import { useState } from "react"
import "../HealthcareLogin/HealthcareLogin.css"

const HealthcareLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("nutritionist")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const loginPayload = {
      ...formData,
      role: activeTab,
    }

    console.log("Logging in as:", activeTab)
    console.log("Form Data:", loginPayload)

    // هنا ممكن تبعت البيانات للـ API
    // axios.post("/api/login", loginPayload)
  }

  return (
    <div className="container-login-health">
      {/* Decorations */}
      <div className="decoration decoration-1" />
      <div className="decoration decoration-2" />
      <div className="decoration decoration-3" />

      <div className="main-content-login-h">
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
              Expert advice from
              <br /> top professionals
            </h1>

            <ul className="features-list">
              {[
                "Expert advice from top professionals",
                "Available 24/7 on any device",
                "Private questions answered within 30 hrs",
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
            {/* Tabs */}
            <div className="tab-navigation">
              {["nutritionist", "doctor", "coach"].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveTab(role)}
                  className={`tab-button ${activeTab === role ? "active" : ""}`}
                >
                  <svg className="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {role === "doctor" ? (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12l2 2 4-4" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 3a9 9 0 110 18 9 9 0 010-18z" />
                      </>
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </>
                    )}
                  </svg>
                  <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </button>
              ))}
            </div>

            {/* Welcome Message */}
            <div className="welcome-section">
              <h2 className="welcome-title">Welcome back</h2>
              <p className="welcome-subtitle">
                {activeTab === "nutritionist"
                  ? "Log in to your account and help guide our users nutritionally."
                  : activeTab === "doctor"
                  ? "Log in to your account and we'll get you to see our patients."
                  : "Log in to your account and help coach our users to better health."}
              </p>
            </div>

            {/* Login Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
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
                    placeholder="Password"
                    className="form-input password-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                    aria-label="Toggle Password"
                  >
                    {showPassword ? (
                      <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-button">Sign in</button>
            </form>

            {/* Sign up Link */}
            <p className="signup-link">
              Don't have an account?
              <button className="signup-button">Sign up</button>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HealthcareLogin
