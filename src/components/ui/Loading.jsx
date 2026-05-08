import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loading = ({ onComplete }) => {
    useEffect(() => {
        // Keep the preloader visible for 2.2 seconds to allow the loading animation to finish
        const timer = setTimeout(() => {
            if(onComplete) onComplete();
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div 
            className="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
            <motion.div
                className="flex flex-col items-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Pulsing Logo */}
                <motion.img 
                    src="/sherlocks_life_logo.png" 
                    alt="Sherlock's Life Loading" 
                    className="h-[clamp(4rem,8vw,6rem)] w-auto mb-10 object-contain"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />

                {/* Progress Bar Container */}
                <div className="w-[200px] h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden relative">
                    <motion.div 
                        className="absolute top-0 left-0 h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                    />
                </div>
                
                {/* Loading Text */}
                <motion.div 
                    className="mt-6 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    Loading
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Loading;
