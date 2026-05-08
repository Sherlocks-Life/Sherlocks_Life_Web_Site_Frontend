import React from 'react';
import { ShieldCheck, Mail, Phone, Send } from 'lucide-react';
import Button from '../ui/Button';

// Social Icons
const Facebook = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const Instagram = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    </svg>
);

const Twitter = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

const Linkedin = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const Footer = () => {

    // ✅ Quick Links
    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Our Team", href: "/team" },
        { name: "Contact", href: "/contact" },
        { name: "Subsidy Form", href: "/subsidy-form" },
    ];

    // ✅ Support Links
    const supportLinks = [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Help Center", href: "/help-center" },
    ];

    return (
        <footer className="bg-white dark:bg-black pt-20 pb-8 border-t">
            <div className="px-6">

                {/* Newsletter */}
                <div className="mb-16 flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/2">
                        <h4 className="text-black dark:text-white text-xl font-bold">
                            Stay updated with safety tips
                        </h4>
                        <p>Join our newsletter for updates.</p>
                    </div>

                    <form className="lg:w-1/2 flex gap-3">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full border px-4 py-2 rounded"
                        />
                        <Button type="submit" icon={Send}>
                            Subscribe
                        </Button>
                    </form>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-4">
                        <h3 className="text-black dark:text-white font-bold text-xl">
                            Sherlock's Life
                        </h3>

                        <ul className="mt-4 space-y-3">
                            <li>
                                <a href="mailto:support@sherlockslife.com" className="flex gap-2">
                                    <Mail className="w-4" />
                                    support@sherlockslife.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+18005550199" className="flex gap-2">
                                    <Phone className="w-4" />
                                    +1 800 555 0199
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h5 className="font-bold mb-4">Quick Links</h5>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="hover:underline">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="lg:col-span-2">
                        <h5 className="font-bold mb-4">Support</h5>
                        <ul className="space-y-2">
                            {supportLinks.map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="hover:underline">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Safety */}
                    <div className="lg:col-span-4">
                        <h5 className="font-bold mb-4">Safety & Trust</h5>
                        <div className="flex gap-2">
                            <ShieldCheck className="w-5" />
                            <p className="text-sm">
                                We protect your data and privacy with full security.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 Sherlock's Life</p>

                    <div className="flex gap-3">
                        {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="hover:scale-110 transition">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;