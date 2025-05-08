import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Otp from '../pages/Auth/Otp';
import ResetPassword from '../pages/Auth/ResetPassword';
import Dashboard from '../pages/Dashboard';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/" element={<Navigate to='/dashboard' replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default AllRoutes