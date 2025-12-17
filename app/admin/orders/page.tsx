import { createClient } from '@/utils/supabase/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import OrderRow from './OrderRow'
import OrderFilters from './OrderFilters'
import { Suspense } from 'react'

export const revalidate = 0

interface PageProps {
    searchParams: Promise<{ payment?: string; fulfillment?: string }>
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
    const params = await searchParams
    const paymentFilter = params.payment || ''
    const fulfillmentFilter = params.fulfillment || ''

    const supabase = await createClient()

    // Fetch Orders with Items and Products (nested join)
    const { data: orders } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (
                    name,
                    image_url
                )
            )
        `)
        .order('created_at', { ascending: false })

    // Fetch Profiles for Customer Info (manual join)
    let ordersWithProfiles: any[] = []
    if (orders && orders.length > 0) {
        const userIds = orders.map(o => o.user_id)
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .in('id', userIds)

        ordersWithProfiles = orders.map(order => ({
            ...order,
            profile: profiles?.find(p => p.id === order.user_id)
        }))
    }

    // Apply filters
    let filteredOrders = ordersWithProfiles

    // Payment filter
    if (paymentFilter === 'paid') {
        filteredOrders = filteredOrders.filter(o => ['paid', 'shipped', 'delivered'].includes(o.status))
    } else if (paymentFilter === 'unpaid') {
        filteredOrders = filteredOrders.filter(o => o.status === 'pending')
    } else if (paymentFilter === 'cancelled') {
        filteredOrders = filteredOrders.filter(o => o.status === 'cancelled')
    }

    // Fulfillment filter
    if (fulfillmentFilter === 'fulfilled') {
        filteredOrders = filteredOrders.filter(o => ['shipped', 'delivered'].includes(o.status))
    } else if (fulfillmentFilter === 'unfulfilled') {
        filteredOrders = filteredOrders.filter(o => ['pending', 'paid'].includes(o.status))
    } else if (fulfillmentFilter === 'cancelled') {
        filteredOrders = filteredOrders.filter(o => o.status === 'cancelled')
    }

    const orderCount = filteredOrders.length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            </div>

            {/* Filters Bar */}
            <Suspense fallback={<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">Loading filters...</div>}>
                <OrderFilters orderCount={orderCount} />
            </Suspense>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-4 py-3 font-semibold">Order ID</th>
                                <th className="px-4 py-3 font-semibold">Customer</th>
                                <th className="px-4 py-3 font-semibold">Date</th>
                                <th className="px-4 py-3 font-semibold">Total</th>
                                <th className="px-4 py-3 font-semibold">Payment</th>
                                <th className="px-4 py-3 font-semibold">Fulfillment</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <OrderRow key={order.id} order={order} profile={order.profile} />
                            ))}

                            {orderCount === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                                        No orders found matching filters.
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
