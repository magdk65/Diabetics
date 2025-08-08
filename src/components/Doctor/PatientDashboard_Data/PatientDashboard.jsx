import React, { useState, useEffect } from 'react'
import Overview from './Overview'
import Medication from './Medication'
import Communication from './Communication'
import TreatmentPlans from './TreatmentPlans'
import SidebarCustom from '../SidebarCustom/SidebarCustom'
import AppointmentsTable from './AppointmentsTable'
import MonthCalendar from './MonthCalendar'
import './PatientDashboard.css'  // تأكد من مسار ملف CSS

const defaultPatientInfo = {
  name: 'Olivia Bennett',
  avatar: '/professional-woman-portrait.png',
  diagnosis: 'Type 2 Diabetes',
  notes: 'No notes available',
}

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [patientInfo] = useState(defaultPatientInfo)
  const [appointments, setAppointments] = useState([])

  const [medications] = useState([
    { id: 1, name: "Metformin", dosage: "500mg", frequency: "Twice daily", notes: "Take with meals" },
    { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", notes: "Take in the morning" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", notes: "Take at night" },
  ])

  const monthName = (m) => {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ][m]
  }

  // بيانات Overview الافتراضية
  const [overviewData] = useState({
    sugarLevel: 120,
    sugarChange: 5,
    weight: 150,
    weightChange: -2,
    steps: 5000,
    stepsChange: 10,
    sugarChartData: [
      { day: 'Day 1', value: 110 },
      { day: 'Day 5', value: 115 },
      { day: 'Day 10', value: 120 },
      { day: 'Day 15', value: 130 },
      { day: 'Day 20', value: 118 },
      { day: 'Day 25', value: 105 },
      { day: 'Day 30', value: 122 },
    ],
    weightChartData: [
      { week: 'Week 1', value: 152 },
      { week: 'Week 2', value: 151 },
      { week: 'Week 3', value: 150 },
      { week: 'Week 4', value: 149 },
    ],
    stepsChartData: [
      { day: 'Sun', steps: 4200 },
      { day: 'Mon', steps: 4800 },
      { day: 'Tue', steps: 5100 },
      { day: 'Wed', steps: 5300 },
      { day: 'Thu', steps: 5000 },
      { day: 'Fri', steps: 5500 },
      { day: 'Sat', steps: 6000 },
    ],
  })

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  useEffect(() => {
    // محاكاة جلب بيانات المواعيد
    const fetchAppointments = async () => {
      const data = [
        { date: '2025-08-06', time: '10:00 AM', type: 'Checkup', status: 'Scheduled' },
        { date: '2025-08-15', time: '11:00 AM', type: 'Follow-up', status: 'Completed' },
        { date: '2025-08-25', time: '09:00 AM', type: 'Consultation', status: 'Scheduled' },
      ]
      setAppointments(data)
    }
    fetchAppointments()
  }, [])

  // استخراج الأيام التي فيها مواعيد لهذا الشهر والسنة
  const appointmentDays = appointments
    .filter(a => {
      const d = new Date(a.date)
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    })
    .map(a => new Date(a.date).getDate())

  // اليوم المحدد في التقويم (أول يوم فيه موعد)
  const selectedDay = appointmentDays.length > 0 ? appointmentDays[0] : null

  return (
    <div className="dashboard-container-dash-p">
      <SidebarCustom />
      <div className="flex-dashboard-ppp">
        <h2>Patient Profile</h2>
        <span>Manage patient information and treatment plans</span>

        <div className="card-patient-info-hh">
          <div className="card-content-h">
            <img className="patient-avatar" src={patientInfo.avatar} alt={patientInfo.name} />
            <div className="patient-details">
              <h2>{patientInfo.name}</h2>
              <p><strong>Diagnosis:</strong> {patientInfo.diagnosis}</p>
              <p><strong>Notes:</strong> {patientInfo.notes}</p>
            </div>
          </div>
        </div>

        {/* تبويبات */}
        <div className="tab-content-hhh">
          <div className="tabs-container-hh">
            <div className="tabs-list-hh">
              <button
                className={`tab-trigger ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`tab-trigger ${activeTab === 'medication' ? 'active' : ''}`}
                onClick={() => setActiveTab('medication')}
              >
                Medication
              </button>
              <button
                className={`tab-trigger ${activeTab === 'communication' ? 'active' : ''}`}
                onClick={() => setActiveTab('communication')}
              >
                Communication
              </button>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              <Overview overviewData={overviewData} />

              <MonthCalendar
                year={currentYear}
                month={currentMonth}
                selected={selectedDay ? { year: currentYear, month: currentMonth, day: selectedDay } : null}
                title={`${monthName(currentMonth)} ${currentYear}`}
                appointmentDays={appointmentDays}
              />

              <AppointmentsTable appointments={appointments} />
            </>
          )}

          {activeTab === 'medication' && <Medication medications={medications} />}
          {activeTab === 'communication' && <Communication patientInfo={patientInfo} />}
        </div>

        <TreatmentPlans treatmentPlans={{}} />
      </div>
    </div>
  )
}

export default PatientDashboard
