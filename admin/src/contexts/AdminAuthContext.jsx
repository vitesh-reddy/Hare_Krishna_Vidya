import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; 

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/me'); 
        setIsAuthenticated(true);
        setAdminInfo(res.data);
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
    await axiosInstance.get('/logout');
    setIsAuthenticated(false);
    setAdminInfo(null);
  };

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      loading,
      adminInfo,
      showLogoutDialog,
      setAdminInfo,
      setShowLogoutDialog
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
