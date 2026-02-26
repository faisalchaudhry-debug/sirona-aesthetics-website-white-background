'use client'

import { useState } from 'react'
import { Search, ChevronDown, ChevronUp, MapPin, Phone, ShoppingBag, CreditCard } from 'lucide-react'
import type { GuestSummary } from '@/app/admin/guests/page'

const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-orange-100 text-orange-700',
    paid: 'bg-green-100 text-green-700',
    shipped: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-200 text-gray-600',
}

function formatAddress(
    line1: string | null,
    line2: string | null,
    city: string | null,
    postcode: string | null,
    country: string | null,
) {
    return [line1, line2, city, postcode, country].filter(Boolean).join(', ') || '—'
}

function GuestRow({ guest }: { guest: GuestSummary }) {
    const [expanded, setExpanded] = useState(false)

    const initials = guest.name
        ? guest.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
        : guest.email[0].toUpperCase()

    const shippingAddr = formatAddress(
        guest.shippingLine1, guest.shippingLine2, guest.shippingCity,
        guest.shippingPostcode, guest.shippingCountry,
    )
    const billingAddr = formatAddress(
        guest.billingLine1, null, guest.billingCity,
        guest.billingPostcode, guest.billingCountry,
    )
    const billingSameAsShipping = billingAddr === '—' || billingAddr === shippingAddr

    return (
        <>
            <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                {/* Guest */}
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {initials}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 leading-snug">{guest.name || '—'}</p>
                            <p className="text-sm text-gray-400">{guest.email}</p>
                        </div>
                    </div>
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-sm text-gray-600">
                    {guest.phone ? (
                        <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {guest.phone}
                        </div>
                    ) : (
                        <span className="text-gray-300">—</span>
                    )}
                </td>

                {/* Shipping address */}
                <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px]">
                    {guest.shippingLine1 ? (
                        <div className="flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                            <span className="leading-snug">{shippingAddr}</span>
                        </div>
                    ) : (
                        <span className="text-gray-300">—</span>
                    )}
                </td>

                {/* Orders */}
                <td className="px-6 py-4">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold hover:bg-purple-200 transition-colors"
                    >
                        <ShoppingBag className="w-3 h-3" />
                        {guest.orderCount} {guest.orderCount === 1 ? 'order' : 'orders'}
                        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                </td>

                {/* Total spent */}
                <td className="px-6 py-4 font-semibold text-gray-900">
                    £{guest.totalSpent.toFixed(2)}
                </td>

                {/* Last order */}
                <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(guest.lastOrderDate).toLocaleDateString('en-GB')}
                </td>
            </tr>

            {/* Expanded: order history + billing address */}
            {expanded && (
                <tr className="bg-amber-50/40">
                    <td colSpan={6} className="px-8 py-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Orders list */}
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                    Order History
                                </p>
                                <div className="space-y-2">
                                    {guest.orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-4 py-2.5"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs font-semibold text-gray-700">
                                                    #{order.id.slice(0, 8)}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(order.created_at).toLocaleDateString('en-GB')}
                                                </span>
                                                <span
                                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-600'}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                            <span className="font-semibold text-sm text-gray-800">
                                                £{order.total_amount.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="space-y-4">
                                {/* Shipping */}
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" /> Shipping Address
                                    </p>
                                    <div className="bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                        {guest.shippingLine1 || '—'}
                                        {guest.shippingLine2 && <><br />{guest.shippingLine2}</>}
                                        {guest.shippingCity && <><br />{guest.shippingCity}</>}
                                        {guest.shippingPostcode && <> {guest.shippingPostcode}</>}
                                        {guest.shippingCountry && <><br />{guest.shippingCountry}</>}
                                    </div>
                                </div>

                                {/* Billing */}
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <CreditCard className="w-3.5 h-3.5" /> Billing Address
                                    </p>
                                    <div className="bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                        {billingSameAsShipping ? (
                                            <span className="text-gray-400 italic">Same as shipping address</span>
                                        ) : (
                                            <>
                                                {guest.billingLine1 || '—'}
                                                {guest.billingCity && <><br />{guest.billingCity}</>}
                                                {guest.billingPostcode && <> {guest.billingPostcode}</>}
                                                {guest.billingCountry && <><br />{guest.billingCountry}</>}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}

export default function GuestManagement({ guests }: { guests: GuestSummary[] }) {
    const [search, setSearch] = useState('')

    const filtered = guests.filter((g) => {
        const q = search.toLowerCase()
        return (
            g.name.toLowerCase().includes(q) ||
            g.email.toLowerCase().includes(q) ||
            (g.phone || '').includes(q) ||
            (g.shippingCity || '').toLowerCase().includes(q) ||
            (g.shippingPostcode || '').toLowerCase().includes(q)
        )
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Guest Customers</h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Customers who checked out without an account via Veluria
                    </p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search guests…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 outline-none w-full sm:w-64"
                    />
                </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Total Guests</p>
                    <p className="text-2xl font-bold text-gray-900">{guests.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {guests.reduce((s, g) => s + g.orderCount, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                        £{guests.reduce((s, g) => s + g.totalSpent, 0).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                <th className="px-6 py-3 font-medium">Guest</th>
                                <th className="px-6 py-3 font-medium">Phone</th>
                                <th className="px-6 py-3 font-medium">Shipping Address</th>
                                <th className="px-6 py-3 font-medium">Orders</th>
                                <th className="px-6 py-3 font-medium">Total Spent</th>
                                <th className="px-6 py-3 font-medium">Last Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                                        {search ? 'No guests match your search.' : 'No guest orders yet.'}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((guest) => (
                                    <GuestRow key={guest.email} guest={guest} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
