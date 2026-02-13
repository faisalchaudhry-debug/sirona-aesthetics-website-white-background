'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function PaymentButton({ orderId }: { orderId: string }) {
    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/pay-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Payment initiation failed')
            }

            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Payment error:', error)
            alert('Failed to start payment process. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Proceed to Payment'}
        </button>
    )
}
