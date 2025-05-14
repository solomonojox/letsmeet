import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('letsmeetUserId');
  return token ? children : <Navigate to="/login" />;
};

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<Navigate to='/dashboard' replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/user/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />

      <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
      <Route path="/subscriptions" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
    </Routes>
  )
}

export default AllRoutes