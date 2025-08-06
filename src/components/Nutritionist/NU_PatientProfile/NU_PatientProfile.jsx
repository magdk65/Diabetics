import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts"
import { FiPhoneCall } from "react-icons/fi"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { FaPills } from "react-icons/fa"
import "../NU_PatientProfile/NU_PatientProfile.css"
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut"

const allPatientsData = [
  {
    id: "1",
    name: "Ethan Bennett",
    avatar: "/patient1.png",
    lastVisit: "1 week ago",
    medications: [
      { id: 1, name: "Metformin", dose: "500mg" },
      { id: 2, name: "Lisinopril", dose: "10mg" },
    ],
    bloodSugarData: [
      { time: "8 AM", value: 110 },
      { time: "12 PM", value: 120 },
      { time: "4 PM", value: 115 },
      { time: "8 PM", value: 130 },
    ],
    macroData: [
      { day: "Day 1", carbs: 50, protein: 30, fat: 20 },
      { day: "Day 2", carbs: 45, protein: 35, fat: 20 },
             { day: "Day 3", carbs: 52, protein: 30, fat: 18 },
        { day: "Day 4", carbs: 52, protein: 30, fat: 18 },
    ],
    foodLog: [
      {
        time: "8:00 AM",
        meal: "Oatmeal with banana",
        quantity: "1 bowl",
        image: "/oatmeal.png",
        notes: "Added cinnamon",
      },
      {
        time: "1:00 PM",
        meal: "Grilled chicken salad",
        quantity: "1 plate",
        image: "/salad.png",
        notes: "No dressing",
      },
    ],
    nutritionPlan: { currentPlan: "Low Carb" },
  },
  {
    id: "2",
    name: "Chloe Carter",
    avatar: "/patient2.png",
    lastVisit: "5 days ago",
    medications: [
      { id: 1, name: "Aspirin", dose: "100mg" },
    ],
    bloodSugarData: [
      { time: "8 AM", value: 105 },
      { time: "12 PM", value: 118 },
      { time: "4 PM", value: 112 },
      { time: "8 PM", value: 125 },
    ],
    macroData: [
      { day: "Day 1", carbs: 55, protein: 28, fat: 17 },
      { day: "Day 2", carbs: 52, protein: 30, fat: 18 },
       { day: "Day 3", carbs: 52, protein: 30, fat: 18 },
        { day: "Day 4", carbs: 52, protein: 30, fat: 18 },
    ],
    foodLog: [
      {
        time: "9:00 AM",
        meal: "Greek yogurt with honey",
        quantity: "1 cup",
        image: "/yogurt-honey.png",
        notes: "Low sugar",
      },
      {
        time: "2:00 PM",
        meal: "Tuna sandwich",
        quantity: "1 sandwich",
        image: "/tuna-sandwich.png",
        notes: "Whole wheat bread",
      },
    ],
    nutritionPlan: { currentPlan: "Balanced Diet" },
  },
  {
    id: "3",
    name: "Liam Harper",
    avatar: "/patient3.png",
    lastVisit: "3 days ago",
    medications: [],
    bloodSugarData: [
      { time: "8 AM", value: 140 },
      { time: "12 PM", value: 135 },
      { time: "4 PM", value: 145 },
      { time: "8 PM", value: 138 },
    ],
    macroData: [
      { day: "Day 1", carbs: 70, protein: 20, fat: 10 },
      { day: "Day 2", carbs: 65, protein: 25, fat: 10 },
       { day: "Day 3", carbs: 52, protein: 30, fat: 18 },
        { day: "Day 4", carbs: 52, protein: 30, fat: 18 },
    ],
    foodLog: [
      {
        time: "10:00 AM",
        meal: "Bagel with cream cheese",
        quantity: "1 piece",
        image: "/bagel.png",
        notes: "White bagel",
      },
    ],
    nutritionPlan: { currentPlan: "Low Sugar" },
  },
  {
    id: "4",
    name: "Ava Thompson",
    avatar: "/patient4.png",
    lastVisit: "2 days ago",
    medications: [
      { id: 1, name: "Vitamin D", dose: "2000 IU" },
    ],
    bloodSugarData: [
      { time: "8 AM", value: 95 },
      { time: "12 PM", value: 105 },
      { time: "4 PM", value: 100 },
      { time: "8 PM", value: 98 },
    ],
    macroData: [
      { day: "Day 1", carbs: 45, protein: 35, fat: 20 },
      { day: "Day 2", carbs: 40, protein: 40, fat: 20 },
       { day: "Day 3", carbs: 52, protein: 30, fat: 18 },
        { day: "Day 4", carbs: 52, protein: 30, fat: 18 },
    ],
    foodLog: [
      {
        time: "8:30 AM",
        meal: "Smoothie with spinach & berries",
        quantity: "1 glass",
        image: "/smoothie.png",
        notes: "No added sugar",
      },
    ],
    nutritionPlan: { currentPlan: "Plant-Based" },
  },
  {
    id: "5",
    name: "Noah Walker",
    avatar: "/patient5.png",
    lastVisit: "1 day ago",
    medications: [
      { id: 1, name: "Atorvastatin", dose: "20mg" },
    ],
    bloodSugarData: [
      { time: "8 AM", value: 125 },
      { time: "12 PM", value: 130 },
      { time: "4 PM", value: 128 },
      { time: "8 PM", value: 132 },
    ],
    macroData: [
      { day: "Day 1", carbs: 60, protein: 30, fat: 10 },
      { day: "Day 2", carbs: 55, protein: 35, fat: 10 },
       { day: "Day 3", carbs: 52, protein: 30, fat: 18 },
        { day: "Day 4", carbs: 52, protein: 30, fat: 18 },
    ],
    foodLog: [
      {
        time: "9:00 AM",
        meal: "Egg white omelette",
        quantity: "1 serving",
        image: "/omelette.png",
        notes: "With mushrooms and spinach",
      },
    ],
    nutritionPlan: { currentPlan: "Heart Healthy" },
  },
]


const NU_PatientProfile = () => {
  const { nutId, id } = useParams();

  const navigate = useNavigate()

  const patientInfo = allPatientsData.find((p) => p.id === id)

  const [activeTab, setActiveTab] = useState("overview")
  const [note, setNote] = useState("")

  const bloodSugarData = patientInfo?.bloodSugarData || []
  const macroData = patientInfo?.macroData || []
  const foodLog = patientInfo?.foodLog || []
  const medications = patientInfo?.medications || []
  const nutritionPlan = patientInfo?.nutritionPlan || { currentPlan: "" }

  const [avgBloodSugar, setAvgBloodSugar] = useState(0)
  const [sugarChangePercent, setSugarChangePercent] = useState(0)

  useEffect(() => {
    if (bloodSugarData.length > 0) {
      const values = bloodSugarData.map((d) => d.value)
      const avg = values.reduce((a, b) => a + b, 0) / values.length
      setAvgBloodSugar(Math.round(avg))

      const firstHalf = values.slice(0, values.length / 2)
      const secondHalf = values.slice(values.length / 2)

      const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
      const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length

      const change = ((avgSecond - avgFirst) / avgFirst) * 100
      setSugarChangePercent(Math.round(change))
    }
  }, [bloodSugarData])

  const goToAddMeal = () => console.log("Navigate to Add Meal page")
 const goToCreatePlan = () => navigate(`/nutritionist/${nutId}/patients/${id}/create-plan`);
const goToSelectPlan = () => navigate(`/nutritionist/${nutId}/patients/${id}/select-plan`);
const goToModifyPlan = () => navigate(`/nutritionist/${nutId}/patients/${id}/modify-plan`);
const goToChat = () => navigate(`/nutritionist/${nutId}/chat`);

  if (!patientInfo) return <div>Patient not found</div>

  return (
    <div className="NU-profile-m__dashboard-container">
      <Sidebar_Nut />
      <div className="NU-profile-m__main-content">
        <div className="NU-profile-m__header">
          <h1>Patient Profile</h1>
          <p>Manage patient information and treatment plans</p>
          <div className="NU-profile-m__user-profile">
            <div className="NU-profile-m__user-profile-content">
              <div className="NU-profile-m__avatar">
                <img src={patientInfo.avatar} alt={patientInfo.name} />
              </div>
              <div>
                <p className="NU-profile-m__user-name">{patientInfo.name}</p>
                <p className="NU-profile-m__user-id">Patient ID: {patientInfo.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="NU-profile-m__tabs">
          <div className="NU-profile-m__tabs-list">
            {["overview", "medication", "communication"].map((tab) => (
              <button
                key={tab}
                className={`NU-profile-m__tab-trigger ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div>
              {/* Monitoring */}
              <div className="NU-profile-m__monitoring-section">
                <h3>Monitoring</h3>
                <div className="NU-profile-m__monitoring-grid">
                  <div className="NU-profile-m__card">
                    <div className="NU-profile-m__card-header">
                      <div className="NU-profile-m__card-title">
                        Meal Times vs. Blood Sugar Levels
                      </div>
                      <div className="NU-profile-m__card-value">
                        <span className="NU-profile-m__card-value-main">
                          {avgBloodSugar} mg/dL
                        </span>
                        <span className="NU-profile-m__card-value-change">
                          Last 7 Days{" "}
                          {sugarChangePercent > 0
                            ? `+${sugarChangePercent}%`
                            : `${sugarChangePercent}%`}
                        </span>
                      </div>
                    </div>
                    <div className="NU-profile-m__card-content" style={{ height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={bloodSugarData}>
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#6b7582" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="NU-profile-m__card">
                    <div className="NU-profile-m__card-header">
                      <div className="NU-profile-m__card-title">
                        Macronutrient Distribution
                      </div>
                      <div className="NU-profile-m__card-value">
                        <span className="NU-profile-m__card-value-main">
                          Avg Carbs:{" "}
                          {Math.round(
                            macroData.reduce((a, b) => a + b.carbs, 0) / macroData.length
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="NU-profile-m__card-content" style={{ height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={macroData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="carbs" stackId="a" fill="#ffcc66" />
                          <Bar dataKey="protein" stackId="a" fill="#66ccff" />
                          <Bar dataKey="fat" stackId="a" fill="#ff6666" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Food Log */}
              <div className="NU-profile-m__food-log-section">
                <h3>Food Log</h3>
                <div className="NU-profile-m__card">
                  <div className="NU-profile-m__table-container">
                    <table className="NU-profile-m__food-table">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Meal</th>
                          <th>Quantity</th>
                          <th>Image</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foodLog.map((entry, i) => (
                          <tr key={i}>
                            <td>{entry.time}</td>
                            <td>{entry.meal}</td>
                            <td>{entry.quantity}</td>
                            <td>
                              <div className="NU-profile-m__avatar NU-profile-m__food-image">
                                <img src={entry.image} alt={entry.meal} />
                              </div>
                            </td>
                            <td>{entry.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="NU-profile-m__add-meal-container">
                    <button className="NU-profile-m__button" onClick={goToAddMeal}>
                      <span className="NU-profile-m__button-icon">➕</span>
                      Add Meal
                    </button>
                  </div>
                </div>
              </div>

              {/* Nutritional Plan */}
              <div className="NU-profile-m__nutritional-plan">
                <h3>Nutritional Plan</h3>
                <div className="NU-profile-m__card">
                  <div className="NU-profile-m__plan-content">
                    <p className="NU-profile-m__current-plan">
                      Current Plan: {nutritionPlan?.currentPlan}
                    </p>
                    <div className="NU-profile-m__plan-buttons">
                      <button className="NU-profile-m__plan-button" onClick={goToCreatePlan}>
                        Create New Plan
                      </button>
                      <button className="NU-profile-m__plan-button" onClick={goToSelectPlan}>
                        Select Plan from Library
                      </button>
                      <button className="NU-profile-m__plan-button" onClick={goToModifyPlan}>
                        Modify Current Plan
                      </button>
                    </div>
                    <div className="NU-profile-m__note-section">
                      <textarea
                        className="NU-profile-m__note-input"
                        placeholder="Add note about the patient..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <button className="NU-profile-m__note-send-button">Send Note</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medication Tab */}
          {activeTab === "medication" && (
            <div className="NU-profile-m__medication-section">
              <h3>Medications</h3>
              <ul className="NU-profile-m__medication-list">
                {medications.map((med) => (
                  <li key={med.id} className="NU-profile-m__medication-item">
                    <FaPills style={{ marginRight: "8px" }} />
                    <span>{med.name}</span> - <span>{med.dose}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Communication Tab */}
          {activeTab === "communication" && (
            <div className="NU-profile-m__communication-section">
              <h3>Communication</h3>
              <div className="NU-profile-m__comm-info">
                <div className="flex-image-h1">
                  <div className="NU-profile-m__avatar NU-profile-m__comm-avatar">
                    <img src={patientInfo.avatar} alt={patientInfo.name} />
                  </div>
                  <p className="NU-profile-m__comm-name">{patientInfo.name}</p>
                </div>
                <div className="NU-profile-m__comm-icons">
                  <button onClick={() => alert("Call patient")}>
                    <FiPhoneCall size={20} />
                  </button>
                  <button onClick={goToChat}>
                    <IoChatbubbleEllipsesOutline size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NU_PatientProfile
