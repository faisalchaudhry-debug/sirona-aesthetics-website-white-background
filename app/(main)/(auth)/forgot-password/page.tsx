import { forgotPassword } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ForgotPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>
}) {
    const { message } = await searchParams

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="hidden md:block relative bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-black/60 z-10" />
                <div className="absolute inset-0 z-0">
                    {/* Placeholder for an auth image if available, using strict abstract pattern for now */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-50" />
                </div>
                <div className="relative z-20 h-full flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-6 tracking-wide">Account Recovery</h2>
                    <p className="text-lg text-gray-200 leading-relaxed max-w-md">
                        Don't worry, we'll help you get back into your account securely.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 md:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                        <p className="mt-2 text-gray-600">Enter your email to receive a reset link</p>
                    </div>

                    <form className="space-y-6" action={forgotPassword}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <button className="w-full btn-primary py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all uppercase tracking-wider">
                            Send Reset Link
                        </button>

                        {message && (
                            <div className="p-4 rounded-lg bg-blue-50 text-blue-700 text-sm text-center">
                                {message}
                            </div>
                        )}

                        <div className="text-center">
                            <Link href="/login" className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
