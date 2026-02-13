import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Package, Calendar, MapPin, Download } from 'lucide-react'
import PaymentButton from './PaymentButton'

// Force dynamic rendering to handle searchParams/params correctly
export const revalidate = 0

interface OrderPageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
    const supabase = await createClient()
    const { id } = await params

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect(`/login?message=Please log in to view this order&next=/account/orders/${id}`)
    }

    // Fetch Order Details
    const { data: order, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (
                    name,
                    description,
                    image_url
                )
            )
        `)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user owns the order
        .single()

    if (error || !order) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center max-w-md w-full">
                    <div className="bg-red-50 p-3 rounded-full inline-flex mb-4">
                        <Package className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                    <p className="text-gray-500 mb-6">
                        We couldn't find the order you're looking for. It might not exist or you don't have permission to view it.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-24 md:pt-32">
            <div className="container p-6 mx-auto max-w-4xl">
                <div className="mb-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                Order <span className="text-gray-400 font-mono text-xl">#{order.id.slice(0, 8)}</span>
                            </h1>
                            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Placed on {new Date(order.created_at).toLocaleDateString(undefined, {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium capitalize ring-1 ring-inset
                                ${order.status === 'paid' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                    order.status === 'shipped' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                        order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
                                            order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' :
                                                order.status === 'cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                                                    'bg-gray-50 text-gray-600 ring-gray-500/10'}`}>
                                {order.status}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">


                        {/* Items */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {order.order_items.map((item: any) => (
                                    <div key={item.id} className="p-6 flex items-start gap-6">
                                        <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                                            {item.products?.image_url ? (
                                                <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <Package className="w-10 h-10 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-1">
                                            <div>
                                                <h3 className="font-medium text-gray-900 text-lg mb-1 leading-snug">{item.products?.name || 'Product'}</h3>
                                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-gray-900 text-lg">
                                                £{item.price_at_purchase.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Info */}
                        {order.status === 'pending' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Required</h2>
                                <p className="text-gray-600 mb-6">
                                    This order is currently pending payment. Please proceed to payment to complete your order.
                                </p>
                                <PaymentButton orderId={order.id} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>£{(order.total_amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                                    <span>Total</span>
                                    <span>£{order.total_amount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    Shipping Address
                                </h3>
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    <p className="font-medium text-gray-900">{profile?.full_name}</p>
                                    <p>{profile?.address_line1}</p>
                                    {profile?.address_line2 && <p>{profile.address_line2}</p>}
                                    <p>{profile?.city}, {profile?.state} {profile?.postal_code}</p>
                                    <p>{profile?.country}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
