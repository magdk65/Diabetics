import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HealthTrackerWelcome from './components/Patient/HealthTrackerWelcome/HealthTrackerWelcome';
import LoginForm from './components/Patient/LoginForm/LoginForm';
import RegisterForm from './components/Patient/RegisterForm/RegisterForm';
import HealthGoals from './components/Patient/HealthGoals/HealthGoals';
import DiabetoXGoals from './components/Patient/DiabetoXGoals/DiabetoXGoals';
import Dashboard from './components/Patient/Dashboard/Dashboard';
import ProfilePage from './components/Patient/ProfilePage/ProfilePage';
import EditProfilePage from './components/Patient/EditProfilePage/EditProfilePage';
import MedicalDashboard from './components/Patient/MedicalDashboard/MedicalDashboard';
import AddMedical from './components/Patient/AddMedical/AddMedical';
import EmergencyPage from './components/Patient/EmergencyPage/EmergencyPage';
import CareTeamDashboard from './components/Patient/CareTeamDashboard/CareTeamDashboard';

import HealthcareLogin from './components/Doctor/HealthcareLogin/HealthcareLogin';
import DiabetesDashboard_Child from './components/Child_Patient/DiabetesDashboard_Child/DiabetesDashboard/DiabetesDashboard_Child';
import BloodSugarLogger from './components/Child_Patient/DiabetesDashboard_Child/BloodSugarLogger/BloodSugarLogger';
import DiabetoX from './components/Child_Patient/DiabetesDashboard_Child/DiabetoX/DiabetoX';
import NotificationProvider from './components/Child_Patient/DiabetesDashboard_Child/NotificationProvider/NotificationProvider';
import BloodSugarReminder from './components/Child_Patient/DiabetesDashboard_Child/BloodSugarReminder/BloodSugarReminder';
import Patients_page from './components/Nutritionist/Patients_page/Patients_page';
import HealthDashboard from './components/Parent_Child/HealthDashboard/HealthDashboard';
import NutritionDashboard from './components/Nutritionist/NutritionDashboard/NutritionDashboard/NutritionDashboard';
import NuProfileDashboard from './components/Nutritionist/NutritionDashboard/NuProfileDashboard/NuProfileDashboard';
import View_Plan_P from './components/Nutritionist/View_Plan_P/View_Plan_P';
import HealthcareDashboard from './components/Nutritionist/HealthcareDashboard/HealthcareDashboard';
import PNDashboard from './components/Nutritionist/PNDashboard/PNDashboard';
import DiabetesResources from './components/Nutritionist/DiabetesResources/DiabetesResources';
import ParentAlerts from './components/Parent_Child/ParentAlerts/ParentAlerts';
import CareTeamApp from './components/Parent_Child/CareTeamApp/CareTeamApp';
import AppointmentBooking from './components/Parent_Child/AppointmentBooking/AppointmentBooking';
import MealPlanDashboard from './components/Nutritionist/NutritionDashboard/MealPlanDashboard/MealPlanDashboard';
import HealthcareRegister from './components/Doctor/HealthcareRegister/HealthcareRegister';
import HealthcareProviderRegister from './components/Doctor/HealthcareProviderRegister/HealthcareProviderRegister';
import NU_NDashboard from './components/Nutritionist/NUDashboard/NUDashboard';
import PatientsListPage from './components/Nutritionist/PatientsListPage/PatientsListPage';
import NutrDashboard from './components/Nutritionist/NutrDashboard/NutrDashboard';
import NutMeal from './components/Nutritionist/NutMeal/NutMeal';
import N_SettingsPage from './components/Nutritionist/NutMeal/N_SettingsPage/N_SettingsPage';
import NU_PatientProfile from './components/Nutritionist/NU_PatientProfile/NU_PatientProfile';
import EditNutrition_Dashboard from './components/Nutritionist/EditNutrition_Dashboard/EditNutrition_Dashboard';
import MealPlanLibrary from './components/Nutritionist/MealPlanLibrary/MealPlanLibrary';
import PatientNutritionPlanPage from './components/Nutritionist/MealPlanLibrary/PatientNutritionPlanPage/PatientNutritionPlanPage';
import HealthcareChat from './components/Nutritionist/HealthcareChat/HealthcareChat';
import NutritionPlanCreatorPage from './components/Nutritionist/NutritionPlanCreatorPage/NutritionPlanCreatorPage';
import DashboardCoach from './components/Coach/DashboardCoach/DashboardCoach';
import FitTrackDashboard from './components/Coach/TrakDashboard/FitTrackDashboard';
import FitnessPlanner from './components/Coach/FitnessPlanner/FitnessPlanner';
import { SettingsContent } from './components/Coach/SettingsContent/SettingsContent';
import ChatApp from './components/Coach/ChatApp/ChatApp';
import Dr_Dashboard from './components/Doctor/Dr_Dashboard/Dr_Dashboard';
import PatientList from './components/Doctor/PatientList/PatientList';
import AppointmentScheduler from './components/Doctor/AppointmentScheduler/AppointmentScheduler';
import AppointmentsDashboard from './components/Doctor/AppointmentsDashboard/AppointmentsDashboard';
import PatientDashboard from './components/Doctor/PatientDashboard_Data/PatientDashboard';
import MedicationForm from './components/Doctor/MedicationForm/MedicationForm';
import TreatmentPlan from './components/Doctor/TreatmentPlan/TreatmentPlan';
import NutritionalPlan from './components/Doctor/NutritionalPlan/NutritionalPlan';
import ExercisePlan from './components/Doctor/ExercisePlan/ExercisePlan';
import Doctor_Setting from './components/Doctor/Doctor_Setting/Doctor_Setting';
import Document_P from './components/Doctor/Document_P/Document_P';
import CoachDashboard from './components/Coach/CoachDashboard/CoachDashboard';


function App() {
  const user = localStorage.getItem('role');

  return (
    <NotificationProvider>
      <Routes>
        <Route path='/' element={<HealthTrackerWelcome/>}/>
        <Route path='/login_p'element={<LoginForm/>}/>
        <Route path='/register_p' element={<RegisterForm/>}/>
        <Route path={'/healthgoals_p'} element={<HealthGoals/>}/>
        <Route path={'/healthgoals2_p'} element={<DiabetoXGoals/>}/>
        <Route path='/dashborad_p' element={<Dashboard/>}/>
        <Route path='/Profile_p' element={<ProfilePage/>}/>
        <Route path='/editprofilepage' element={<EditProfilePage/>}/>
        <Route path='/medicaldashboard' element={<MedicalDashboard/>}/>
        <Route path='/medicaldashboard/addmedical' element={<AddMedical/>}/>
        <Route path='/emergencypage' element={<EmergencyPage/>}/>
        <Route path='/careteamdashboard' element={<CareTeamDashboard/>}/>


        {/**واجهات الدكتور بعد التعديل */}
        <Route path='/register' element={<HealthcareRegister/ >}/>
        <Route path='/register2' element={<HealthcareProviderRegister/>}/>
        <Route path='/login' element={<HealthcareLogin/>}/>
        <Route path='/MedicationForm' element={<MedicationForm/>}/>
        <Route path="/doctor/:doctorId/patients/:patientId/add-medication" element={<MedicationForm />} />

        <Route path="/doctor/:doctorId/dashboard" element={<Dr_Dashboard />} />
        <Route path="/doctor/:doctorId/documents" element={<Document_P />} />
        <Route path="/doctor/:doctorId/appointments" element={<AppointmentsDashboard />} />
        <Route path='/doctor/:doctorId/Appointment' element={<AppointmentScheduler/>}/>
        <Route path="/doctor/:doctorId/patients" element={<PatientList />} />
        <Route path="/doctor/:doctorId/patients/:id" element={<PatientDashboard />} />
        <Route path="/doctor/:doctorId/settings" element={<Doctor_Setting />} />
        <Route path='/doctor/:doctorId/patients/:id/treatment-plan' element={<TreatmentPlan />} />
        <Route path='/doctor/:doctorId/patients/:id/nutritional-plan' element={<NutritionalPlan />} />
        <Route path='/doctor/:doctorId/patients/:id/exercise-plan' element={<ExercisePlan />} />




        <Route path='/dashboard_child' element={<DiabetesDashboard_Child/>}/>
        <Route path='/bloodsugarlogger' element={<BloodSugarLogger/>}/>
        <Route path='/food-child' element={<DiabetoX/>}/>
        <Route path='/bloodsugarreminder' element={<BloodSugarReminder/>}/>
        
        <Route path='/ssq' element={<Patients_page/>}/>
        <Route path='/nutritiondashboard'element={<NutritionDashboard/>}/>
        <Route path='/nuprofiledashboard' element={<NuProfileDashboard/>}/>
        <Route path='/viewplanp' element={<View_Plan_P/>}/>
        <Route path='/healthcaredashboard' element={<HealthcareDashboard/>}/>
        <Route path='/pndashboard' element={<PNDashboard/>}/>
        <Route path='/diabetesresources' element={<DiabetesResources/>}/>
        <Route path='/mealplandashboard' element={<MealPlanDashboard/>}/>
        <Route path='/nu_ndashboard' element={<NU_NDashboard/>}/>

          {/* قسم المعدل*/}
       
        
        {/** <Route path="/coach/:coachId/patient/:patientId/view" element={<ViewPatientPage />} />
       <Route path="/coach/:coachId/patient/:patientId/edit" element={<EditPatientPage />} />
 */}   
      
      <Route path='/CoachDashboard/:CoachID'element={<CoachDashboard/>}/>
       <Route path='/ProfilePleaer' element={<FitTrackDashboard/>}/>
       <Route path='/q' element={<FitnessPlanner/>}/>
       <Route path='/Setting/:CoachID' element={<SettingsContent/>}/>
       <Route path='/Chat/:CoachID' element={<ChatApp/>}/>
       <Route path='/chat/:id' element={<ChatApp/>}/>


        <Route path="/nutritionist/:nutId/dashboard" element={<NutrDashboard />} />// 1. لوحة تحكم الأخصائي
        <Route path="/nutritionist/:nutId/patients" element={<PatientsListPage />} />// 2. قائمة المرضى للأخصائي
        <Route path="/nutritionist/:nutId/settings" element={<N_SettingsPage />} />// 3. صفحة إعدادات الأخصائي
        <Route path="/nutritionist/:nutId/meals" element={<NutMeal />} />// 4. صفحة الوجبات أو وصفات الأخصائي
        <Route path="/nutritionist/:nutId/patients/:id" element={<NU_PatientProfile />} />// 5. صفحة بروفايل المريض
        <Route path="/nutritionist/:nutId/patients/:id/modify-plan" element={<EditNutrition_Dashboard />} />// 6. تعديل خطة التغذية للمريض
        <Route path="/nutritionist/:nutId/patients/:id/select-plan" element={<MealPlanLibrary />} />// 7. اختيار خطة غذائية للمريض من المكتبة
        <Route path="/nutritionist/:nutId/patients/:id/create-plan" element={<PatientNutritionPlanPage />} />// 8. إنشاء خطة غذائية جديدة للمريض
        <Route path="/nutritionist/:nutId/chat" element={<HealthcareChat />} />// 9. صفحة اختيار المريض للدردشة (تُظهر قائمة المرضى فقط)
        <Route path="/nutritionist/:nutId/patient/:id/chat" element={<HealthcareChat />} />// 10. صفحة الدردشة مع مريض معيّن
        <Route path="/NutritionPlanCreatorPage/view/:planId" element={<NutritionPlanCreatorPage readOnly={true} />} />
        <Route path="/NutritionPlanCreatorPage/edit/:planId" element={<NutritionPlanCreatorPage />} />



        <Route path='/healthcarechat' element={<HealthcareChat/>}/>


        <Route path='/qqqqq' element={<HealthDashboard/>}/>
        <Route path='/parentalerts' element={<ParentAlerts/>}/>
        <Route path='/care-team' element={<CareTeamApp/>}/>
        <Route path='/appointmentbooking' element={<AppointmentBooking/>}/>

      </Routes>
      </NotificationProvider>
  );
}

export default App;
