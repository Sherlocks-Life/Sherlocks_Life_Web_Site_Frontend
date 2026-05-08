import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import emailjs from '@emailjs/browser';

/**
 * ─── EmailJS Config (EmailJS only; backend fallback removed) ───────────────
 * Guard init to avoid runtime errors when env is missing.
 */
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
}

const ContactModal = ({ isOpen, onClose, onSuccess }) => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = 'Name is required';

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Invalid email format';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.user_name,
          reply_to: formData.user_email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      showToast('success', 'Message sent! Check your inbox.');
      setFormData({ user_name: '', user_email: '', message: '' });
      setErrors({});
      if (formRef.current) formRef.current.reset();

      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (emailJsError) {
      console.error('EmailJS Error:', emailJsError);

      const errText =
        emailJsError?.message ||
        (typeof emailJsError === 'string' ? emailJsError : JSON.stringify(emailJsError, null, 2));

      showToast('error', `Failed to send. ${errText}`);
    } finally {
      setIsSubmitting(false);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            <div className="relative p-6 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Get in Touch</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className={`block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none ${
                      errors.user_name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                    required
                  />
                </div>
                {errors.user_name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.user_name}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className={`block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none ${
                      errors.user_email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                    required
                  />
                </div>
                {errors.user_email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.user_email}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <div className="relative">
                  <div className="absolute top-3 left-4 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    disabled={isSubmitting}
                    className={`block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</p>}
              </div>

              <AnimatePresence>
                {toast && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      toast.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
                    }`}
                  >
                    {toast.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    {toast.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className={`w-full py-4 mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
                icon={Send}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
