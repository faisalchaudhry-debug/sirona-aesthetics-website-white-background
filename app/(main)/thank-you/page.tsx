import Link from 'next/link'
import { Check, Shield, Mail } from 'lucide-react'

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl shadow-[#2D2654]/5 text-center">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-[#2D2654] block">
                    Submission Received
                </h1>

                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                    <p>
                        Thank you for your submission. Our team is currently reviewing your account details to verify your medical credentials.
                    </p>
                    <p>
                        Once approved, you will receive a confirmation email from our team. You will then be able to access our full product catalog and place orders.
                    </p>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <Shield className="w-4 h-4" />
                        <span>Secure Verification Process</span>
                    </div>

                    <Link
                        href="/"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#2D2654] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D2654] transition-all"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
