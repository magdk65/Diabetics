import { useEffect, useState } from "react"
import "./NutrDashboard.css"
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom";

export default function NutrDashboard() {
  const [patientsWithPlans, setPatientsWithPlans] = useState(150)
  const [urgentFollowUps, setUrgentFollowUps] = useState(5)
  const [doctorNotes, setDoctorNotes] = useState(12)
const { nutId } = useParams(); // استخراج معرف الأخصائي من الرابط

  const [latestFoodLogs, setLatestFoodLogs] = useState([
    { patient: "Liam Carter", lastLog: "2 days ago" },
    { patient: "Sophia Turner", lastLog: "1 day ago" },
    { patient: "Noah Bennett", lastLog: "3 days ago" },
  ])

  const [adherenceWeeks, setAdherenceWeeks] = useState([
    { label: "Week 1", rate: 60 },
    { label: "Week 2", rate: 75 },
    { label: "Week 3", rate: 80 },
    { label: "Week 4", rate: 90 },
  ])

  const [adherenceRate, setAdherenceRate] = useState(0)
  const [adherenceChange, setAdherenceChange] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("http://localhost:8000/api/dashboard")
        if (!res.ok) throw new Error("API Error")
        const data = await res.json()

        const weeks = data.adherenceWeeks ?? adherenceWeeks
        setPatientsWithPlans(data.patientsWithPlans ?? patientsWithPlans)
        setUrgentFollowUps(data.urgentFollowUps ?? urgentFollowUps)
        setDoctorNotes(data.doctorNotes ?? doctorNotes)
        setLatestFoodLogs(data.latestFoodLogs ?? latestFoodLogs)
        setAdherenceWeeks(weeks)

        // حساب النسبة والتغير تلقائياً
        if (weeks.length > 0) {
          const lastWeek = weeks[weeks.length - 1].rate
          const prevWeek = weeks.length > 1 ? weeks[weeks.length - 2].rate : 0
          setAdherenceRate(lastWeek)
          setAdherenceChange(lastWeek - prevWeek)
        }
      } catch (error) {
        console.warn("استخدام القيم الافتراضية لأن جلب البيانات فشل")
        // حساب النسبة والتغير من القيم الافتراضية
        const lastWeek = adherenceWeeks[adherenceWeeks.length - 1].rate
        const prevWeek = adherenceWeeks[adherenceWeeks.length - 2].rate
        setAdherenceRate(lastWeek)
        setAdherenceChange(lastWeek - prevWeek)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="nutr-dashboard-container">
        <main className="nutr-main-content">
          <h1 className="nutr-main-title">Nutr Dashboard</h1>
          <p className="nutr-muted-text">Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="nutr-dashboard-container">
      <div className="nutr-main-content">
         <Sidebar_Nut nutId={nutId} />
        <div className="flex-nut-dashboardp">
          <h1 className="nutr-main-title">Nutr Dashboard</h1>

           <div className="nutr-info-cards">
            <div className="nutr-info-card">
              <h2 className="nutr-card-title">Patients with Plans</h2>
              <p className="nutr-card-value">{patientsWithPlans}</p>
            </div>
            <div className="nutr-info-card">
              <h2 className="nutr-card-title">Urgent Follow-ups</h2>
              <p className="nutr-card-value">{urgentFollowUps}</p>
            </div>
            <div className="nutr-info-card">
              <h2 className="nutr-card-title">Doctor Notes</h2>
              <p className="nutr-card-value">{doctorNotes}</p>
            </div>
          </div>

          {/* Latest Food Logs */}
          <h2 className="nutr-section-title">Latest Food Logs</h2>
          <div className="nutr-food-logs-card">
            <table className="nutr-food-logs-table">
              <thead>
                <tr className="nutr-table-header-row">
                  <th className="nutr-table-header-cell">Patient</th>
                  <th className="nutr-table-header-cell text-right">Last Food Log</th>
                </tr>
              </thead>
              <tbody>
                {latestFoodLogs.map((log, index) => (
                  <motion.tr
                    key={index}
                    className={`nutr-table-row ${index === latestFoodLogs.length - 1 ? "nutr-no-border" : ""}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                  >
                    <td className="nutr-table-cell">{log.patient}</td>
                    <td className="nutr-table-cell text-right nutr-muted-text">{log.lastLog}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Plan Adherence */}
          <h2 className="nutr-section-title">Plan Adherence</h2>
          <div className="nutr-adherence-card">
            <h2 className="nutr-card-title">Plan Adherence Rate</h2>
            <div className="nutr-adherence-rate-info">
              <p className="nutr-adherence-rate-value">{adherenceRate}%</p>
              <span className="nutr-adherence-rate-period">Last 4 Weeks</span>
              <span className="nutr-adherence-rate-change">
                {adherenceChange > 0 ? "+" : ""}
                {adherenceChange}%
              </span>
            </div>

            {/* المخطط بالأعمدة */}
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <BarChart
                  data={adherenceWeeks}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  barCategoryGap="50%"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar
                    dataKey="rate"
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                    isAnimationActive={true} // تفعيل الأنيميشن
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
