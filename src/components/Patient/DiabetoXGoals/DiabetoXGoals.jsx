"use client"
import React, { useState } from "react"
import "../DiabetoXGoals/DiabetoXGoals.css"
import logo2 from '../../../assets/img/Screenshot_2025-07-05_230814-removebg-preview 1.png';
import logo3 from '../../../assets/img/Depth 4, Frame 0 (1).png'
import logo4 from '../../../assets/img/Depth 4, Frame 1.png';
import { FiPlus, FiHelpCircle, FiTarget, FiClock, FiCalendar } from 'react-icons/fi'

const icons = {
  cross: <FiPlus className="icon" />,      
  help: <FiHelpCircle className="icon" />,   
  target: <FiTarget className="icon" />,     
  clock: <FiClock className="icon" />,      
  calendar: <FiCalendar className="icon" />
}

const initialGoals = [
  {
    section: "Blood Sugar",
    items: [
      { icon: "target", title: "Target range", value: "80-120 mg/dL" }
    ]
  },
  {
    section: "Physical Activity",
    items: [
      { icon: "clock", title: "Daily activity goal", value: "30 minutes" },
      { icon: "calendar", title: "Weekly activity goal", value: "3 times a week" }
    ]
  }
]

const DiabetoXGoals = () => {
  const [goals] = useState(initialGoals)

  const handleBackClick = () => console.log("Back button clicked")
  const handleConfirmClick = () => console.log("Confirm button clicked")

  return (
    <div className="app-container">
      <header className="header fixed-header">
        <div className="header-image-left">
          <img src={logo2} alt="Left decoration" className="image-contain" />
        </div>
        <div className="header-image-right">
          <nav className="img-right">
            <span><img src={logo3} alt="Right logo 1" className="image-contain-right" /></span>
            <span><img src={logo4} alt="Right logo 2" className="image-contain-right" /></span>
          </nav>
        </div>
      </header>

      <div className="line-separator"></div>

      <main className="main-content-dia">
        <div className="page-header">
          <h2 className="page-title">Review your goals</h2>
          <p className="page-subtitle">
            These are the goals you've set for yourself. You can always change them later.
          </p>
        </div>

        {goals.map((goalSection, idx) => (
          <section key={idx} className="section">
            <h3 className="section-title">{goalSection.section}</h3>
            {goalSection.items.map((item, i) => (
              <div key={i} className="goal-card">
                <div className="goal-icon-container">{icons[item.icon]}</div>
                <div className="goal-content">
                  <h4>{item.title}</h4>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </section>
        ))}

        <div className="action-buttons">
          <button className="button button-back" onClick={handleBackClick}>Back</button>
          <button className="button button-confirm" onClick={handleConfirmClick}>Confirm</button>
        </div>
      </main>
    </div>
  )
}

export default DiabetoXGoals