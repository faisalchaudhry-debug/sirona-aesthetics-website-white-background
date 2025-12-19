import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Geist, Geist_Mono } from "next/font/google"
import AdminLayoutClient from '@/components/admin/AdminLayoutClient'
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
    icons: {
        icon: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/sktve28306g_1765983407701.png",
    },
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
                <AdminLayoutClient user={user}>
                    {children}
                </AdminLayoutClient>
            </body>
        </html>
    )
}
