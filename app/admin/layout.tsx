import AdminSidebar from '@/components/admin/Sidebar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata = {
    title: 'Admin | Sirona Aesthetics',
    description: 'Admin Control Panel',
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    // Verify admin role for the entire admin section
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profile || profile.role !== 'admin') {
        redirect('/')
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50/50 text-gray-900`}
                suppressHydrationWarning
            >
                <div className="flex min-h-screen bg-gray-50">
                    <AdminSidebar />
                    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/50">
                        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-8 shadow-sm z-10">
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
                            <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-500">
                                    {user.email}
                                </div>
                                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                                    {user.email?.[0].toUpperCase()}
                                </div>
                            </div>
                        </header>
                        <main className="flex-1 overflow-auto p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    )
}
