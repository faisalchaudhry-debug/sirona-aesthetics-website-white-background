'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, Package } from 'lucide-react'
import OrderStatusSelect from './OrderStatusSelect'
import { generateInvoicePDFAsync, generatePackingSlipPDFAsync } from '@/utils/pdf-generator'

interface OrderRowProps {
    order: any
    profile: any
}

export default function OrderRow({ order, profile }: OrderRowProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Derive payment and fulfillment status from order status
    const isCancelled = order.status === 'cancelled'
    const isPaid = ['paid', 'shipped', 'delivered'].includes(order.status)
    const isFulfilled = ['shipped', 'delivered'].includes(order.status)

    const itemCount = order.order_items?.length || 0

    // Get payment badge style and text
    const getPaymentBadge = () => {
        if (isCancelled) return { text: 'Cancelled', classes: 'bg-gray-200 text-gray-600' }
        if (isPaid) return { text: 'Paid', classes: 'bg-green-100 text-green-700' }
        return { text: 'Unpaid', classes: 'bg-red-100 text-red-700' }
    }

    // Get fulfillment badge style and text
    const getFulfillmentBadge = () => {
        if (isCancelled) return { text: 'Cancelled', classes: 'bg-gray-200 text-gray-600' }
        if (isFulfilled) return { text: 'Fulfilled', classes: 'bg-green-100 text-green-700' }
        return { text: 'Unfulfilled', classes: 'bg-orange-100 text-orange-600' }
    }

    const paymentBadge = getPaymentBadge()
    const fulfillmentBadge = getFulfillmentBadge()

    return (
        <>
            <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                {/* ORDER ID */}
                <td className="px-4 py-4">
                    <span className="font-mono text-sm font-semibold text-gray-800">#{order.id.slice(0, 8)}</span>
                </td>

                {/* CUSTOMER */}
                <td className="px-4 py-4">
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{profile?.full_name || order.guest_name || 'Unknown'}</span>
                        <span className="text-xs text-gray-400">{profile?.email || order.guest_email || 'N/A'}</span>
                        {!profile && order.guest_name && (
                            <span className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider mt-0.5">Guest</span>
                        )}
                    </div>
                </td>

                {/* DATE */}
                <td className="px-4 py-4 text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleDateString('en-GB')}
                </td>

                {/* TOTAL */}
                <td className="px-4 py-4 font-medium text-gray-900">
                    £{Number(order.total_amount).toFixed(2)}
                </td>

                {/* PAYMENT */}
                <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${paymentBadge.classes}`}>
                        {paymentBadge.text}
                    </span>
                </td>

                {/* FULFILLMENT */}
                <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${fulfillmentBadge.classes}`}>
                        {fulfillmentBadge.text}
                    </span>
                </td>

                {/* STATUS */}
                <td className="px-4 py-4">
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </td>

                {/* ITEMS */}
                <td className="px-4 py-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium focus:outline-none"
                    >
                        {itemCount} items
                        {isExpanded
                            ? <ChevronUp className="w-4 h-4 ml-1" />
                            : <ChevronDown className="w-4 h-4 ml-1" />
                        }
                    </button>
                </td>
            </tr>

            {/* Expanded Row: Order Items */}
            {isExpanded && (
                <tr className="bg-gray-50/80">
                    <td colSpan={8} className="px-6 py-4">
                        <div className="ml-4 pl-4 border-l-2 border-purple-200">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-600">Order Items:</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => generateInvoicePDFAsync(order, profile ?? { full_name: order.guest_name || 'Guest', email: order.guest_email || '' })}
                                        className="flex items-center px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                                    >
                                        <FileText className="w-3.5 h-3.5 mr-1.5" />
                                        Invoice
                                    </button>
                                    <button
                                        onClick={() => generatePackingSlipPDFAsync(order, profile ?? { full_name: order.guest_name || 'Guest', email: order.guest_email || '' })}
                                        className="flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                                    >
                                        <Package className="w-3.5 h-3.5 mr-1.5" />
                                        Packing Slip
                                    </button>
                                </div>
                            </div>
                            <ul className="space-y-1.5">
                                {order.order_items?.map((item: any, idx: number) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></span>
                                        <span className="font-medium">{item.products?.name || 'Unknown Product'}</span>
                                        <span className="text-gray-400 mx-2">x</span>
                                        <span>{item.quantity}</span>
                                        <span className="mx-2">-</span>
                                        <span className="font-mono text-gray-500">£{Number(item.price_at_purchase).toFixed(2)}</span>
                                    </li>
                                ))}
                                {(!order.order_items || order.order_items.length === 0) && (
                                    <li className="text-sm text-gray-400 italic">No items found</li>
                                )}
                            </ul>
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}
