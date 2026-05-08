import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import Button from '../ui/Button';
import ContactForm from '../ui/ContactForm';
import Toast from '../ui/Toast';
import SubsidyForm from '../../pages/Form/Subsidy_Form';

const AnimatedNavLink = ({ title, href, onClick }) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 no-underline text-[1rem] font-bold transition-colors duration-200 cursor-pointer"
        >
            {title}
        </a>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const [isSubsidyModalOpen, setIsSubsidyModalOpen] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);

    useEffect(() => {
        const handleOpenSubsidyModal = () => setIsSubsidyModalOpen(true);
        const handleOpenContactForm = () => setIsContactFormOpen(true);

        const handleOpenContactModal = () => setIsContactFormOpen(true);

        window.addEventListener('openSubsidyModal', handleOpenSubsidyModal);
        window.addEventListener('openContactForm', handleOpenContactForm);
        window.addEventListener('openContactModal', handleOpenContactModal);

        return () => {
            window.removeEventListener('openSubsidyModal', handleOpenSubsidyModal);
            window.removeEventListener('openContactForm', handleOpenContactForm);
            window.removeEventListener('openContactModal', handleOpenContactModal);
        };
    }, []);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    // Theme initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const newTheme = !prev;
            if (newTheme) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newTheme;
        });
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        setIsContactFormOpen(true);
    };

    const navLinks = [
        { name: 'Features', path: '#features' },
        { name: 'Pricing', path: '#pricing' },
        { name: 'Team', path: '#team' },
        { name: 'Contact', path: '#contact', onClick: handleContactClick }
    ];

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
                    ? "py-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
                    : "py-6 bg-transparent border-transparent"
                    }`}
            >
                <div className="flex items-center justify-between px-[clamp(1.5rem,5vw,4rem)] w-full max-w-[1920px] mx-auto min-[1200px]:h-14">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 text-black dark:text-white font-extrabold tracking-tight no-underline z-[60]">
                        <motion.img
                            src="/sherlocks_life_logo.png"
                            alt="Sherlock's Life Logo"
                            className="w-auto object-contain transition-all duration-500"
                            animate={{ height: isScrolled ? 45 : 60 }}
                        />
                        <span className="text-[clamp(1.2rem,2vw,1.4rem)] font-bold whitespace-nowrap ml-3 hidden sm:block text-slate-900 dark:text-white">
                            Sherlock's Life
                        </span>
                    </a>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="min-[1200px]:hidden relative w-10 h-10 flex items-center justify-center text-black dark:text-white z-[60] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -6 }} className="absolute w-7 h-[2.5px] bg-current rounded-full" />
                        <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} className="absolute w-7 h-[2.5px] bg-current rounded-full" />
                        <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 6 }} className="absolute w-7 h-[2.5px] bg-current rounded-full" />
                    </button>

                    {/* Desktop Navigation Links */}
                    <div className="hidden min-[1200px]:flex items-center gap-10">
                        <ul className="flex items-center gap-10 list-none m-0 p-0">
                            {navLinks.map((item) => (
                                <li key={item.name}>
                                    <AnimatedNavLink
                                        title={item.name}
                                        href={item.path}
                                        onClick={item.onClick}
                                    />
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-4">
                            <Button onClick={() => setIsSubsidyModalOpen(true)} className="text-[1.05rem]">Get started now</Button>

                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                                aria-label="Toggle Dark Mode"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Sleek Side Drawer Mobile Navigation */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 min-[1200px]:hidden"
                                />
                                <motion.div
                                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed inset-0 w-full h-[100dvh] bg-white dark:bg-black flex flex-col z-[55] pt-32 px-10 min-[1200px]:hidden"
                                >
                                    <ul className="flex flex-col gap-6 list-none m-0 p-0 w-full mb-12">
                                        {navLinks.map((item, i) => (
                                            <motion.li
                                                key={item.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
                                                className="w-full border-b border-gray-100 dark:border-gray-900 pb-4"
                                            >
                                                <a
                                                    href={item.path}
                                                    onClick={(e) => {
                                                        if (item.onClick) item.onClick(e);
                                                        setIsMenuOpen(false);
                                                    }}
                                                    className="text-black dark:text-white text-[2rem] font-bold transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 w-full block cursor-pointer"
                                                >
                                                    {item.name}
                                                </a>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-col gap-4 mt-auto mb-12">
                                        <Button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                setIsSubsidyModalOpen(true);
                                            }}
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                                            className="w-full text-xl py-5"
                                        >
                                            Get started now
                                        </Button>
                                        <button
                                            onClick={toggleTheme}
                                            className="w-full py-5 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-bold flex items-center justify-center gap-3 text-lg transition-colors cursor-pointer"
                                        >
                                            {isDark ? (
                                                <><Sun className="w-6 h-6 text-yellow-400" /> Light Mode</>
                                            ) : (
                                                <><Moon className="w-6 h-6 text-indigo-600" /> Dark Mode</>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            <ContactForm
                isOpen={isContactFormOpen}
                onClose={() => setIsContactFormOpen(false)}
                onSuccess={() => setIsToastVisible(true)}
            />

            <Toast
                isVisible={isToastVisible}
                message="Your message has been sent successfully!"
                onClose={() => setIsToastVisible(false)}
            />

            <SubsidyForm 
                isOpen={isSubsidyModalOpen} 
                onClose={() => setIsSubsidyModalOpen(false)} 
            />
        </>
    );
};

export default Navbar;
