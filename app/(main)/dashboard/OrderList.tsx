'use client'

import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp, Package, ExternalLink } from 'lucide-react' // Added icons
import { generateInvoicePDFAsync } from '@/utils/pdf-generator'
import Link from 'next/link'

interface OrderListProps {
    orders: any[] | null
    profile?: any // Optional profile if needed directly, but usually derived or passed
}

// Helper for status colors (matching OrderRow.tsx style roughly)
const getStatusColor = (status: string) => {
    switch (status) {
        case 'paid':
        case 'shipped':
        case 'delivered':
            return 'bg-green-100 text-green-700'
        case 'pending':
            return 'bg-yellow-100 text-yellow-700'
        case 'cancelled':
            return 'bg-gray-100 text-gray-700'
        default:
            return 'bg-gray-100 text-gray-700'
    }
}

export default function OrderList({ orders, profile }: OrderListProps) {
    // We need profile info for the invoice. 
    // In page.tsx, profile is fetched. We might need to pass it down or fetch it here.
    // Looking at page.tsx, <OrderList orders={orders} /> is passed. Profile is also available in page.tsx.
    // I should update page.tsx to pass profile to OrderList, OR handle it here if possible.
    // Ideally, page.tsx should pass it. 
    // For now, I will assume I need to update page.tsx to pass profile as well.
    // Wait, I can't easily update page.tsx again in the same turn without potential conflicts if I didn't plan it?
    // Actually, I can update page.tsx to pass profile.

    // For this step, I'll create the component expecting `orders`. I will also add `profile` to props.
    // I'll need to update page.tsx to pass profile.

    // If orders is null/empty
    if (!orders || orders.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                You haven't placed any orders yet.
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {orders.map((order) => (
                        <OrderRowItem key={order.id} order={order} profile={profile} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function OrderRowItem({ order, profile }: { order: any, profile: any }) {
    const [isGenerating, setIsGenerating] = useState(false)

    const handleDownloadInvoice = async () => {
        setIsGenerating(true)
        try {
            await generateInvoicePDFAsync(order, profile || {
                full_name: 'Guest',
                email: '',
            })
        } catch (error) {
            console.error("Failed to generate invoice", error)
            alert("Could not generate invoice. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    const statusColor = getStatusColor(order.status)
    const date = new Date(order.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4">
                <span className="font-mono text-sm font-medium text-gray-900">
                    #{order.id.slice(0, 8)}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
                {date}
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}>
                    {order.status}
                </span>
            </td>
            <td className="px-6 py-4 font-medium text-gray-900">
                £{order.total_amount.toFixed(2)}
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Invoice Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleDownloadInvoice();
                        }}
                        disabled={isGenerating}
                        className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-full disabled:opacity-50"
                        title="Download Invoice"
                    >
                        <FileText className="w-4 h-4" />
                    </button>

                    <Link href={`/account/orders/${order.id}`} className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-full" title="View Details">
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </td>
        </tr>
    )
}
