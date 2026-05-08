import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './pages/Admin/Layout';

// Main Pages
import Home from './pages/Home/Home';
import SubsidyForm from './pages/Form/Subsidy_Form';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminContacts from './pages/Admin/Contacts';
import AdminSubsidies from './pages/Admin/Subsidies';

// 🔒 Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  // No token
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Validate token expiry
  try {
    const payload = JSON.parse(atob(token));

    if (!payload.exp || Date.now() > payload.exp) {
      localStorage.removeItem('adminToken');
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loading />}
      </AnimatePresence>

      <BrowserRouter>
        <Routes>
          {/* 🌐 Main Website */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="subsidy-form" element={<SubsidyForm />} />
          </Route>

          {/* 🔑 Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🔒 Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect /admin → /admin/dashboard */}
            <Route
              index
              element={<Navigate to="/admin/dashboard" replace />}
            />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="subsidies" element={<AdminSubsidies />} />
          </Route>

          {/* ❌ 404 Page Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
