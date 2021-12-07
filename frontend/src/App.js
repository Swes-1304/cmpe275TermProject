
import UserRegister from './components/UserRegister/UserRegister'
import { Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route exact path='/userRegister' element={<UserRegister />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
