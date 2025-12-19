'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { Menu } from 'lucide-react';

interface AdminLayoutClientProps {
    children: React.ReactNode;
    user: any;
}

export default function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/50 min-w-0">
                <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 tracking-tight truncate">Dashboard Overview</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500 hidden sm:block">
                            {user.email}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium shadow-sm">
                            {user.email?.[0].toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-4 lg:p-6 min-h-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
