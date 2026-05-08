import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  User,
  Mail,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) newErrors.user_name = 'Name is required';

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Invalid email';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');

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

      setStatus('success');
      setFormData({ user_name: '', user_email: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2000);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="relative p-6 text-center border-b bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 bg-slate-200 dark:bg-slate-800 rounded-full"
              >
                <X />
              </button>

              <h3 className="text-2xl font-bold">Get in Touch</h3>
              <p className="text-sm text-gray-500">
                Send us a message 🚀
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

              {/* Name */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border rounded-xl"
                    placeholder="John Doe"
                  />
                </div>
                {errors.user_name && <p className="text-red-500 text-xs">{errors.user_name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border rounded-xl"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.user_email && <p className="text-red-500 text-xs">{errors.user_email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border rounded-xl"
                    placeholder="How can we help you?"
                  />
                </div>
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl flex justify-center items-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status */}
              {status === 'success' && (
                <div className="text-green-600 flex gap-2">
                  <CheckCircle size={18} /> Message sent!
                </div>
              )}

              {status === 'error' && (
                <div className="text-red-600 flex gap-2">
                  <AlertCircle size={18} /> Failed to send
                </div>
              )}

            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;