import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
// import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Otp from './pages/Auth/Otp';
import ResetPassword from './pages/Auth/ResetPassword';

function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<UpgradePage />} /> */}
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<HomePage />} />
      
    </Routes>
  );
}

export default App
