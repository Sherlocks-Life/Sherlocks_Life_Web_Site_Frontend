import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Admin Credentials (client-side) ───────────────────────── */
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'sherlock@2026';

/* ─── Simple token generator (not a real JWT — just a marker) ─ */
const generateToken = (identity) =>
  btoa(JSON.stringify({ identity, ts: Date.now(), exp: Date.now() + 86400000 }));

const AdminLogin = () => {
  const [authMode, setAuthMode] = useState('credentials'); // only credentials
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ─── Username / Password Login ─────────────────────────── */
  const handleCredentialLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Small timeout to show the loading animation
    setTimeout(() => {
      if (
        formData.username === ADMIN_USERNAME &&
        formData.password === ADMIN_PASSWORD
      ) {
        const token = generateToken(ADMIN_USERNAME);
        localStorage.setItem('adminToken', token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
      }
      setLoading(false);
    }, 800);
  };


  return (
    <div
      className="admin-login-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '45%',
          height: '45%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse-slow 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '45%',
          height: '45%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse-slow 6s ease-in-out infinite 3s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px',
          padding: '48px 40px',
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{
              width: '72px',
              height: '72px',
              background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 12px 32px rgba(99,102,241,0.3)',
            }}
          >
            <Shield color="#fff" size={34} />
          </motion.div>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.5px',
              margin: 0,
            }}
          >
            Admin Portal
          </h2>
          <p
            style={{
              color: 'rgba(148,163,184,0.8)',
              marginTop: '8px',
              fontSize: '13px',
              letterSpacing: '0.5px',
            }}
          >
            Secure access for authorized personnel only
          </p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              style={{
                marginBottom: '24px',
                padding: '14px 16px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#f87171',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Mode Tabs (removed - credentials only) */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '4px',
            borderRadius: '16px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              cursor: 'default',
              transition: 'all 0.25s ease',
              background: '#fff',
              color: '#0f172a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            🔑 Credentials
          </div>
        </div>

        {/* Credentials Form */}
        <motion.form
          key="credentials-form"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleCredentialLogin}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
            {/* Username */}
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(148,163,184,0.6)',
                }}
              />
              <input
                id="admin-username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '16px 16px 16px 48px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(99,102,241,0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(148,163,184,0.6)',
                }}
              />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '16px 48px 16px 48px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(99,102,241,0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(148,163,184,0.6)',
                  padding: 0,
                  display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading
                  ? 'rgba(99,102,241,0.5)'
                  : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: loading
                  ? 'none'
                  : '0 8px 24px rgba(99,102,241,0.3)',
                marginTop: '8px',
                letterSpacing: '-0.3px',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 12px 32px rgba(99,102,241,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 24px rgba(99,102,241,0.3)';
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                      display: 'inline-block',
                    }}
                  />
                  Verifying...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
        </motion.form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '28px 0 0',
          }}
        >
          <div
            style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }}
          />
          <span
            style={{
              color: 'rgba(148,163,184,0.4)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Sherlock's Life
          </span>
          <div
            style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }}
          />
        </div>
      </motion.div>

      {/* Global Keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        input::placeholder {
          color: rgba(148,163,184,0.4) !important;
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
