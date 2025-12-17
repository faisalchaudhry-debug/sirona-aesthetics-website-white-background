'use client'

import Link from 'next/link'
import { CheckCircle2, ArrowRight, Loader2, XCircle } from 'lucide-react'
import { useEffect, useState, Suspense } from 'react'
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation'
import { verifyPayment } from '@/app/actions/payment'

function SuccessContent() {
    const { clearCart } = useCart()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!sessionId) {
            setStatus('error')
            setErrorMessage('No session ID found')
            return
        }

        const verify = async () => {
            try {
                const result = await verifyPayment(sessionId)
                if (result.success) {
                    setStatus('success')
                    clearCart()
                } else {
                    setStatus('error')
                    setErrorMessage(result.error || 'Payment verification failed')
                }
            } catch (err) {
                setStatus('error')
                setErrorMessage('An unexpected error occurred')
            }
        }

        verify()
    }, [sessionId, clearCart])

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-[#d946ef] animate-spin" />
                <p className="text-gray-300 text-lg">Verifying your payment...</p>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                        <XCircle className="w-10 h-10 text-red-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Payment Verification Failed</h2>
                <p className="text-gray-400">{errorMessage}</p>
                <div className="pt-4">
                    <Link
                        href="/cart"
                        className="btn-primary w-full py-3 text-base font-semibold shadow-lg shadow-red-500/20 flex items-center justify-center"
                    >
                        Return to Cart
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    Payment Successful!
                </h2>
                <p className="text-gray-400 leading-relaxed">
                    Thank you for your order. We have received your payment and processed your order.
                </p>
            </div>

            <div className="pt-4">
                <Link
                    href="/dashboard"
                    className="btn-primary w-full py-4 text-lg font-semibold shadow-lg shadow-[#d946ef]/20 flex items-center justify-center group"
                >
                    View Order in Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="pt-2">
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#0B1121] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations matching other pages */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d946ef] rounded-full filter blur-[150px] opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38bdf8] rounded-full filter blur-[150px] opacity-10"></div>

            <div className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-sm shadow-2xl relative z-10">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center space-y-4 py-12">
                        <Loader2 className="w-12 h-12 text-[#d946ef] animate-spin" />
                        <p className="text-gray-300">Loading...</p>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </div>
        </div>
    )
}
