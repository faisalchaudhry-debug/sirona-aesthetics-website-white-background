import { createClient } from '@/utils/supabase/server'
import { updateOrderStatus } from './actions'
import { ShoppingBag, ChevronDown } from 'lucide-react'

export const revalidate = 0

export default async function AdminOrdersPage() {
    const supabase = await createClient()

    // Fetch orders with user profile
    // Note: Supabase join requiring foreign key setup. Assuming user_id refers to auth.users which profiles.id also refers to.
    // We might need to fetch profiles separately if direct join isn't robust, but standard Supabase setup usually allows:
    // .select('*, profiles(full_name, email)') if 'orders.user_id' -> 'profiles.id' FK exists. 
    // If FK doesn't exist explicitly in schema (it references auth.users), we might just fetch orders and then map.

    // Let's try basic fetch first, if join fails we'll fix.
    // Actually, based on schema `user_id uuid references auth.users`, and `profiles.id references auth.users`.
    // There is no direct FK between orders and profiles. 
    // So we fetch orders, then fetch profiles for those user_ids.

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

    // Fetch profiles for these orders
    let ordersWithProfiles = []
    if (orders && orders.length > 0) {
        const userIds = orders.map(o => o.user_id)
        const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', userIds)

        ordersWithProfiles = orders.map(order => {
            const profile = profiles?.find(p => p.id === order.user_id)
            return {
                ...order,
                profile
            }
        })
    }

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 font-medium">Order ID</th>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Total</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium text-right">Update Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {ordersWithProfiles.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.profile?.full_name || 'Unknown User'}</div>
                                        <div className="text-gray-500 text-xs">{order.profile?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">${order.total_amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <form action={updateOrderStatus} className="inline-flex items-center">
                                            <input type="hidden" name="orderId" value={order.id} />
                                            <div className="relative">
                                                <select
                                                    name="status"
                                                    defaultValue={order.status}
                                                    onChange={(e) => e.target.form?.requestSubmit()}
                                                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1 pl-3 pr-8 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                    <ChevronDown className="h-3 w-3" />
                                                </div>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {ordersWithProfiles.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                        <p>No orders found yet.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
