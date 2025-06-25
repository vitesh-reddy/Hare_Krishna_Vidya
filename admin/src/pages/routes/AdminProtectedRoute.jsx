import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Loader from '../../components/common/Loader';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  
  if (loading) return <Loader/>
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default AdminProtectedRoute;
