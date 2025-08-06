"use client"
import { useState } from "react"
import axios from "axios"
import "../N_SettingsPage/N_SettingsPage.css"
import Sidebar_Nut from "../../Sidebar_Nut/Sidebar_Nut"

export default function N_SettingsPage() {
  const [formData, setFormData] = useState({
    profilePicture: "", // صورة بصيغة Base64
    fullName: "",
    email: "",
    phone: "",
    expertise: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    language: "",
  })

  const [toggles, setToggles] = useState({
    twoFactorEnabled: false,
    newPatientNotifications: false,
    messageNotifications: false,
    feedbackNotifications: false,
    patientUpdates: false,
    darkMode: false,
  })

  // حالات تحميل لكل حفظ
  const [loadingPersonal, setLoadingPersonal] = useState(false)
  const [loadingSecurity, setLoadingSecurity] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  // حالة تخزين الأخطاء لكل حقل
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    expertise: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    language: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" })) // مسح الخطأ عند التعديل
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleToggleChange = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // --- VALIDATIONS ---

  // تحقق من ايميل صالح بسيط (تقدر تحسنه حسب الحاجة)
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // تحقق من رقم الهاتف (اختياري، هنا تحقق بسيط لأرقام فقط)
  const isValidPhone = (phone) => {
    return phone === "" || /^[0-9]+$/.test(phone)
  }

  // حفظ بيانات شخصية مع تحقق + عرض الأخطاء تحت الحقول
  const handleSavePersonalInfo = async () => {
    let valid = true
    const newErrors = {}

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters long."
      valid = false
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address."
      valid = false
    }
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits."
      valid = false
    }
    // ممكن تضيف تحقق للتخصص واللغة حسب الحاجة

    if (!valid) {
      setErrors((prev) => ({ ...prev, ...newErrors }))
      return
    }

    setLoadingPersonal(true)
    try {
      const dataToSave = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        expertise: formData.expertise,
        language: formData.language,
        profilePicture: formData.profilePicture,
      }

      await axios.post("http://localhost:8000/api/save-personal-info", dataToSave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      alert("Personal info saved successfully!")
      setErrors({}) // مسح كل الأخطاء عند النجاح
    } catch (error) {
      console.error(error)
      alert("Failed to save personal info")
    } finally {
      setLoadingPersonal(false)
    }
  }

  // حفظ إعدادات الأمان مع تحقق وعرض الأخطاء
  const handleSaveSecurity = async () => {
    let valid = true
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current Password is required."
      valid = false
    }
    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "New Password must be at least 6 characters long."
      valid = false
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "New Password and Confirm Password do not match."
      valid = false
    }

    if (!valid) {
      setErrors((prev) => ({ ...prev, ...newErrors }))
      return
    }

    setLoadingSecurity(true)
    try {
      const dataToSave = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
        twoFactorEnabled: toggles.twoFactorEnabled,
      }

      await axios.post("http://localhost:8000/api/save-security", dataToSave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      alert("Security settings saved successfully!")
      setErrors({})
    } catch (error) {
      console.error(error)
      alert("Failed to save security settings")
    } finally {
      setLoadingSecurity(false)
    }
  }

  // حفظ الإشعارات بدون تحقق لأنها خيارات اختيارية
  const handleSaveNotifications = async () => {
    setLoadingNotifications(true)
    try {
      const dataToSave = {
        newPatientNotifications: toggles.newPatientNotifications,
        messageNotifications: toggles.messageNotifications,
        feedbackNotifications: toggles.feedbackNotifications,
        patientUpdates: toggles.patientUpdates,
        darkMode: toggles.darkMode,
      }

      await axios.post("http://localhost:8000/api/save-notifications", dataToSave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      alert("Notifications saved successfully!")
    } catch (error) {
      console.error(error)
      alert("Failed to save notifications")
    } finally {
      setLoadingNotifications(false)
    }
  }

  return (
    <div className="settings-container">
      <Sidebar_Nut />
      <div className="settings-main-content">
        <div className="settings-content-wrapper">
          <div className="setting-flex">
            <h1 className="settings-page-title">Settings</h1>
            <p className="settings-page-subtitle">Manage your profile and preferences</p>

            {/* Personal Information */}
            <div className="settings-section-card">
              <h2 className="settings-section-title">Personal Information</h2>

              <div className="settings-form-group">
                <label className="settings-form-label">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="settings-form-input"
                  disabled={loadingPersonal}
                />
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="settings-form-input"
                  disabled={loadingPersonal}
                />
                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="settings-form-input"
                  disabled={loadingPersonal}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="settings-form-input"
                  disabled={loadingPersonal}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Area of Expertise/Specializations</label>
                <textarea
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  className="settings-form-textarea"
                  rows={3}
                  disabled={loadingPersonal}
                />
                {errors.expertise && <p className="error-text">{errors.expertise}</p>}
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Language</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="settings-form-input"
                  disabled={loadingPersonal}
                />
                {errors.language && <p className="error-text">{errors.language}</p>}
              </div>

              <button
                className="settings-save-button"
                onClick={handleSavePersonalInfo}
                disabled={loadingPersonal}
              >
                {loadingPersonal ? "Saving..." : "Save Personal Info"}
              </button>
            </div>

            {/* Security */}
            <div className="settings-section-card">
              <h2 className="settings-section-title">Security</h2>

              <div className="settings-form-group">
                <label className="settings-form-label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="settings-form-input"
                  disabled={loadingSecurity}
                />
                {errors.currentPassword && <p className="error-text">{errors.currentPassword}</p>}
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="settings-form-input"
                  disabled={loadingSecurity}
                />
                {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="settings-form-input"
                  disabled={loadingSecurity}
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>

              <div className="settings-toggle-group">
                <div className="settings-toggle-info">
                  <div className="settings-toggle-title">Two-Factor Authentication</div>
                  <div className="settings-toggle-description">
                    Enable or disable two-factor authentication for enhanced security.
                  </div>
                </div>
                <div
                  className={`settings-toggle-switch ${toggles.twoFactorEnabled ? "active" : ""}`}
                  onClick={() => !loadingSecurity && handleToggleChange("twoFactorEnabled")}
                >
                  <div className="settings-toggle-slider"></div>
                </div>
              </div>

              <button
                className="settings-save-button"
                onClick={handleSaveSecurity}
                disabled={loadingSecurity}
              >
                {loadingSecurity ? "Saving..." : "Save Security Settings"}
              </button>
            </div>

            {/* Notifications */}
            <div className="settings-section-card">
              <h2 className="settings-section-title">Notifications</h2>

              {[
                { key: "newPatientNotifications", title: "New Patient Assignments" },
                { key: "messageNotifications", title: "Messages from Patients" },
                { key: "feedbackNotifications", title: "Feedback from Doctors" },
                { key: "patientUpdates", title: "Patient Updates (e.g., Food Logs)" },
                { key: "darkMode", title: "Dark/Light Mode" },
              ].map((toggle) => (
                <div key={toggle.key} className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <div className="settings-toggle-title">{toggle.title}</div>
                  </div>
                  <div
                    className={`settings-toggle-switch ${toggles[toggle.key] ? "active" : ""}`}
                    onClick={() => !loadingNotifications && handleToggleChange(toggle.key)}
                  >
                    <div className="settings-toggle-slider"></div>
                  </div>
                </div>
              ))}

              <button
                className="settings-save-button"
                onClick={handleSaveNotifications}
                disabled={loadingNotifications}
              >
                {loadingNotifications ? "Saving..." : "Save Notification Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
