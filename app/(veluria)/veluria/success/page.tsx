'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { verifyPayment } from '@/app/actions/payment'
import Link from 'next/link'
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react'

function VeluriaSuccessContent() {
    const { clearCart } = useCart()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!sessionId) {
            setStatus('error')
            setErrorMessage('No session ID found.')
            return
        }

        verifyPayment(sessionId).then((result) => {
            if (result.success) {
                clearCart()
                setStatus('success')
            } else {
                setStatus('error')
                setErrorMessage(result.error || 'Payment verification failed.')
            }
        }).catch(() => {
            setStatus('error')
            setErrorMessage('An unexpected error occurred.')
        })
    }, [sessionId, clearCart])

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="w-12 h-12 text-[#C9A84C] animate-spin" />
                <p className="text-white/50">Verifying your payment…</p>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-10 h-10 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Payment Verification Failed</h2>
                <p className="text-white/40 text-sm leading-relaxed">{errorMessage}</p>
                <Link
                    href="/veluria/checkout"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 text-sm font-semibold transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Checkout
                </Link>
            </div>
        )
    }

    return (
        <div className="text-center space-y-6">
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                style={{ background: 'linear-gradient(135deg, #C9A84C20, #C9A84C10)' }}
            >
                <CheckCircle2 className="w-10 h-10 text-[#C9A84C]" />
            </div>

            <div>
                <h2 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h2>
                <p className="text-white/50 leading-relaxed text-sm max-w-sm mx-auto">
                    Thank you for your order. Stripe will send a receipt to your email address.
                    Our team will be in touch regarding dispatch.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link
                    href="/veluria"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', color: '#0E0B1F' }}
                >
                    Back to Veluria
                </Link>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-white/20 text-white hover:border-white/40 transition-colors"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    )
}

export default function VeluriaSuccessPage() {
    return (
        <div className="min-h-screen bg-[#0E0B1F] flex items-center justify-center px-6 py-16 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2D2654]/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                <Suspense
                    fallback={
                        <div className="flex flex-col items-center gap-4 py-8">
                            <Loader2 className="w-12 h-12 text-[#C9A84C] animate-spin" />
                            <p className="text-white/50">Loading…</p>
                        </div>
                    }
                >
                    <VeluriaSuccessContent />
                </Suspense>
            </div>
        </div>
    )
}
