import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "Mother of 2",
            text: "This app completely changed how our family manages screen time. It's so intuitive and gives us incredible peace of mind knowing exactly what our kids are doing.",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
        },
        {
            name: "Michael Chen",
            role: "Father of 3",
            text: "The real-time alerts are a lifesaver. I no longer have to constantly check their phones. The AI monitoring catches things I would have completely missed.",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
        },
        {
            name: "Elena Rodriguez",
            role: "Single Parent",
            text: "Best investment I've made for my children's safety. The location tracking is incredibly accurate, and the stealth mode works flawlessly without draining battery.",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
        },
        {
            name: "David Thompson",
            role: "Tech Enthusiast",
            text: "As someone who works in tech, I am incredibly impressed by the encryption and security protocols used here. Finally, a monitoring app that respects privacy.",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
        },
        {
            name: "Rachel Kim",
            role: "High School Teacher",
            text: "I recommend this to all the parents I meet. It strikes the perfect balance between giving kids independence and keeping them safe from online predators.",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#050505] overflow-hidden relative">
            <style>{`
                @keyframes reviewScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-reviews {
                    animation: reviewScroll 60s linear infinite;
                }
                .reviews-container:hover .animate-reviews {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="text-center mb-20 max-w-2xl mx-auto px-6">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-5 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 rounded-full font-bold text-sm tracking-wide uppercase mb-6"
                >
                    Trusted by Thousands
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-6 tracking-tight"
                >
                    Loved by Parents
                </motion.h2>
            </div>

            {/* Scrolling Container */}
            <div 
                className="reviews-container relative flex whitespace-nowrap"
                style={{ 
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" 
                }}
            >
                <div className="animate-reviews flex items-center gap-8 px-4 w-max">
                    {/* Double the array for infinite scroll */}
                    {[...reviews, ...reviews].map((review, idx) => (
                        <div 
                            key={idx}
                            className="bg-[#f8fafc] dark:bg-[#0a0a0a] rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/60 shadow-sm hover:shadow-xl transition-all duration-300 w-[400px] flex flex-col whitespace-normal group cursor-pointer hover:-translate-y-2"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[1,2,3,4,5].map(star => (
                                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            
                            {/* Review Text */}
                            <p className="text-lg font-medium text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed flex-grow">
                                "{review.text}"
                            </p>
                            
                            {/* User Profile */}
                            <div className="flex items-center gap-4 mt-auto">
                                <img 
                                    src={review.img} 
                                    alt={review.name} 
                                    className="w-14 h-14 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md group-hover:scale-110 transition-transform duration-300" 
                                />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
