import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Otp from '../pages/Auth/Otp';
import ResetPassword from '../pages/Auth/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import UserDetails from '../components/Users/UserDetails';
import Requests from "../pages/Requests";
import Subscription from '../pages/Subscription';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Landing from '../pages/Landing';
import Faq from '../components/Landing/Faq';
import PrivacyPolicy from '../components/Landing/PrivacyPolicy';
import TermsAndCondition from '../components/Landing/TermsAndCondition';
import CookiePolicy from '../components/Landing/CookiePolicy';
import UnderConstructionPage from '../pages/UnderConstructionPage';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem('letsmeetToken');
  // console.log(token)
  return token ? children : <Navigate to="/login" />;
};


const AllRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('letsmeetToken');
    if (token) {
      const decoded = jwtDecode<Partial<JwtPayload>>(token);
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('letsmeetToken'); // optional: clear expired token
        navigate('/login', { replace: true });
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<Otp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/faq" element={<Faq />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndCondition />} />
      <Route path="/cookies" element={<CookiePolicy />} />

      <Route path="/" element={<Navigate to='/dashboard' replace />} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/user-profile/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />

      <Route path="/requests" element={<ProtectedRoute> <Requests /></ProtectedRoute>} />
      <Route path="/subscriptions" element={<ProtectedRoute> <Subscription /> </ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute> <Reports /> </ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute>  <Settings />  </ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute> <Feedback /> </ProtectedRoute>} />

      <Route path="/construction" element={<UnderConstructionPage />} />
      {/* <Route path="/resources" element={<Navigate to='/construction' replace />} /> */}
    </Routes>
  );
}

export default AllRoutes