import React from 'react';
import { ShieldCheck, Mail, Phone, ShieldHalf, Send } from 'lucide-react';
import Button from '../ui/Button';

const Facebook = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Instagram = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const Twitter = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Linkedin = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

const teamLinks = [
    { name: "D.S. Kanwat – LinkedIn", href: "https://www.linkedin.com/in/ds-kanwat" },
    { name: "Vikram Sharma – LinkedIn", href: "https://www.linkedin.com/in/vikram-sharma" },
    { name: "Team – LinkedIn Page", href: "https://www.linkedin.com/company/your-company" },
];

const Footer = () => {
    return (
        <footer className="relative bg-white dark:bg-black text-slate-600 dark:text-slate-400 pt-20 pb-8 overflow-hidden border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full mt-auto">
            {/* Subtle glowing orb in background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-none mx-auto px-[clamp(1.5rem,5vw,5rem)]">

                {/* Newsletter Section */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-[clamp(2rem,4vw,3rem)] shadow-sm mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 transition-colors duration-300">
                    <div className="w-full lg:w-1/2">
                        <h4 className="text-black dark:text-white text-[clamp(1.5rem,2.5vw,1.75rem)] font-bold mb-2">Stay updated with safety tips</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-[clamp(1rem,1.5vw,1.125rem)]">Join our newsletter for the latest parental guides and new features.</p>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                className="w-full bg-white dark:bg-black border border-slate-300 dark:border-slate-700 text-black dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                placeholder="Enter your email address"
                                required
                            />
                            <Button
                                className="w-full sm:w-auto px-8 py-3.5 flex-shrink-0"
                                type="submit"
                                icon={Send}
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

                    {/* Brand Section & Contact */}
                    <div className="lg:col-span-4 lg:pr-10">
                        <div className="flex items-center gap-3 text-black dark:text-white font-extrabold text-[clamp(1.5rem,2vw,1.75rem)] tracking-tight mb-3">
                            <img src="/sherlocks_life_logo.png" alt="Sherlock's Life Logo" className="h-[clamp(2.5rem,3vw,3.5rem)] w-auto object-contain" />
                            <span>Sherlock's Life</span>
                        </div>
                        <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed mb-6">
                            Helping you stay connected, aware, and safe—anytime, anywhere.
                        </p>
                        <ul className="flex flex-col gap-4 list-none p-0">
                            <li>
                                <a href="mailto:support@sherlockslife.com" className="flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.05rem)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer group">
                                    <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-500 group-hover:scale-110 transition-transform" />
                                    <span>support@sherlockslife.com</span>
                                </a>
                            </li>
                            {/* <li>
                                <a href="tel:+18005550199" className="flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.05rem)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer group">
                                    <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-500 group-hover:scale-110 transition-transform" />
                                    <span>+1 800 555 0199</span>
                                </a>
                            </li> */}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    {/* <div className="lg:col-span-2">
                        <h5 className="text-black dark:text-white font-bold text-lg mb-6">Quick Links</h5>
                        <ul className="flex flex-col gap-3 list-none p-0">
                            {['Home', 'Features', 'Pricing', 'Our Team', 'Contct', 'Subsidy Form'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-black dark:hover:text-white hover:translate-x-1 inline-block font-medium transition-all duration-200">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    <div className="lg:col-span-2">
                        <h5 className="text-black dark:text-white font-bold text-lg mb-6">
                            Quick Links
                        </h5>

                        <ul className="flex flex-col gap-3 list-none p-0">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Features", href: "/features" },
                                { name: "Pricing", href: "/pricing" },
                                { name: "Our Team", href: "/team" },
                                { name: "Contact", href: "/contact" },
                                { name: "Subsidy Form", href: "/subsidy-form" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="hover:text-black dark:hover:text-white hover:translate-x-1 inline-block font-medium transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    {/* <div className="lg:col-span-2">
                        <h5 className="text-black dark:text-white font-bold text-lg mb-6">Support</h5>
                        <ul className="flex flex-col gap-3 list-none p-0">
                            {['Contact Us', 'FAQ', 'Help Center', 'Terms of Service', 'Privacy Policy'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-black dark:hover:text-white hover:translate-x-1 inline-block font-medium transition-all duration-200">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    {/* Support */}
                    <div className="lg:col-span-2">
                        <h5 className="text-black dark:text-white font-bold text-lg mb-6">LEGAL</h5>
                        <ul className="flex flex-col gap-3 list-none p-0">
                            {[
                                { name: "Privacy Policy", href: "/privacy_policy" },
                                { name: "Terms & Conditions", href: "/terms_conditions" },
                                { name: "Refund Policy (14 Days)", href: "/refund_policy" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="hover:text-black dark:hover:text-white hover:translate-x-1 inline-block font-medium transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Safety & Trust */}
                    <div className="lg:col-span-4">
                        <h5 className="text-black dark:text-white font-bold text-lg mb-6">Connect</h5>
                        {/* <ul className="flex flex-col gap-3 list-none p-0 mb-6">
                            {['Data Security', 'Responsible Use', 'Parental Control Guide'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-black dark:hover:text-white hover:translate-x-1 inline-block font-medium transition-all duration-200">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul> */}

                        <ul className="flex flex-col gap-3 list-none p-0 mb-6">
                            {teamLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 font-medium transition-all duration-200"
                                    >
                                        {/* Optional Icon */}
                                        <span className="text-sm">🔗</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>


                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-5 flex items-start gap-4">
                            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                            <p className="m-0 text-emerald-800 dark:text-emerald-400 text-sm font-medium leading-relaxed">
                                Designed for ethical use with full user awareness and consent. We prioritize your family's data privacy above all else.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar & Social Links */}
                <div className="border-t border-slate-200 dark:border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="m-0 text-sm">© 2026 Sherlock's Life. All rights reserved.</p>
                    <div className="flex items-center gap-3">
                        {[
                            { icon: Facebook, label: 'Facebook' },
                            { icon: Instagram, label: 'Instagram' },
                            { icon: Twitter, label: 'Twitter' },
                            { icon: Linkedin, label: 'LinkedIn' }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href="#"
                                aria-label={social.label}
                                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
