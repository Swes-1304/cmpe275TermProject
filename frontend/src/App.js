
import UserRegister from './components/UserRegister/UserRegister'
import { Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login'
import AdminDashboard from './components/AdminDashboard/AdminDashboard';




function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route exact path='/userRegister' element={<UserRegister />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/adminDashboard' element={<AdminDashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
