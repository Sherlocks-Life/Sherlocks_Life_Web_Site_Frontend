import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, icon: Icon, href, variant = "primary", className = "", ...props }) => {
    // If children is a string, split into characters for stagger animation
    const letters = typeof children === 'string' ? children.split('') : [];
    const isOutline = variant === "outline";

    // Base classes
    let baseClass = "relative overflow-hidden rounded-xl px-7 py-3 font-bold no-underline inline-flex items-center justify-center gap-3 group transition-shadow cursor-pointer ";
    
    if (isOutline) {
        baseClass += "bg-white dark:bg-black border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white shadow-sm ";
    } else {
        baseClass += "bg-black dark:bg-white text-white dark:text-black shadow-lg hover:shadow-indigo-500/30 ";
    }

    baseClass += className;

    return (
        <motion.a
            href={href || "#"}
            className={baseClass}
            whileHover="hover"
            initial="initial"
            {...props}
        >
            {/* Background fill wipe */}
            <span className={`absolute inset-0 w-full h-full scale-y-0 origin-bottom transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-y-100 ${isOutline ? 'bg-slate-100 dark:bg-slate-900' : 'bg-indigo-600 dark:bg-indigo-500'}`}></span>
            
            {/* Render icon if passed */}
            {Icon && (
                <Icon className={`relative z-10 w-5 h-5 transition-colors duration-500 ${isOutline ? 'text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400' : 'text-current group-hover:text-white'}`} />
            )}

            {/* Staggered Text Animation Container */}
            <div className="relative flex">
                {letters.length > 0 ? (
                    letters.map((char, i) => (
                        <div key={i} className="relative overflow-hidden h-[1.2em] leading-[1.2em]">
                            <div 
                                className="flex flex-col transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-1/2"
                                style={{ transitionDelay: `${i * 0.015}s` }}
                            >
                                <span className="whitespace-pre relative z-10">{char}</span>
                                <span className={`whitespace-pre relative z-10 ${isOutline ? 'text-indigo-600 dark:text-indigo-400' : 'text-white'}`}>{char}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className={`relative z-10 transition-colors duration-500 ${isOutline ? 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400' : 'group-hover:text-white'}`}>{children}</span>
                )}
            </div>
        </motion.a>
    );
};

export default Button;
