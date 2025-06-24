// AdminAuthContext.jsx
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AdminAuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
  adminInfo: null,
  showLogoutDialog: false,
  setAdminInfo: (state) => {},
  setShowLogoutDialog: (state) => {}
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/me`, { withCredentials: true });
        setIsAuthenticated(true);
        setAdminInfo(res.data); // Set admin name and email
      } catch (err) {
        console.error("❌ Not authenticated", err?.response?.data || err.message);
        setIsAuthenticated(false);
        setAdminInfo(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = async () => {
    await axios.get(`${BASE_URL}/admin/logout`, { withCredentials: true });
    setIsAuthenticated(false);
    setAdminInfo(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loading, adminInfo, showLogoutDialog, setAdminInfo, setShowLogoutDialog }}>
      {children}
    </AdminAuthContext.Provider>
  );
};