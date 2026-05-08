import React from 'react';
import { motion } from 'framer-motion';
import { CloudDownload, Link, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            num: 1,
            title: "Install the app",
            desc: "Download and securely install our lightweight application on your device in seconds.",
            icon: CloudDownload,
            iconColor: "text-indigo-500",
            numberBg: "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
        },
        {
            num: 2,
            title: "Connect the device",
            desc: "Link the target device seamlessly using a simple pairing code or secure connection link.",
            icon: Link,
            iconColor: "text-purple-500",
            numberBg: "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
        },
        {
            num: 3,
            title: "Monitor & protect",
            desc: "Access your real-time dashboard to oversee activities, set limits, and ensure safety instantly.",
            icon: ShieldCheck,
            iconColor: "text-emerald-500",
            numberBg: "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#050505] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-5 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-bold text-sm tracking-wide uppercase mb-6">
                            Super Simple
                        </span>
                        <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-6 tracking-tight">
                            How It Works
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400">
                            Protecting your loved ones shouldn't be complicated. Get fully set up and monitoring in just three easy steps.
                        </p>
                    </motion.div>
                </div>

                {/* Steps Row */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                    
                    {/* The Connecting Dashed Line */}
                    {/* Positioned exactly behind the center of the icon boxes. 110px height / 2 = 55px top. */}
                    <div className="hidden md:block absolute top-[55px] left-[16%] right-[16%] border-t-[3px] border-dashed border-slate-300 dark:border-slate-800 z-[-1]"></div>

                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            whileHover={{ y: -8 }}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            {/* Icon Wrapper matching HTML exact design */}
                            <div className="relative w-[110px] h-[110px] bg-white dark:bg-[#111] rounded-3xl flex items-center justify-center shadow-[0_15px_35px_rgba(79,70,229,0.08)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 group-hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] dark:group-hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] transition-all duration-300 mb-8 z-10">
                                
                                {/* The Step Number Badge positioned absolutely outside */}
                                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${step.numberBg} z-20`}>
                                    {step.num}
                                </div>
                                
                                <step.icon className={`w-10 h-10 ${step.iconColor} group-hover:scale-110 transition-transform duration-300`} strokeWidth={2.5} />
                            </div>

                            <h4 className="text-[1.35rem] font-bold text-slate-900 dark:text-white mb-3 font-display">
                                {step.title}
                            </h4>
                            
                            <p className="text-slate-500 dark:text-slate-400 text-[0.95rem] leading-relaxed max-w-[280px]">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
