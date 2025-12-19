'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarClientProps {
    children: React.ReactNode;
    user: any;
}

export default function NavbarClient({ children, user }: NavbarClientProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Products', href: '/products' },
        { name: 'UKRP', href: '/ukrp' },
        { name: 'Training', href: '/training' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    // Pages that have a dark hero section where navbar should be transparent at top
    // All other pages (login, products, etc.) will have a solid background immediately
    const isTransparentNavPage = pathname === '/' ||
        pathname === '/about' ||
        pathname === '/contact' ||
        pathname === '/training' ||
        pathname === '/ukrp' ||
        pathname === '/blogs';

    // Dynamic classes based on state
    // Mobile Menu Open: Always White BG, Navy Text
    // Scrolled OR Solid Page: Dark BG (#1A1433), White Text
    // Top of Hero Page: Transparent BG, White Text

    let headerClass = 'transition-all duration-300 ';
    let textClass = 'transition-colors ';
    let buttonClass = 'transition-all ';

    if (mobileMenuOpen) {
        headerClass += 'bg-white shadow-sm py-2 border-b border-gray-100';
        textClass += 'text-sirona-navy hover:text-accent';
        buttonClass += 'border-sirona-navy/20 text-sirona-navy hover:border-sirona-navy hover:bg-transparent';
    } else if (isScrolled || !isTransparentNavPage) {
        // Scrolled or Solid Page -> Dark Background (Prominent)
        headerClass += 'bg-[#1A1433]/95 backdrop-blur-md shadow-md py-3 border-b border-white/10';
        textClass += 'text-white hover:text-accent';
        buttonClass += 'border-white/20 text-white hover:bg-white/10';
    } else {
        // Top of Hero Page -> Transparent
        headerClass += 'bg-transparent py-5';
        textClass += 'text-white/90 hover:text-white';
        buttonClass += 'border-white/20 text-white hover:bg-white/10';
    }

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${headerClass}`}
        >
            <div className="container-custom flex justify-between items-center h-16 md:h-20">
                {/* Logo */}
                <Link href="/" className="relative z-50">
                    <img
                        src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/5cex07u4g1_1765985064905.png"
                        alt="Sirona Aesthetics"
                        className="h-10 md:h-12 w-auto transition-all"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`${textClass} font-medium text-sm tracking-wide transition-colors`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center space-x-6">
                    {children}

                    {!user && (
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className={`${textClass} font-medium transition-colors`}>
                                Login
                            </Link>
                            <Link href="/register" className={`px-6 py-2.5 rounded-full border ${buttonClass} font-semibold transition-all`}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden z-50 p-2 ${isScrolled || mobileMenuOpen ? 'text-sirona-navy' : 'text-white'}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-40 lg:hidden pt-28 px-6"
                    >
                        <div className="flex flex-col space-y-6 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl text-sirona-navy font-bold"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="h-px bg-gray-100 my-4 w-full"></div>

                            <div className="flex flex-col gap-4">
                                {children}

                                {!user && (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-xl text-sirona-navy font-medium"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="px-6 py-4 rounded-full bg-gradient-brand text-white font-bold text-lg shadow-lg shadow-accent/20"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
