'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Lock, Loader2, CheckCircle } from 'lucide-react'
import PasswordInput from '@/components/PasswordInput'

function ResetPasswordContent() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSessionReady, setIsSessionReady] = useState(false)
    const [checkingSession, setCheckingSession] = useState(true)

    const router = useRouter()
    const searchParams = useSearchParams()
    const message = searchParams.get('message')
    const token = searchParams.get('token')
    const type = searchParams.get('type')

    useEffect(() => {
        const supabase = createClient()

        const verifyAndEstablishSession = async () => {
            console.log('=== Reset Password Page Loaded ===')
            console.log('Token present:', !!token)
            console.log('Type:', type)

            // If we have a token and type, verify it
            if (token && type === 'recovery') {
                console.log('Verifying recovery token...')

                const { data, error: verifyError } = await supabase.auth.verifyOtp({
                    token_hash: token,
                    type: 'recovery',
                })

                console.log('Verify result:', {
                    session: !!data?.session,
                    user: !!data?.user,
                    error: verifyError?.message
                })

                if (verifyError) {
                    console.error('Token verification failed:', verifyError.message)
                    setError(verifyError.message)
                    setCheckingSession(false)
                    return
                }

                if (data?.session) {
                    console.log('Session established successfully!')
                    setIsSessionReady(true)
                    setCheckingSession(false)
                    return
                }
            }

            // Check if there's already a valid session (from auth callback flow)
            const { data: { session } } = await supabase.auth.getSession()
            console.log('Existing session check:', !!session)

            if (session) {
                setIsSessionReady(true)
            }

            setCheckingSession(false)
        }

        // Listen for auth state changes as backup
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth event:', event, 'Session:', !!session)

                if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
                    if (session) {
                        setIsSessionReady(true)
                        setCheckingSession(false)
                    }
                }
            }
        )

        verifyAndEstablishSession()

        return () => {
            subscription.unsubscribe()
        }
    }, [token, type])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!password || !confirmPassword) {
            setError('Password and Confirm Password are required')
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        const supabase = createClient()

        const { error: updateError } = await supabase.auth.updateUser({
            password: password,
        })

        if (updateError) {
            console.error('Password update error:', updateError.message)
            setError(updateError.message)
            setLoading(false)
            return
        }

        setSuccess(true)
        setLoading(false)

        // Redirect to dashboard after successful password update
        setTimeout(() => {
            router.push('/dashboard')
        }, 2000)
    }

    if (checkingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Verifying your reset link...</p>
                </div>
            </div>
        )
    }

    if (!isSessionReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Session Expired</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {error || 'Your password reset link has expired or is invalid.'}
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            Please request a new reset link.
                        </p>
                        <button
                            onClick={() => router.push('/forgot-password')}
                            className="mt-6 w-full btn-primary py-3 rounded-lg font-bold text-lg"
                        >
                            Request New Link
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Password Updated!</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Your password has been successfully updated.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            Redirecting you to the dashboard...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

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

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <PasswordInput
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-10"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>


                    {(error || message) && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error || message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Updating...
                            </>
                        ) : (
                            'Update Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    )
}
