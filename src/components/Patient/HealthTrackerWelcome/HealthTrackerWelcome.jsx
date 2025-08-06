import "./HealthTrackerWelcome.css"
import phoneImage from '../../../assets/img/b6fb465cfb1f3823f64efc27e584a02f0ffd0e86.png'
import logo1 from '../../../assets/img/Screenshot_2025-07-05_224640-removebg-preview 1.png' 
import logo2 from '../../../assets/img/Screenshot_2025-07-05_230814-removebg-preview 1.png' 
import { Link } from "react-router-dom"

const HealthTrackerWelcome = () => {
  return (
    <div className="welcome-container">
      {/* Header */}
      <div className="header">
        <div className="header-image-left">
          <img src={logo2} alt="Left decoration" className="image-contain" />
        </div>
        <div className="header-image-right">
          <img src="/images/right-decoration.png" alt="Right decoration" className="image-contain" />
        </div>
      </div>
      <div className="line-separator-w"></div>


      <div className="content-wrapper">
        <div className="phone-image-wrapper">
          <img
            src={phoneImage}
            alt="Health Tracker App Illustration"
            className="phone-image"
          />
        </div>

        <div className="text-content">
          <h1 className="welcome-title">Wel come to HealthTracker</h1>
          <p className="welcome-description">
            Your personal companion in managing diabetes. Track your blood sugar,
            meals, and activity levels — all in one place.
          </p>
        </div>

        <div className="button-container">
  <Link to="/login_p" className="get-started-btn">Get Started</Link>
</div>

      </div>
    </div>
  )
}

export default HealthTrackerWelcome
