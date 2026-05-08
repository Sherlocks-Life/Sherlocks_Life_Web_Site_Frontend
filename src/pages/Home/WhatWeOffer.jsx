import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, MapPin, PhoneCall, Camera, EyeOff, CloudUpload } from 'lucide-react';

const WhatWeOffer = () => {
    const features = [
        {
            title: "Remote Installation",
            description: "Install and configure remotely without touching the target device. Cloud-managed setup — zero physical access.",
            icon: Wifi,
            iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
            iconColor: "text-indigo-500",
            glowColor: "bg-indigo-500/15"
        },
        {
            title: "Live Location",
            description: "Real-time GPS tracking with accurate location updates. Know where your loved ones are at all times.",
            icon: MapPin,
            iconBg: "bg-red-50 dark:bg-red-900/20",
            iconColor: "text-red-500",
            glowColor: "bg-red-500/15"
        },
        {
            title: "Call Recording",
            description: "Automatic recording with secure cloud storage. Access recordings anytime from dashboard.",
            icon: PhoneCall,
            iconBg: "bg-purple-50 dark:bg-purple-900/20",
            iconColor: "text-purple-500",
            glowColor: "bg-purple-500/15"
        },
        {
            title: "Live Cam & Screen",
            description: "Monitor screen activity & live camera feed discreetly. Full visual oversight in real-time.",
            icon: Camera,
            iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
            iconColor: "text-emerald-500",
            glowColor: "bg-emerald-500/15"
        },
        {
            title: "Background Running",
            description: "App runs silently — completely hidden from device app list. Totally invisible operation.",
            icon: EyeOff,
            iconBg: "bg-slate-800 dark:bg-slate-800",
            iconColor: "text-white",
            glowColor: "bg-slate-400/20 dark:bg-white/10"
        },
        {
            title: "20 GB Cloud Storage",
            description: "All recordings securely stored. Encrypted transfers, access from anywhere, anytime.",
            icon: CloudUpload,
            iconBg: "bg-orange-50 dark:bg-orange-900/20",
            iconColor: "text-orange-500",
            glowColor: "bg-orange-500/15"
        }
    ];

    return (
        <section id="features" className="py-24 bg-white dark:bg-black w-full overflow-hidden relative">
            {/* Background glowing orb for advanced feel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-[100%]"></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">
                            — WHAT WE OFFER
                        </span>
                        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.15] text-slate-900 dark:text-white mb-6 tracking-tight">
                            Powerful Features,<br/>Simple to Use
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400">
                            Everything you need to stay connected and ensure safety — all in one sophisticated monitoring platform.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }} // Stagger effect
                            whileHover={{ y: -8 }}
                            className="bg-white dark:bg-[#0a0a0a] rounded-3xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-300 border border-slate-100 dark:border-slate-800/60 flex flex-col group relative overflow-hidden cursor-pointer"
                        >
                            {/* Hover Glow Edge effect inside card */}
                            <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full ${feature.glowColor} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            
                            {/* Icon Box */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.iconBg} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm relative z-10`}>
                                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} strokeWidth={2} />
                            </div>
                            
                            <h3 className="text-[1.35rem] font-bold text-slate-900 dark:text-white mb-3 font-display relative z-10">
                                {feature.title}
                            </h3>
                            
                            <p className="text-[0.95rem] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed flex-grow relative z-10">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
