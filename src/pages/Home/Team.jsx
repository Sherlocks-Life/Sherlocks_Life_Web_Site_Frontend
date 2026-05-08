import React from 'react';
import { motion } from 'framer-motion';

const Twitter = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Linkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const teamMembers = [
    {
        name: "Sarah Jenkins",
        role: "Chief Security Officer",
        bio: "Former cybersecurity lead at top tech firms, ensuring military-grade encryption for your family's data.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    {
        name: "Michael Chen",
        role: "Head of AI Development",
        bio: "Pioneered the predictive alert algorithms that make Sherlock's Life the smartest monitor on the market.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    {
        name: "Elena Rodriguez",
        role: "Child Psychology Expert",
        bio: "Ensures our monitoring tools promote healthy boundaries and psychological well-being for kids.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    },
    {
        name: "David Thompson",
        role: "Lead Systems Architect",
        bio: "Architected the stealth-mode background services to ensure zero battery drain and complete reliability.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

const Team = () => {
    return (
        <section id="team" className="py-24 bg-slate-50 dark:bg-black w-full overflow-hidden relative border-t border-slate-200 dark:border-slate-800">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-[100%]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-[100%]"></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-5 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full font-bold text-sm tracking-wide uppercase mb-6"
                    >
                        Our Core Team
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        The Experts Behind the Shield
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
                    >
                        Built by industry leaders in cybersecurity, AI, and child psychology. We are dedicated to keeping your family safe online.
                    </motion.p>
                </div>

                {/* Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {teamMembers.map((member, index) => (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            className="group relative bg-white dark:bg-[#0f1117] rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
                        >
                            {/* Inner Glow Line on Hover */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                            {/* Image Header */}
                            <div className="relative w-full h-[200px] bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                                />
                            </div>

                            {/* Content Body */}
                            <div className="p-6 md:p-8 relative flex flex-col flex-grow">
                                {/* Overlapping Social Pill */}
                                <div className="absolute -top-5 right-6 flex items-center gap-1.5 bg-white dark:bg-[#1a1d24] shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-700/50 px-3 py-2 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                </div>

                                <h3 className="text-[1.15rem] font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {member.name}
                                </h3>
                                
                                <p className="text-[12px] font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-widest mb-4">
                                    {member.role}
                                </p>
                                
                                <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed mt-auto">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Team;
