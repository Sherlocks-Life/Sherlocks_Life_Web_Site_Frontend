import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// ✅ SIMPLE TOKEN CHECK
const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};

// Protected Route
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Routes>

        {/* 🌐 MAIN WEBSITE */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="subsidy-form" element={<SubsidyForm />} />
        </Route>

        {/* 🔐 ADMIN LOGIN (public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🔒 ADMIN PANEL (protected) */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>

          {/* default redirect */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="subsidies" element={<AdminSubsidies />} />

        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
};

export default App;