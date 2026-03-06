import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import ViewReferral from '../components/Referral/ViewReferral';

const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem('letsmeetToken');
  // console.log(token)
  return token ? children : children
  // <Navigate to="/login" />;
};


const AllRoutesBusiness = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('letsmeetToken');
    if (token) {
      const decoded = jwtDecode<Partial<JwtPayload>>(token);
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('letsmeetToken'); // optional: clear expired token
        sessionStorage.removeItem("currentRegSidebarPath")
        navigate('/login', { replace: true });
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to='/business-dashboard' replace />} />
      <Route path="/business-dashboard" element={<ProtectedRoute> <ViewReferral /> </ProtectedRoute>} />
      {/* <Route path="/resources" element={<Navigate to='/construction' replace />} /> */}
    </Routes>
  );
}

export default AllRoutesBusiness