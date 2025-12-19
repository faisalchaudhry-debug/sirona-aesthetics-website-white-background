'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, LogOut, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartBadge from './CartBadge';
import { logout } from '@/app/(main)/(auth)/actions';

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

    // Dynamic classes based on state
    // Mobile Menu Open: Always White BG, Navy Text
    // Scrolled OR Solid Page: Dark BG (#1A1433), White Text
    // Top of Hero Page: Transparent BG, White Text

    let headerClass = 'transition-all duration-300 ';
    let textClass = 'transition-colors ';
    let buttonClass = 'transition-all ';
    let menuButtonColor = 'text-white'; // Default to white

    if (mobileMenuOpen) {
        headerClass += 'bg-white shadow-sm py-2 border-b border-gray-100';
        textClass += 'text-sirona-navy hover:text-accent';
        buttonClass += 'border-sirona-navy/20 text-sirona-navy hover:border-sirona-navy hover:bg-transparent';
        menuButtonColor = 'text-sirona-navy';
    } else if (isScrolled || !isTransparentNavPage) {
        // Scrolled or Solid Page -> Dark Background (Prominent)
        headerClass += 'bg-[#1A1433]/95 backdrop-blur-md shadow-md py-3 border-b border-white/10';
        textClass += 'text-white hover:text-accent';
        buttonClass += 'border-white/20 text-white hover:bg-white/10';
        menuButtonColor = 'text-white';
    } else {
        // Top of Hero Page -> Transparent
        headerClass += 'bg-transparent py-5';
        textClass += 'text-white/90 hover:text-white';
        buttonClass += 'border-white/20 text-white hover:bg-white/10';
        menuButtonColor = 'text-white';
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
                <motion.button
                    className={`lg:hidden z-50 p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none ${menuButtonColor}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    whileTap={{ scale: 0.95 }}
                >
                    <AnimatePresence mode="wait">
                        {mobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 bg-white z-40 lg:hidden pt-24 px-6 h-screen flex flex-col"
                    >
                        <div className="flex flex-col space-y-6 items-start w-full max-w-md mx-auto">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 + 0.1 }}
                                    className="w-full"
                                >
                                    <Link
                                        href={link.href}
                                        className="text-3xl text-sirona-navy font-bold block w-full py-1 hover:text-accent transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                className="h-px bg-gray-100 my-4 w-full"
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 0.4 }}
                            ></motion.div>

                            <motion.div
                                className="flex flex-col gap-4 w-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {/* Mobile Cart Link */}
                                <div className="flex items-center justify-between w-full py-2 group">
                                    <Link
                                        href="/cart"
                                        className="text-xl text-sirona-navy font-medium group-hover:text-accent transition-colors flex-grow"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Cart
                                    </Link>
                                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-accent/10 transition-colors">
                                        <CartBadge
                                            className="text-sirona-navy group-hover:text-accent"
                                            onClick={() => setMobileMenuOpen(false)}
                                        />
                                    </div>
                                </div>

                                {!user && (
                                    <div className="flex gap-4 w-full">
                                        <Link
                                            href="/login"
                                            className="flex-1 text-center py-4 rounded-xl border border-[#2D2654] text-[#2D2654] font-bold text-lg hover:bg-[#2D2654]/5 transition-all"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="flex-1 text-center py-4 rounded-xl bg-[#2D2654] text-white font-bold text-lg shadow-lg shadow-[#2D2654]/20 active:scale-95 transition-all"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                                {user && (
                                    <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-xl mt-2">
                                        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                                            <div className="w-10 h-10 rounded-full bg-sirona-navy text-white flex items-center justify-center font-bold text-lg">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-500 font-medium">Signed in as</span>
                                                <span className="text-sirona-navy font-bold truncate max-w-[200px]">{user.email}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 text-sirona-navy font-medium hover:text-accent transition-colors py-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <LayoutDashboard size={20} />
                                            Dashboard
                                        </Link>

                                        <button
                                            onClick={async () => {
                                                await logout();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="flex items-center gap-3 text-red-500 font-medium hover:text-red-600 transition-colors py-2 text-left"
                                        >
                                            <LogOut size={20} />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
