import React, { useState } from 'react';
import { apiUrl } from '../../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, Loader2 } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMsg, setToastMsg] = useState(null);

  const isLoading = status === 'loading';

  const validate = () => {
    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = 'Name is required';

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.user_email)) {
      newErrors.user_email = 'Invalid email format';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear old toast so it doesn't flash again after success
    setToastMsg(null);
    setErrors({});
    setStatus('loading');

    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Backend may return JSON, or may return text/HTML for errors (e.g., wrong route)
      let data = null;
      try {
        data = await response.json();
      } catch (jsonErr) {
        // ignore, we'll fall back to text below
      }

      if (!response.ok) {
        const fallbackText = data?.message
          ? data.message
          : await response.text().catch(() => '');

        throw new Error(
          fallbackText ||
            `Failed to send (HTTP ${response.status}).`
        );
      }

      if (data?.success) {
        setStatus('success');
        setToastMsg('Message sent successfully!');

        // Close immediately, then reset fresh state
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose?.();
          setFormData({ user_name: '', user_email: '', message: '' });
          setErrors({});
          setToastMsg(null);
          setStatus('idle');
        }, 1500);
      } else {
        const msg = data?.message || 'Failed to send';
        throw new Error(msg);
      }
    } catch (err) {
      console.error('Contact Submit Error:', err);
      setStatus('error');

      const msg =
        err?.message ||
        (typeof err === 'string' ? err : null) ||
        'Failed to send. Please try again.';

      setToastMsg(msg);

      setTimeout(() => {
        setStatus('idle');
        setToastMsg(null);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md z-50"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative text-center px-6 py-6 bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition"
                  aria-label="Close"
                  type="button"
                >
                  <X size={18} />
                </button>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Get in Touch</h2>
                <p className="text-sm text-gray-500 dark:text-slate-300 mt-1">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 block">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={isLoading}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-800/50 border ${
                        errors.user_name
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  {errors.user_name && <p className="mt-1 text-xs text-red-600">{errors.user_name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={isLoading}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-800/50 border ${
                        errors.user_email
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  {errors.user_email && <p className="mt-1 text-xs text-red-600">{errors.user_email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 block">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      disabled={isLoading}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-800/50 border ${
                        errors.message
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none`}
                    />
                  </div>
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>

                <AnimatePresence>
                  {toastMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className={`text-sm font-medium px-3 py-2 rounded-xl border ${
                        status === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
                          : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
                      }`}
                    >
                      {toastMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 transition disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  whileTap={isLoading ? undefined : { scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
