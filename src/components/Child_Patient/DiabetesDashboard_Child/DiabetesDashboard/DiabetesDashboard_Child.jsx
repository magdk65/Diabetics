import React, { useState } from "react"
import { Link } from "react-router-dom"
import Header_Child from "../Header_Child/Header_Child"
import '../DiabetesDashboard/DiabetesDashboard_Child.css'
import img1 from '../../../../assets/img_child/Depth 7, Frame 0 (1).png'
import img2 from '../../../../assets/img_child/Depth 7, Frame 0 (2).png'
import img3 from '../../../../assets/img_child/Depth 7, Frame 0 (3).png'
import img4 from '../../../../assets/img_child/Depth 7, Frame 0 (4).png'
const DiabetesDashboard_Child = () => {
  const [userName, setUserName] = useState("Alex")
  const [selectedTask, setSelectedTask] = useState("")
  const [bloodSugar, setBloodSugar] = useState(135)

  const getProgressColor = (value) => {
    if (value >= 80 && value <= 120) return "#4caf50" 
    if ((value > 120 && value <= 150) || (value >= 60 && value < 80)) return "#ffeb3b" 
    return "#f44336"
  }

  const getProgressWidth = (value) => {
    const max = 200
    const min = 0
    let percentage = ((value - min) / (max - min)) * 100
    if (percentage > 100) percentage = 100
    if (percentage < 0) percentage = 0
    return `${percentage}%`
  }

  return (
    <div className="dashboard--child-dashboard">
      <Header_Child/>

      <main className="main-content--child-dashboard">
        <section className="greeting">
          <h1>Hi, {userName}!</h1>
          {selectedTask && (
            <p className="selected-task" aria-live="polite">
              You selected: <strong>{selectedTask}</strong>
            </p>
          )}
        </section>

        <section className="blood-sugar-section" aria-label="Current blood sugar level">
          <div className="blood-sugar-header">
            <h2 className="blood-sugar-title">Current Blood Sugar</h2>
            <span className="blood-sugar-value" aria-live="polite">
              {bloodSugar} mg/dL
            </span>
          </div>

          <div
            className="progress-bar-container"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={200}
            aria-valuenow={bloodSugar}
            aria-label="Blood sugar level progress"
          >
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: getProgressWidth(bloodSugar),
                  backgroundColor: getProgressColor(bloodSugar),
                  transition: "width 0.5s ease, background-color 0.5s ease",
                  height: "0.75rem",
                  borderRadius: "9999px",
                }}
              ></div>
            </div>
          </div>

          <p className="target-text">Target: 80-120 mg/dL</p>
        </section>

        <section className="daily-tasks" aria-label="Daily diabetes management tasks">
          <h2>Daily Tasks</h2>

          <div className="tasks-grid">
            {[
              {
                path: "/check-blood",
                taskName: "Check Blood Sugar",
                iconClass: "blood-sugar",
                imgAlt: "Glucose meter",
                imgSrc: img1,
              },
              {
                path: "/take-insulin",
                taskName: "Take Insulin",
                iconClass: "insulin",
                imgAlt: "Insulin pen",
                imgSrc: img2,
              },
              {
                path: "/log-meals",
                taskName: "Log Meals",
                iconClass: "meals",
                imgAlt: "Healthy meal",
                imgSrc: img3,
              },
              {
                path: "/exercise",
                taskName: "Exercise",
                iconClass: "exercise",
                imgAlt: "Person exercising",
                imgSrc: img4,
              },
            ].map(({ path, taskName, iconClass, imgAlt, imgSrc }) => (
              <Link
                key={taskName}
                to={path}
                className="task-card"
                onClick={() => setSelectedTask(taskName)}
                aria-label={`Go to ${taskName} page`}
              >
                <div className={`task-icon ${iconClass}`}>
                  <img src={imgSrc} alt={imgAlt} />
                </div>
                <h3 className="task-title">{taskName}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default DiabetesDashboard_Child
