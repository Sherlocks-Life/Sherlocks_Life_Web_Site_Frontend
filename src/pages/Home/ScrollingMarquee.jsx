import React from 'react';
import { ShieldCheck, Activity, Lock, Bell, Key, Heart } from 'lucide-react';

const ScrollingMarquee = () => {
    // Trust and service-improving text
    const items = [
        { text: '100% Secure', icon: ShieldCheck },
        { text: '24/7 Monitoring', icon: Activity },
        { text: 'Privacy First', icon: Lock },
        { text: 'Instant Alerts', icon: Bell },
        { text: 'Bank-Level Encryption', icon: Key },
        { text: 'Trusted by Parents', icon: Heart }
    ];
    
    return (
        <section className="py-5 bg-white dark:bg-[#050505] overflow-hidden relative">
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    /* Slowed down to 150s */
                    animation: marqueeScroll 150s linear infinite;
                }
                /* Pause animation when hovering anywhere in the container */
                .marquee-container:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Wrapper with CSS Mask to smoothly fade out the edges */}
            <div 
                className="marquee-container relative flex whitespace-nowrap" 
                style={{ 
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" 
                }}
            >
                <div className="animate-marquee flex items-center gap-[8rem] px-4 w-max">
                    {[...items, ...items, ...items, ...items].map((item, idx) => (
                        <div 
                            key={idx} 
                            className="flex items-center gap-3 cursor-pointer group hover:scale-105 transition-transform duration-300"
                        >
                            {/* Bare Icon (No Background) */}
                            <item.icon 
                                className="w-6 h-6 text-black dark:text-white group-hover:text-indigo-600 transition-colors" 
                                strokeWidth={2.5} 
                            />
                            
                            {/* Display Text */}
                            <span className="font-display text-[1.1rem] md:text-[1.25rem] font-bold uppercase tracking-widest text-black dark:text-white group-hover:text-indigo-600 transition-colors">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScrollingMarquee;
