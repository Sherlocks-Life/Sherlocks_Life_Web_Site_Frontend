import React from 'react';
import { ShieldCheck, Zap, RotateCcw, Calendar, EyeOff, ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Counter from '../../components/ui/Counter';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-[130px] pb-8 bg-gradient-to-b from-[#f8fafc] to-white dark:from-black dark:to-[#050505]">
      <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto w-full flex-1">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-8 border border-emerald-200 dark:border-emerald-800/50 shadow-sm"
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="tracking-wide">SMART PARENTAL MONITORING</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold mb-6 leading-[1.05] tracking-tight text-[#0f172a] dark:text-white uppercase"
        >
          SMART GAME,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A4D86] to-[#4283EE] dark:from-[#4980d9] dark:to-[#6bb5ff]">
            SAFE KIDS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[clamp(1.1rem,2vw,1.3rem)] max-w-3xl text-slate-500 dark:text-slate-400 mb-10 font-medium leading-relaxed"
        >
          Stay connected with your loved ones. Advanced parental monitoring
          <br className="hidden md:block" />
          that runs <span className="font-bold text-slate-800 dark:text-slate-200">silently, securely, and seamlessly.</span>
        </motion.p>

        {/* Features Pills Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl"
        >
          {[
            { icon: Zap, text: 'Instant Delivery', highlight: 'text-indigo-500' },
            { icon: RotateCcw, text: '14-Day Refund Guarantee', highlight: 'text-[#f97316]' },
            { icon: Calendar, text: '1 Year Validity', highlight: 'text-[#ec4899]' },
            { icon: EyeOff, text: 'Background Running', highlight: 'text-[#9333ea]' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <item.icon className={`w-4 h-4 ${item.highlight}`} />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto"
        >
          <Button
            icon={MessageSquare}
            className="px-10 py-4 text-[1.05rem] w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('openSubsidyModal'));
            }}
          >
            Apply for Subsidy Now
          </Button>

          <Button
            variant="outline"
            icon={ArrowRight}
            className="px-10 py-4 text-[1.05rem] w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('openContactModal'));
            }}
          >
            Get in Touch
          </Button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full max-w-4xl border-t border-slate-200 dark:border-slate-800 pt-10 mt-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Monitoring' },
              { value: '4.8★', label: 'User Rating' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                  <Counter value={stat.value} />
                </span>
                <span className="text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
