import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './auth-context';
import type { UserData, AuthContextType } from './auth-types';

interface JwtPayload {
  Subject: string;
  name: string;
  UserId: string;
  EmailAddress: string;
  UserName: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('letsmeetToken');
    console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode<Partial<JwtPayload>>(token);
        console.log(decoded)
        setUser({
          Subject: decoded.Subject || '',
          name: decoded.name || '',
          id: decoded.UserId || '',
          EmailAddress: decoded.EmailAddress || '',
          UserName: decoded.UserName || '',
          nbf: decoded.nbf || 0,
          exp: decoded.exp || 0,
          iat: decoded.iat || 0,
          iss: decoded.iss || '',
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        // localStorage.removeItem('letsmeetToken');
      }
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('letsmeetToken');
  //   if (token) {
  //     const decoded = jwtDecode<Partial<JwtPayload>>(token);
  //     if (decoded.exp && decoded.exp * 1000 < Date.now()) {
  //       logout();
  //     }
  //   }
  // })


  // useEffect(() => {
  //   const token = localStorage.getItem("letsmeetToken");
  //   if (token) {

  //     const decoded = jwtDecode<Partial<any>>(token);
  //     const expiry = decoded.exp ? decoded.exp * 1000 : null;

  //     if (expiry && expiry < Date.now()) {
  //       logout();
  //     } else if (expiry) {
  //       const timeout = expiry - Date.now() - 2 * 60 * 1000;
  //       refreshIntervalRef.current = setTimeout(() => {
  //         logout();
  //       }, Math.max(timeout, 0));
  //     }
  //   }

  //   return () => {
  //     if (refreshIntervalRef.current) clearTimeout(refreshIntervalRef.current);
  //   };
  // }, []);

  const login = (token: string) => {
    localStorage.setItem('letsmeetToken', token);
    const decoded = jwtDecode<Partial<JwtPayload>>(token);
    setUser({
      Subject: decoded.Subject || '',
      name: decoded.name || '',
      id: decoded.UserId || '',
      EmailAddress: decoded.EmailAddress || '',
      UserName: decoded.UserName || '',
      nbf: decoded.nbf || 0,
      exp: decoded.exp || 0,
      iat: decoded.iat || 0,
      iss: decoded.iss || '',
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