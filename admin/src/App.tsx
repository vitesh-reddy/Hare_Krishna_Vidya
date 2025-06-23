import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { GroceryItemAdminProvider } from './contexts/GroceryItemAdminContext';
import { KitAdminProvider } from './contexts/KitAdminContext';
import { BlogAdminProvider } from './contexts/BlogAdminContext';

import { JobAdminProvider } from './contexts/JobContextAdmin';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import AuthPage from './pages/auth-pages/AuthPage';
import ResetPassword from './pages/auth-pages/ResetPassword';
import AdminProtectedRoute from './pages/routes/AdminProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const AdminRoutes = () => {
  return (
    <>
      <ScrollToTop />
        <Toaster/>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/reset-password" element={ <ResetPassword/> } />
          <Route path="/" element={ <AdminMain/> } />
          <Route path="*" element={ <NotFound/>} />
        </Routes>
    </>
  );
};

const App = () => <AdminRoutes />

const AdminMain = () => {
  return (
      <GroceryItemAdminProvider>        
      <AdminAuthProvider>
      <KitAdminProvider>
      <BlogAdminProvider>
      <JobAdminProvider>
      <AdminProtectedRoute>
          <AdminDashboard />
      </AdminProtectedRoute>
      </JobAdminProvider>
      </BlogAdminProvider>
      </KitAdminProvider>
      </AdminAuthProvider> 
      </GroceryItemAdminProvider>   
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // force scroll to top on route change
  }, [pathname]);

  return null;
};

export default App;