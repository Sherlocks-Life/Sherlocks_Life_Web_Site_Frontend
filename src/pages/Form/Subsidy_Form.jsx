import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiUrl } from '../../config/api';
import {
  Target,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  X,
  ShieldCheck,
} from 'lucide-react';

const subMap = {
  Politician: ['MLA', 'MP', 'Councillor', 'Minister'],
  Business: ['Startup', 'SME', 'Corporate', 'Investor'],
  Student: ['Scholarship', 'Research', 'Abroad', 'Internship'],
  Farmer: ['Crop', 'Equipment', 'Loan', 'Insurance'],
  Government: ['Officer', 'IPS', 'Contract', 'Scheme', 'Tender'],
};

const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const highLevelRoles = ['MLA', 'MP', 'Minister', 'IPS', 'Officer'];

const InputField = ({ label, id, type = 'text', placeholder, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none"
      />
    </div>
  </div>
);

const SelectField = ({ label, id, options, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={id}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none cursor-pointer appearance-none"
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const MultiSelectRoles = () => null;

const SuccessPopup = ({ visible, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!visible || isHovered) return;
    if (timeLeft <= 0) {
      onClose?.();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [visible, isHovered, timeLeft, onClose]);

  useEffect(() => {
    if (visible) setTimeLeft(3);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 flex items-center justify-center z-[220] p-4 bg-black/40 backdrop-blur-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-emerald-100 dark:border-emerald-900/30 relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
              <ShieldCheck size={48} />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Successful!</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Your application is being processed. Our team will contact you for verification shortly.
            </p>

            <div className="text-xs text-slate-400">
              Closing in {timeLeft}s {isHovered && '(Paused)'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SubsidyForm = ({ isOpen = false, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [idCards, setIdCards] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    t_name: '',
    t_phone: '',
    t_social: '',
    u_name: '',
    u_phone: '',
    u_email: '',
    category: 'Politician', // Subsidy Quota
    subcategory: '', // maps to one role
    roles: [],
    relation: 'Self',
    state: '',
  });

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setIsSubmitting(false);
    setToast({ visible: false, message: '', type: 'success' });
    setIdCards([]);
    setShowSuccess(false);
    setFormData({
      t_name: '',
      t_phone: '',
      t_social: '',
      u_name: '',
      u_phone: '',
      u_email: '',
      category: 'Politician', // Subsidy Quota
      subcategory: '',
      roles: [],
      relation: 'Self',
      state: '',
    });
  }, [isOpen]);

  const isIdMandatory = () => {
    if (formData.roles.length > 1) return true;
    if (formData.roles.length === 1) return !highLevelRoles.includes(formData.roles[0]);
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // When Subsidy Quota changes, reset Subcategory + roles
    if (name === 'category') {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subcategory: '',
        roles: [],
      }));
      return;
    }

    // When Subcategory changes, set roles to match selected subcategory
    if (name === 'subcategory') {
      setFormData((prev) => ({
        ...prev,
        subcategory: value,
        roles: value ? [value] : [],
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRole = (role) => {
    setFormData((prev) => {
      const newRoles = prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [...prev.roles, role];
      return { ...prev, roles: newRoles };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) setIdCards(Array.from(e.target.files));
  };

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    window.setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 4000);
  };

  const nextStep = () => {
    if (step === 1 && (!formData.t_name || !formData.t_phone || !formData.t_social)) {
      return showToast('Please fill all required Target Details.', 'error');
    }
    if (step === 2) {
      if (!formData.u_name || !formData.u_phone || !formData.u_email) {
        return showToast('Please fill all required Personal Details.', 'error');
      }
      if (!/^\d{10}$/.test(formData.u_phone)) {
        return showToast('Phone number must be exactly 10 digits.', 'error');
      }
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (formData.roles.length === 0 || !formData.state) {
      return showToast('Please complete all fields in Step 3.', 'error');
    }
    if (isIdMandatory() && idCards.length === 0) {
      return showToast('ID card upload is mandatory for your selection.', 'error');
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'roles') data.append(key, JSON.stringify(formData[key]));
        else data.append(key, formData[key]);
      });
      idCards.forEach((file) => data.append('idCards', file));

      const regRes = await fetch(apiUrl('/api/subsidy/register'), { method: 'POST', body: data });
      const regData = await regRes.json();
      if (!regData.success) throw new Error('Registration failed');

      const orderRes = await fetch(apiUrl('/api/payment/create-order'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 4200 }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error('Order creation failed');

      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        showToast('Razorpay SDK failed to load.', 'error');
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Sherlock's Life",
        description: 'Subsidy Registration Fee',
        order_id: orderData.order.id,
        handler: async (response) => {
          const verifyRes = await fetch(apiUrl('/api/payment/verify'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, formId: regData.formId }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setShowSuccess(true);
            setIsSubmitting(false);
            window.setTimeout(() => {
              setFormData({
                t_name: '',
                t_phone: '',
                t_social: '',
                u_name: '',
                u_phone: '',
                u_email: '',
                category: 'Politician',
                roles: [],
                relation: 'Self',
                state: '',
              });
              setIdCards([]);
              setStep(1);
              setShowSuccess(false);
            }, 4000);
          } else {
            showToast('Payment verification failed.', 'error');
            setIsSubmitting(false);
          }
        },
        prefill: { name: formData.u_name, email: formData.u_email, contact: formData.u_phone },
        theme: { color: '#4f46e5' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      showToast('Error initializing payment.', 'error');
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[180] px-4 py-8 flex items-center justify-center">
      {/* Backdrop (click to close) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onClose?.()} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-[181] w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[88vh]"
      >
        <div className="relative p-6 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            type="button"
            aria-label="Close"
            onClick={() => onClose?.()}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>

          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Subsidy Application</h3>
          <p className="text-sm text-slate-500 mt-2">Professional Verification & Automated Support</p>

          <div className="flex items-center justify-center gap-6 mt-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= num
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {step > num ? <CheckCircle size={20} /> : num}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h4 className="font-bold mb-6 text-lg flex items-center gap-2">
                  <Target className="text-indigo-500" size={24} /> Target Details
                </h4>
                <InputField label="Target Name" id="t_name" value={formData.t_name} onChange={handleChange} placeholder="Full name of subject" required />
                <InputField label="Target Phone" id="t_phone" value={formData.t_phone} onChange={handleChange} placeholder="10 digit mobile" required />
                <InputField label="Social Profile" id="t_social" value={formData.t_social} onChange={handleChange} placeholder="LinkedIn/Instagram URL" required />

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h4 className="font-bold mb-6 text-lg flex items-center gap-2">
                  <User className="text-sky-500" size={24} /> Your Information
                </h4>

                <InputField label="Your Name" id="u_name" value={formData.u_name} onChange={handleChange} placeholder="John Doe" required />
                <InputField label="Your Phone" id="u_phone" value={formData.u_phone} onChange={handleChange} placeholder="9876543210" required />
                <InputField label="Your Email" id="u_email" type="email" value={formData.u_email} onChange={handleChange} placeholder="john@example.com" required />

                <div className="mt-10 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-200 transition-all"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h4 className="font-bold mb-6 text-lg flex items-center gap-2">
                  <FileText className="text-emerald-500" size={24} /> Selection & Verification
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <SelectField
                    label="Subsidy Quota"
                    id="category"
                    options={Object.keys(subMap)}
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />

                  <SelectField
                    label="Relation to Target"
                    id="relation"
                    options={['Self', 'Spouse', 'Relative', 'Manager']}
                    value={formData.relation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <SelectField
                  label="Subcategory"
                  id="subcategory"
                  options={subMap[formData.category] || []}
                  value={formData.subcategory}
                  onChange={handleChange}
                  required
                />

                <MultiSelectRoles
                  roles={subMap[formData.category]}
                  selectedRoles={formData.roles}
                  toggleRole={toggleRole}
                />

                <SelectField
                  label="State"
                  id="state"
                  options={states}
                  value={formData.state}
                  onChange={handleChange}
                  required
                />

                <div className="mt-6 p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-[32px] mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">
                      ID Verification
                    </span>
                    <span
                      className={`text-[10px] uppercase font-black px-3 py-1 rounded-full ${
                        isIdMandatory() ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      {isIdMandatory() ? 'Mandatory' : 'Optional'}
                    </span>
                  </div>

                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="text-sm text-slate-500 file:mr-6 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
                  />

                  {idCards?.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-black text-slate-700 dark:text-slate-200 mb-2">
                        Selected ID ({idCards.length})
                      </div>

                      <div className="max-h-20 overflow-y-auto space-y-1">
                        {idCards.slice(0, 3).map((f, idx) => (
                          <div key={`${f.name}-${idx}`} className="text-[11px] text-slate-600 dark:text-slate-300">
                            • {f.name}
                          </div>
                        ))}
                        {idCards.length > 3 && (
                          <div className="text-[11px] text-slate-600 dark:text-slate-300">
                            + {idCards.length - 3} more
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setIdCards([])}
                        className="mt-3 text-[12px] font-black text-red-600 hover:text-red-700 transition-all"
                      >
                        Remove all
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-[32px] mb-8 flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <CreditCard className="text-emerald-400" size={32} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Processing Fee</p>
                      <p className="text-2xl font-black tracking-tighter">₹4200.00</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-right text-slate-400 font-bold leading-relaxed">
                    <p>Secure SSL Gateway</p>
                    <p>Instant Activation</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20 flex-grow"
                  >
                    {isSubmitting ? 'Initializing...' : 'Proceed to Payment'} <CreditCard size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <SuccessPopup visible={showSuccess} onClose={() => setShowSuccess(false)} />

        <AnimatePresence>
          {toast.visible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed bottom-8 right-8 flex items-center gap-3 px-8 py-5 rounded-3xl shadow-2xl z-[250] border ${
                toast.type === 'success'
                  ? 'bg-white dark:bg-slate-900 border-emerald-200 text-emerald-600'
                  : 'bg-white dark:bg-slate-900 border-red-200 text-red-600'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
              <p className="font-black text-sm tracking-tight">{toast.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default SubsidyForm;
