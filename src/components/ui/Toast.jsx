import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ isVisible, message, onClose }) => {
    
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-6 right-6 z-[200] bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 shadow-2xl shadow-emerald-500/10 rounded-2xl p-4 flex items-center gap-4 max-w-sm"
                >
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    
                    <div className="flex-grow">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Success!</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{message}</p>
                    </div>

                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
