import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div className="flex justify-center">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Payment Successful!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Thank you for your order. We have received your payment and will process your order shortly.
                </p>
                <div className="mt-8">
                    <Link href="/products" className="btn-primary inline-flex items-center justify-center w-full py-3">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}
