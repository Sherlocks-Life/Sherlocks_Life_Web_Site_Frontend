import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, LayoutGrid, Bell, Cloud, ArrowRight } from 'lucide-react';

const FeatureCard = ({ feature, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -8 }}
        className="bg-white dark:bg-[#0a0a0a] rounded-[24px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer flex-1"
    >
        {/* Subtle Background Radial Glow on Hover */}
        <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[40px] -mr-10 -mt-10 opacity-0 transition-opacity duration-500 ${feature.glow}`}></div>

        {/* Icon Box with Gradient */}
        <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center text-white mb-6 shadow-lg relative z-10 ${feature.gradient} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            <feature.icon className="w-7 h-7" strokeWidth={2} />
        </div>
        
        <h3 className="text-[1.2rem] font-bold text-slate-900 dark:text-white mb-3 font-display relative z-10">
            {feature.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[0.95rem] relative z-10">
            {feature.desc}
        </p>
    </motion.div>
);

const WhyChooseUs = () => {
    const features = [
        {
            title: "Smart AI monitoring",
            desc: "Our proprietary AI scans for inappropriate content and dangerous behavior patterns automatically.",
            icon: Cpu,
            gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
            glow: "group-hover:bg-indigo-500/20"
        },
        {
            title: "Easy to use dashboard",
            desc: "Access all controls from a clean, intuitive interface designed for busy parents.",
            icon: LayoutGrid,
            gradient: "bg-gradient-to-br from-sky-400 to-indigo-600",
            glow: "group-hover:bg-indigo-500/20"
        },
        {
            title: "Real-time safety alerts",
            desc: "Receive instant push notifications the moment potential risks or boundary crossings occur.",
            icon: Bell,
            gradient: "bg-gradient-to-br from-rose-400 to-orange-500",
            glow: "group-hover:bg-rose-500/20"
        },
        {
            title: "Secure cloud system",
            desc: "Your family's data is heavily encrypted and stored safely on state-of-the-art cloud servers.",
            icon: Cloud,
            gradient: "bg-gradient-to-br from-emerald-400 to-teal-600",
            glow: "group-hover:bg-emerald-500/20"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#050505] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
                    
                    {/* Left Side Content */}
                    <div className="w-full lg:w-[45%] text-center lg:text-left">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block"
                        >
                            — The Sherlock Advantage
                        </motion.span>
                        
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.15] text-slate-900 dark:text-white mb-6 tracking-tight"
                        >
                            Why Choose <br className="hidden lg:block"/>Sherlock's Life?
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
                        >
                            We go far beyond basic tracking. Our platform combines advanced artificial intelligence with military-grade security to give you total peace of mind.
                        </motion.p>
                        
                        <motion.button 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1"
                        >
                            Start Protecting Today
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                    {/* Right Side: Staggered Features Grid */}
                    <div className="w-full lg:w-[55%] mt-8 lg:mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            
                            {/* Column 1 */}
                            <div className="flex flex-col gap-6 lg:mt-12">
                                <FeatureCard feature={features[0]} delay={0.2} />
                                <FeatureCard feature={features[1]} delay={0.3} />
                            </div>
                            
                            {/* Column 2 (Staggered up) */}
                            <div className="flex flex-col gap-6 lg:-mt-8">
                                <FeatureCard feature={features[2]} delay={0.4} />
                                <FeatureCard feature={features[3]} delay={0.5} />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
