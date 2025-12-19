import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut, Package, User, ShoppingBag, Edit, Clock, Home, Phone, Building, Mail, AlertTriangle } from 'lucide-react'
import { logout } from '@/app/(main)/(auth)/actions'
import Link from 'next/link'

export const revalidate = 0

interface DashboardPageProps {
    searchParams: Promise<{ message?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
    const supabase = await createClient()
    const params = await searchParams
    const successMessage = params.message

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Redirect admins to the admin panel
    if (profile?.role === 'admin') {
        redirect('/admin')
    }

    // Check if account is pending approval
    // Treat both 'doctor' and 'user' roles as pending if not approved
    const isPending = (profile?.role === 'doctor' || profile?.role === 'user') && !profile.is_approved;

    // Fetch User's Orders
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Premium Header */}
            <div className="bg-[#131B3A] text-white pt-24 pb-12 md:pt-16 md:pb-24 transition-all">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
                        <div>
                            <h1 className="text-3xl font-serif mb-2">My Dashboard</h1>
                            <p className="text-gray-300">Welcome back, {profile?.full_name?.split(' ')[0]}</p>
                        </div>
                        <form action={logout} className="w-full md:w-auto">
                            <button className="flex w-full md:w-auto justify-center items-center px-4 py-3 md:py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium backdrop-blur-sm border border-white/10">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container-custom -mt-6 md:-mt-16 relative z-10 space-y-6 md:space-y-8">
                {/* Success Message Banner */}
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm flex items-start space-x-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                            <Mail className="w-6 h-6 text-green-700" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-green-900 mb-1">Update Initiated</h3>
                            <p className="text-green-800 text-sm leading-relaxed">
                                {successMessage}
                            </p>
                        </div>
                    </div>
                )}

                {/* Pending Approval Banner */}
                {isPending && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm flex items-start space-x-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="bg-yellow-100 p-2 rounded-lg flex-shrink-0">
                            <Clock className="w-6 h-6 text-yellow-700" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-yellow-900 mb-1">Account Under Review</h3>
                            <p className="text-yellow-800 text-sm leading-relaxed">
                                Thank you for registering. Your professional account is currently being reviewed by our team.
                                Once approved, you will gain access to exclusive professional pricing. We will notify you via email shortly.
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                                        {profile?.full_name?.charAt(0) || <User className="w-8 h-8" />}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h2 className="text-lg font-bold text-gray-900 truncate">{profile?.full_name}</h2>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize mt-1">
                                            {profile?.role} Account
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                            <Mail className="w-3 h-3 mr-2" /> Email
                                        </label>
                                        <div className="text-gray-900 font-medium break-all">{profile?.email}</div>
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                            <Building className="w-3 h-3 mr-2" /> Company / Clinic
                                        </label>
                                        <div className="text-gray-900 font-medium">{profile?.company_name || '-'}</div>
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                            <Phone className="w-3 h-3 mr-2" /> Phone
                                        </label>
                                        <div className="text-gray-900 font-medium">{profile?.phone || '-'}</div>
                                    </div>

                                    {(profile?.address_line1 || profile?.city) && (
                                        <div className="group border-t border-gray-100 pt-4 mt-4">
                                            <label className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                                <Home className="w-3 h-3 mr-2" /> Shipping Address
                                            </label>
                                            <div className="text-gray-900 font-medium text-sm leading-relaxed">
                                                {profile?.address_line1}<br />
                                                {profile?.address_line2 && <>{profile.address_line2}<br /></>}
                                                {profile?.city && <>{profile.city},</>} {profile?.state} {profile?.postal_code}<br />
                                                {profile?.country}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        href="/dashboard/edit"
                                        className="flex w-full items-center justify-center px-4 py-3 md:py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                            <div className="px-6 md:px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                    <ShoppingBag className="w-5 h-5 mr-3 text-primary" />
                                    Order History
                                </h2>
                            </div>

                            {!orders || orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                                        <Package className="h-10 w-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                                    <p className="text-gray-500 max-w-sm mb-6">
                                        You haven't placed any orders yet. Start shopping to see your order status here.
                                    </p>
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop Table View */}
                                    <div className="hidden md:block overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50/50">
                                                <tr className="text-gray-500 text-xs uppercase tracking-wider">
                                                    <th className="px-8 py-4 font-medium">Order ID</th>
                                                    <th className="px-8 py-4 font-medium">Date</th>
                                                    <th className="px-8 py-4 font-medium">Status</th>
                                                    <th className="px-8 py-4 font-medium text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {orders.map((order) => (
                                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="px-8 py-4">
                                                            <span className="font-mono text-sm text-gray-600 group-hover:text-primary transition-colors">
                                                                #{order.id.slice(0, 8)}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-4 text-gray-600 text-sm">
                                                            {new Date(order.created_at).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ring-1 ring-inset
                                                            ${order.status === 'paid' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                                                    order.status === 'shipped' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                                                        order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
                                                                            order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' :
                                                                                order.status === 'cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                                                                                    'bg-gray-50 text-gray-600 ring-gray-500/10'}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-4 text-right font-medium text-gray-900">
                                                            £{order.total_amount.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="md:hidden divide-y divide-gray-100">
                                        {orders.map((order) => (
                                            <div key={order.id} className="p-4 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="font-mono text-sm text-gray-900 font-bold block">
                                                            #{order.id.slice(0, 8)}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(order.created_at).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ring-1 ring-inset
                                                        ${order.status === 'paid' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                                            order.status === 'shipped' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                                                order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
                                                                    order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' :
                                                                        order.status === 'cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                                                                            'bg-gray-50 text-gray-600 ring-gray-500/10'}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center pt-2">
                                                    <span className="text-sm text-gray-500 font-medium">Total Amount</span>
                                                    <span className="text-base font-bold text-gray-900">£{order.total_amount.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
