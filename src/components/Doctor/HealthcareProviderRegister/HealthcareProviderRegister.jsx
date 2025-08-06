"use client"

import { useState, useEffect } from "react"
import "../HealthcareProviderRegister/HealthcareProviderRegister.css"

const HealthcareProviderRegister = () => {
  const [formData, setFormData] = useState({
    licenseNumber: "",
    accreditationAuthority: "",
    specialization: "",
    notes: "",
    role: "" // سيتم جلبه من localStorage
  })

  const [roleText, setRoleText] = useState("")

  // جلب الدور من localStorage عند تحميل الصفحة
  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "doctor"
    setFormData((prev) => ({ ...prev, role: storedRole }))

    const roleMessages = {
      doctor: "Complete your doctor registration and verify your medical license.",
      nutritionist: "Complete your nutritionist registration and verify your certification.",
      coach: "Complete your coach registration to help users with fitness and health."
    }

    setRoleText(roleMessages[storedRole])
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Provider Register Data:", formData)
    // axios.post("/api/provider/register", formData)
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
              Register as a {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
            </h1>
            <p className="feature-text" style={{ color: "rgba(255,255,255,0.9)", marginBottom: "2rem" }}>
              {roleText}
            </p>

            <ul className="features-list">
              {[
                "Quick and easy license verification",
                "Secure platform to protect your data",
                "Start helping patients once approved"
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
            <div className="welcome-section">
              <h2 className="welcome-title">Enter your details for verification</h2>
              <p className="welcome-subtitle">{roleText}</p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="licenseNumber" className="form-label">License Number</label>
                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  placeholder="Enter your license number"
                  className="form-input"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="accreditationAuthority" className="form-label">Accreditation Authority</label>
                <input
                  id="accreditationAuthority"
                  name="accreditationAuthority"
                  type="text"
                  placeholder="Enter the accrediting authority"
                  className="form-input"
                  value={formData.accreditationAuthority}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialization" className="form-label">Specialization</label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="E.g., General Medicine, Nutrition, Physiotherapy..."
                  className="form-input"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Add any additional details"
                  className="form-input"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-button">Sign up</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HealthcareProviderRegister
