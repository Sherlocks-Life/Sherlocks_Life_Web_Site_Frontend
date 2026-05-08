import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare } from 'lucide-react';
import Button from './Button';

const ContactModal = ({ isOpen, onClose, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            if (onSuccess) onSuccess();
        }, 1200);
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
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        {/* Header */}
                        <div className="relative p-6 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <button 
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Get in Touch</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                            <div className="relative">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        required
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none"
                                        placeholder="John Doe" 
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input 
                                        type="email" 
                                        required
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none"
                                        placeholder="john@example.com" 
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-4 pointer-events-none">
                                        <MessageSquare className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <textarea 
                                        required
                                        rows="4"
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white transition-all outline-none resize-none"
                                        placeholder="How can we help you?" 
                                    ></textarea>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className={`w-full py-4 mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                                icon={Send}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
