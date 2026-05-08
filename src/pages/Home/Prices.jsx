import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const Prices = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Basic",
            desc: "Essential protection for a single device. Perfect for getting started.",
            priceMonthly: 499,
            priceAnnual: 399,
            popular: false,
            btnText: "Start Basic Trial",
            features: [
                { text: "1 Device connected", active: true },
                { text: "Location tracking", active: true },
                { text: "App usage limits", active: true },
                { text: "Basic web filtering", active: true },
                { text: "AI content scanning", active: false },
                { text: "Real-time alerts", active: false }
            ]
        },
        {
            name: "Pro",
            desc: "Advanced AI monitoring and real-time alerts. Ideal for most parents.",
            priceMonthly: 999,
            priceAnnual: 799,
            popular: true,
            btnText: "Get Pro Security",
            features: [
                { text: "Up to 3 Devices", active: true },
                { text: "Advanced location history", active: true },
                { text: "Strict web filtering", active: true },
                { text: "AI content scanning", active: true, strong: true },
                { text: "Real-time safety alerts", active: true, strong: true },
                { text: "Social media monitoring", active: true }
            ]
        },
        {
            name: "Family",
            desc: "Complete coverage for large households with priority support.",
            priceMonthly: 1499,
            priceAnnual: 1199,
            popular: false,
            btnText: "Protect Entire Family",
            features: [
                { text: "Up to 10 Devices", active: true },
                { text: "Everything in Pro plan", active: true },
                { text: "Extended 1-year history", active: true },
                { text: "Stealth mode tracking", active: true },
                { text: "Export activity reports", active: true },
                { text: "24/7 Priority support", active: true }
            ]
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-white dark:bg-[#050505] overflow-hidden relative">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        Simple, transparent pricing
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10"
                    >
                        Protect your family with advanced AI monitoring. Choose the plan that fits your household needs.
                    </motion.p>

                    {/* Billing Toggle */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <span className={`font-bold transition-colors ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Monthly</span>
                        
                        {/* Custom Animated Toggle Switch */}
                        <button 
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 cursor-pointer ${isAnnual ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <motion.div 
                                animate={{ x: isAnnual ? 32 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="w-6 h-6 bg-white rounded-full shadow-md"
                            />
                        </button>
                        
                        <span className={`font-bold transition-colors ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Annually</span>
                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ml-2">Save 20%</span>
                    </motion.div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            whileHover={{ y: -10 }}
                            className={`relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border ${
                                plan.popular 
                                ? 'border-indigo-500 shadow-2xl dark:shadow-[0_0_50px_rgba(99,102,241,0.15)] scale-105 z-10' 
                                : 'border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]'
                            } flex flex-col transition-all duration-300 group`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/30">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-[1.35rem] font-bold text-slate-900 dark:text-white mb-4 font-display">{plan.name}</h3>
                            
                            <div className="mb-2 flex items-end">
                                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                    ₹{isAnnual ? plan.priceAnnual : plan.priceMonthly}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 font-medium ml-1 mb-1">/mo</span>
                            </div>
                            
                            <p className="text-slate-500 dark:text-slate-400 text-[0.95rem] leading-relaxed pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                                {plan.desc}
                            </p>

                            {/* Features List */}
                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className={`flex items-start gap-3 text-[0.95rem] ${feat.active ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600 line-through'}`}>
                                        {feat.active ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-slate-300 dark:text-slate-700 shrink-0 mt-0.5" />
                                        )}
                                        <span className={feat.strong ? 'font-bold text-slate-900 dark:text-white' : 'font-medium'}>
                                            {feat.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button className={`w-full py-4 rounded-xl font-bold transition-all mt-auto cursor-pointer ${
                                plan.popular  
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20' 
                                : 'bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-500'
                            }`}>
                                {plan.btnText}
                            </button>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Prices;
