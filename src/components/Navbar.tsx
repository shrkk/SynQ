import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Mission', href: '#mission' },
        { name: 'Product', href: '#product' },
        { name: 'Features', href: '#features' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-sous-bg/80 backdrop-blur-md border-b border-sous-border' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <span className="text-2xl font-bold text-white tracking-tight">
                                sous
                            </span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-sous-text-secondary hover:text-white transition-colors duration-200 text-sm font-medium"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <div className="flex gap-4">
                                    <Link to="/login" className="text-white hover:text-sous-accent-cyan transition-colors py-2">
                                        Login
                                    </Link>
                                    <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-white/10 flex items-center gap-2">
                                        Get Early Access
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </SignedOut>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-300 hover:text-white p-2"
                            >
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-sous-bg pt-20 px-4 md:hidden"
                    >
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sous-text-primary text-lg font-medium py-2 border-b border-sous-border"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button onClick={() => {
                                setIsMobileMenuOpen(false);
                                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                            }} className="bg-sous-accent-cyan/10 text-sous-accent-cyan px-4 py-3 rounded-lg text-center font-medium mt-4">
                                Get Early Access
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
