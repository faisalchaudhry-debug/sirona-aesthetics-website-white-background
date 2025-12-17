import { createClient } from '@/utils/supabase/server'
import { Users, ShoppingBag, Package, DollarSign } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    // Fetch stats
    const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
    const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
    const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })

    // Get pending users count
    const { count: pendingCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', false)
        .eq('role', 'user')

    const stats = [
        { name: 'Total Users', value: usersCount || 0, icon: Users, color: 'bg-blue-500', href: '/admin/users' },
        { name: 'Total Products', value: productsCount || 0, icon: Package, color: 'bg-indigo-500', href: '/admin/products' },
        { name: 'Total Orders', value: ordersCount || 0, icon: ShoppingBag, color: 'bg-pink-500', href: '/admin/orders' },
        { name: 'Pending Approvals', value: pendingCount || 0, icon: Users, color: 'bg-orange-500', href: '/admin/users' },
    ]

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Link key={item.name} href={item.href} className="group bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${item.color.replace('bg-', 'bg-').replace('500', '50')} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className={`h-6 w-6 ${item.color.replace('bg-', 'text-')}`} aria-hidden="true" />
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                                    +12%
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">{item.name}</h3>
                                <div className="text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors">{item.value}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="p-4 rounded-full bg-gray-50 mb-4">
                            <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No recent activity to show.</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#0F1420] to-[#1a202e] rounded-2xl shadow-lg border border-gray-800 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Package className="w-32 h-32" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 relative z-10">Admin Control</h3>
                    <p className="text-gray-400 mb-8 relative z-10 text-sm">
                        Manage your products, orders, and users efficiently from one central hub.
                    </p>

                    <Link href="/admin/products" className="inline-flex items-center justify-center w-full py-3 bg-primary hover:bg-primary/90 rounded-xl font-semibold transition-colors relative z-10">
                        Manage Products
                    </Link>
                </div>
            </div>
        </div>
    )
}
