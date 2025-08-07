import React, { useState, useEffect } from 'react';
import Overview from './Overview';
import Medication from './Medication';
import Communication from './Communication';
import TreatmentPlans from './TreatmentPlans';
import '../PatientDashboard_Data/PatientDashboard.css';
import SidebarCustom from '../SidebarCustom/SidebarCustom';

const defaultPatientInfo = {
  name: 'Olivia Bennett',
  avatar: '/professional-woman-portrait.png',
  diagnosis: 'Type 2 Diabetes',
  notes: 'No notes available',
};

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات افتراضية - سيتم جلبها لاحقًا من API
  const [patientInfo, setPatientInfo] = useState(defaultPatientInfo);

  // بيانات Overview
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
  { day: 'Sat', steps: 6000 }
],

    appointments: [],
  });


  // بيانات الأدوية
  const [medications, setMedications] = useState([
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
  ]);

  // خطط العلاج
  const [treatmentPlans, setTreatmentPlans] = useState({
    medical: "Regular check-ups every 3 months. Blood tests to monitor sugar levels. Adjust medication as needed.",
    nutritional: "Low carb diet. Focus on whole foods, lean proteins, and vegetables. Limit sugary drinks and processed foods.",
    exercise: "30 minutes of moderate exercise 5 times a week. Include a mix of cardio and strength training."
  });

  return (
    <div className="dashboard-container-dash-p">
        <SidebarCustom/>
        <div className="flex-dashboard-ppp">
            <h2>Patient Profile</h2>
            <span>Manage patient information and treatment plans</span>
                  <div className="card-patient-info-hh">
        <div className="card-content-h">
          <img className="patient-avatar" src={patientInfo.avatar} alt='' />
          <div className="patient-details">
            <h2>{patientInfo.name}</h2>
            <p><strong>Diagnosis:</strong> {patientInfo.diagnosis}</p>
            <p><strong>Notes:</strong> {patientInfo.notes}</p>
          </div>
        </div>
      </div>
      {/* محتوى التاب المختار */}
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
          <Overview
            patientInfo={patientInfo}
            overviewData={overviewData}
            treatmentPlans={treatmentPlans}
          />
        )}
        
        {activeTab === 'medication' && (
          <Medication medications={medications} />
        )}
        {activeTab === 'communication' && (
          <Communication patientInfo={patientInfo} />
        )}
      </div>

      {/* خطط العلاج تظهر دائمًا في الأسفل */}
      <TreatmentPlans treatmentPlans={treatmentPlans} />
      </div>
    </div>
  );
};

export default PatientDashboard;
