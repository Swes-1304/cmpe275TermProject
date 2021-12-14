import React, { useState } from "react";
import UserRegister from './components/UserRegister/UserRegister'
import { Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login'
import CommonDashboard from './components/CommonDashboard/CommonDashboard';
import ViewClinic from './components/ViewClinic/ViewClinic';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import AddClinic from './components/AddClinic/AddClinic';
import AddDisease from './components/AddDisease/AddDisease'
import AddVaccination from './components/AddVaccination/AddVaccination';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import BookAppointmentPage from './components/BookAppointmentPage/BookAppointmentPage';
import AppointmentHistory from './components/Appointment History/AppointmentHistory';

export const ThemeContext=React.createContext()


function App() {
  const [systemTime,setSystemTime]=useState(new Date());
  const[mimicTime, toggleMimicTime] = useState(false);

  function toggleTheme()
  {

  }
  return (
    <ThemeContext.Provider value={{systemTime, setSystemTime, mimicTime, toggleMimicTime}}>
      <BrowserRouter>
          <Routes>
          <Route exact path='/userRegister' element={<UserRegister />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/commonDashboard' element={<CommonDashboard />} />
          <Route exact path='/viewClinic' element={<ViewClinic />} />
          <Route exact path='/adminNavbar' element={<AdminNavbar />} />
          <Route exact path='/adminDashboard' element={<AddClinic />} />
          <Route exact path='/addDisease' element={<AddDisease />} />
          <Route exact path='/addVaccination' element={<AddVaccination />} />
          <Route exact path='/patientDashboard' element={<PatientDashboard />} />
          <Route exact path='/bookAppointment' element={<BookAppointmentPage />} />
          <Route exact path='/appointmentHistory' element={<AppointmentHistory />} />
          </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
