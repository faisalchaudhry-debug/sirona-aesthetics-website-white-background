import { updatePassword } from '../actions'
import { Lock } from 'lucide-react'
import PasswordInput from '@/components/PasswordInput'

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>
}) {
    const { message } = await searchParams

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please enter your new password below.
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={updatePassword}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <PasswordInput
                                name="password"
                                required
                                minLength={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-10"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <PasswordInput
                                name="confirmPassword"
                                required
                                minLength={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-10"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>


                    {message && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {message}
                        </div>
                    )}

                    <button className="w-full btn-primary py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    )
}
