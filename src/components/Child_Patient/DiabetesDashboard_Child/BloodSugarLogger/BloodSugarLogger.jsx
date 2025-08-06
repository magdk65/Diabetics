import "../BloodSugarLogger/BloodSugarLogger.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import img1 from '../../../../assets/img_child/Depth 5, Frame 0.png'
import Header_Child from "../Header_Child/Header_Child"

const BloodSugarLogger = () => {
  const [inputMethod, setInputMethod] = useState("manual")
  const [loggedDays, setLoggedDays] = useState(3)
  const totalDays = 4

  return (
    <div className="blood-sugar-logger">
      <Header_Child />
      <main className="main-section">
        <h1 className="title">Log Your Blood Sugar</h1>

        <div className="mascot-box">
          <img src={img1} alt="Friendly mascot waving" className="mascot-img" />
        </div>

        <div className="method-selector">
          <label htmlFor="method" className="method-label">Input Method</label>
          <select
            id="method"
            value={inputMethod}
            onChange={(e) => setInputMethod(e.target.value)}
            className="method-select"
          >
            <option value="manual">Manual Entry</option>
            <option value="device">Connect Device</option>
          </select>
        </div>

        <div className="input-box">
          {inputMethod === "manual" ? (
            <div className="form-container">
              <label htmlFor="sugar" className="form-label">Blood Sugar Level (mg/dL)</label>
              <input
                id="sugar"
                type="number"
                placeholder="Enter reading..."
                className="form-input"
              />
              <button
                className="submit-btn"
                onClick={() => {
                  if (loggedDays < totalDays) setLoggedDays(loggedDays + 1)
                }}
              >
                Log Reading
              </button>
            </div>
          ) : (
            <div className="device-box">
              <p className="device-text">Please connect your glucometer via Bluetooth.</p>
              <button className="connect-btn">Connect Device</button>
            </div>
          )}
        </div>

        <div className="rewards-box">
          <h2 className="rewards-title">Rewards</h2>

          <div className="streak-info">
            <div className="streak-header">
              <span className="streak-label">Daily Logging Streak</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(loggedDays / totalDays) * 100}%` }}
              ></div>
            </div>
            <span className="streak-count">{loggedDays}/{totalDays} Days</span>
          </div>

          <p className="encourage-text">
            {loggedDays < totalDays
              ? "Keep going! One more log today to earn your reward!"
              : "You've completed today's goal! 🎉"}
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-bar">
        <div className="bar-items">
          <Link to="/home" className="bar-item active">
            <span className="icon">🏠</span>
            <span className="label">Home</span>
          </Link>
          <Link to="/challenges" className="bar-item">
            <span className="icon">🎯</span>
            <span className="label">Challenges</span>
          </Link>
          <Link to="/rewards" className="bar-item">
            <span className="icon">🏆</span>
            <span className="label">Rewards</span>
          </Link>
          <Link to="/community" className="bar-item">
            <span className="icon">👥</span>
            <span className="label">Community</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default BloodSugarLogger
