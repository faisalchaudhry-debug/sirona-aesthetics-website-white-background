import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CancelPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div className="flex justify-center">
                    <XCircle className="w-16 h-16 text-red-500" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Payment Cancelled
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Your payment was cancelled. No charges were made.
                </p>
                <div className="mt-8">
                    <Link href="/cart" className="btn-primary inline-flex items-center justify-center w-full py-3">
                        Return to Cart
                    </Link>
                </div>
            </div>
        </div>
    )
}
