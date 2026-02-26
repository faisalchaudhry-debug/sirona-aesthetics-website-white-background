import Link from 'next/link'
import { Clock, CheckCircle, Phone, Mail } from 'lucide-react'

interface PageProps {
    searchParams: Promise<{ orderId?: string }>
}

export default async function OrderReviewPendingPage({ searchParams }: PageProps) {
    const { orderId } = await searchParams
    const shortId = orderId ? orderId.slice(0, 8).toUpperCase() : 'N/A'

    return (
        <div className="min-h-screen bg-[#2D2654] flex items-center justify-center px-4 py-32">
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Top accent bar */}
                <div className="h-2 bg-gradient-to-r from-[#2D2654] to-[#C9A84C]" />

                <div className="p-10 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-amber-100">
                        <Clock className="w-10 h-10 text-amber-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-[#2D2654] mb-3">
                        Your Order is Under Review
                    </h1>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        Thank you for your order. Because it contains <strong>injectable products</strong>, we need to verify your training certification before processing your payment.
                    </p>

                    {/* Order reference */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 mb-8 inline-block w-full">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Your Order Reference</p>
                        <p className="text-xl font-bold font-mono text-[#2D2654]">#{shortId}</p>
                    </div>

                    {/* What happens next */}
                    <div className="text-left space-y-4 mb-8">
                        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">What happens next</p>

                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-600">Our team has been notified and will review your credentials.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-600">We will contact you within <strong>1 business day</strong> to confirm your order and arrange payment.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-[#2D2654] flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-600">If you have any questions in the meantime, please <a href="/contact" className="text-[#C9A84C] font-semibold hover:underline">contact us</a>.</p>
                        </div>
                    </div>

                    <Link
                        href="/products"
                        className="block w-full bg-[#2D2654] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#3d3470] transition-colors text-sm"
                    >
                        Continue Browsing
                    </Link>
                </div>
            </div>
        </div>
    )
}
