import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../../../../components/common/Loader';
import { useAdminAuth } from '../../../../contexts/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  
  if (loading) return <Loader/>
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return children;
};

export default AdminProtectedRoute;
