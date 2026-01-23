import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './auth-context';
import type { UserData, AuthContextType } from './auth-types';

interface JwtPayload {
  id?: string;
  role?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  schoolName?: string;
  currentSession?: {
    _id: string;
    academicSession: string;
    term: string;
    startDate: string;
    endDate: string;
  };
  profilePic?: string;
  studentClass?: {
    _id: string;
    className: string;
    level: string;
    section: string;
  };
  isVerified?: boolean;
  isPrincipal?: boolean;
  isFinancialOfficer?: boolean;
  iat: number;
  exp?: number;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // console.log(user)

  useEffect(() => {
    const token = localStorage.getItem('letsmeetToken');
    // console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode<Partial<JwtPayload>>(token);
        setUser({
          id: decoded.id || '',
          role: decoded.role || '',
          fullName: decoded.fullName,
          email: decoded.email || '',
          phoneNumber: decoded.phoneNumber || '',
          schoolName: decoded.schoolName || '',
          currentSession: decoded.currentSession!,
          profilePic: decoded.profilePic || '',
          studentClass: decoded.studentClass,
          isVerified: decoded.isVerified,
          isPrincipal: decoded.isPrincipal,
          isFinancialOfficer: decoded.isFinancialOfficer,
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        // localStorage.removeItem('letsmeetToken');
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('letsmeetToken');
    if (token) {
      const decoded = jwtDecode<Partial<JwtPayload>>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        logout();
      }
    }
  })


  useEffect(() => {
    const token = localStorage.getItem("letsmeetToken");
    if (token) {

      const decoded = jwtDecode<Partial<any>>(token);
      const expiry = decoded.exp ? decoded.exp * 1000 : null;

      if (expiry && expiry < Date.now()) {
        logout();
      } else if (expiry) {
        const timeout = expiry - Date.now() - 2 * 60 * 1000;
        refreshIntervalRef.current = setTimeout(() => {
          logout();
        }, Math.max(timeout, 0));
      }
    }

    return () => {
      if (refreshIntervalRef.current) clearTimeout(refreshIntervalRef.current);
    };
  }, []);

  const login = (token: string) => {
    localStorage.setItem('letsmeetToken', token);
    const decoded = jwtDecode<Partial<JwtPayload>>(token);
    setUser({
      id: decoded.id || '',
      role: decoded.role || '',
      fullName: decoded.fullName,
      email: decoded.email || '',
      phoneNumber: decoded.phoneNumber || '',
      schoolName: decoded.schoolName || '',
      currentSession: decoded.currentSession!,
      profilePic: decoded.profilePic || '',
      studentClass: decoded.studentClass,
      isVerified: decoded.isVerified,
      isPrincipal: decoded.isPrincipal,
      isFinancialOfficer: decoded.isFinancialOfficer,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('letsmeetToken');
    sessionStorage.removeItem('activeNavItem');
    sessionStorage.removeItem('filters');
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}