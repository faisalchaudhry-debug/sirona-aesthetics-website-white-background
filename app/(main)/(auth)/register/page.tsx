import Link from 'next/link'
import { signup } from '../actions'

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>
}) {
    const { message } = await searchParams
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-gray-100">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-bold text-sirona-navy tracking-tight">
                        Apply for a Doctor Account
                    </h2>
                    <p className="mt-3 text-sm text-gray-500 max-w-sm mx-auto">
                        Join our network of certified professionals.
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={signup}>
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sirona-navy/20 focus:border-sirona-navy transition-all text-sm"
                                    placeholder="Dr. Start"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sirona-navy/20 focus:border-sirona-navy transition-all text-sm"
                                    placeholder="+44 7700 900000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                Company / Clinic Name
                            </label>
                            <input
                                id="companyName"
                                name="companyName"
                                type="text"
                                required
                                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sirona-navy/20 focus:border-sirona-navy transition-all text-sm"
                                placeholder="Your Clinic Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sirona-navy/20 focus:border-sirona-navy transition-all text-sm"
                                placeholder="name@clinic.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sirona-navy/20 focus:border-sirona-navy transition-all text-sm"
                                placeholder="Create a strong password"
                            />
                        </div>
                    </div>

                    {message && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center font-medium border border-red-100">
                            {message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#1A1433] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1433] shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            Submit Application
                        </button>
                    </div>

                    <div className="text-center pt-2 space-y-4">
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">
                            * Your account will be reviewed by our team. You will be notified via email upon approval.
                        </p>
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-sirona-navy hover:text-accent transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
