'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, ShoppingBag, ShoppingCart, LogOut, Package, Image as ImageIcon, FileText, Star, Calendar, X } from 'lucide-react'
import { logout } from '@/app/(main)/(auth)/actions'

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname()

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Reviews', href: '/admin/reviews', icon: Star },
        { name: 'Blogs', href: '/admin/blogs', icon: FileText },
        { name: 'Contact Forms', href: '/admin/contact-submissions', icon: FileText },
        { name: 'Media', href: '/admin/media', icon: ImageIcon },
    ]

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#0F1420] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:static lg:translate-x-0
            `}>
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <img
                            src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/5cex07u4g1_1765985064905.png"
                            alt="Sirona Logo"
                            className="h-8 w-auto"
                        />
                        <span className="font-bold text-white text-lg tracking-wide">Admin</span>
                    </Link>
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => onClose()} // Close menu on navigation (mobile)
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => logout()}
                        className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}
