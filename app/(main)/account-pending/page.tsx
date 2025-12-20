import Link from 'next/link'
import { Clock, Mail, ArrowLeft, MessageCircle } from 'lucide-react'

export const metadata = {
    title: 'Account Under Review | Sirona Aesthetics',
    description: 'Your account is currently being reviewed by our team.',
}

export default function AccountPendingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-8 text-center">
                        <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                            <Clock className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            Account Under Review
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="p-8 text-center">
                        <div className="mb-8">
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                Thank you for registering with Sirona Aesthetics. Your professional account is currently being reviewed by our team.
                            </p>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 inline-flex items-start gap-3 text-left">
                                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-blue-900 font-semibold text-sm">We'll notify you via email</p>
                                    <p className="text-blue-700 text-sm">
                                        Once your account is approved, you'll receive an email confirmation and gain full access to our product catalog and exclusive pricing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Link>

                            <Link
                                href="/contact"
                                className="flex items-center justify-center w-full px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Contact Support
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-gray-400">
                            Typical review time: 1-2 business days
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
