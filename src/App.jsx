import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home/Home';
import SubsidyForm from './pages/Form/Subsidy_Form';
import Loading from './components/ui/Loading';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminLayout from './pages/Admin/Layout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminContacts from './pages/Admin/Contacts';
import AdminSubsidies from './pages/Admin/Subsidies';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;

  // Validate token expiry
  try {
    const payload = JSON.parse(atob(token));
    if (!payload.exp || Date.now() > payload.exp) {
      localStorage.removeItem('adminToken');
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <BrowserRouter>
        <Routes>
          {/* Main Website */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="subsidy-form" element={<SubsidyForm />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="subsidies" element={<AdminSubsidies />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App; 