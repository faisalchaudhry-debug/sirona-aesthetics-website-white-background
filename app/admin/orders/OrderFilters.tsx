'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface OrderFiltersProps {
    orderCount: number
}

export default function OrderFilters({ orderCount }: OrderFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentPayment = searchParams.get('payment') || ''
    const currentFulfillment = searchParams.get('fulfillment') || ''

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.push(`/admin/orders?${params.toString()}`)
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-6 justify-between items-center">
            <div className="flex gap-6 items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Payment:</span>
                    <select
                        value={currentPayment}
                        onChange={(e) => updateFilter('payment', e.target.value)}
                        className="bg-transparent text-sm text-gray-600 focus:outline-none cursor-pointer hover:text-gray-900 border-none"
                    >
                        <option value="">All</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Fulfillment:</span>
                    <select
                        value={currentFulfillment}
                        onChange={(e) => updateFilter('fulfillment', e.target.value)}
                        className="bg-transparent text-sm text-gray-600 focus:outline-none cursor-pointer hover:text-gray-900 border-none"
                    >
                        <option value="">All</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="unfulfilled">Unfulfilled</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="text-sm text-gray-500">
                Showing {orderCount} order{orderCount !== 1 ? 's' : ''}
            </div>
        </div>
    )
}
