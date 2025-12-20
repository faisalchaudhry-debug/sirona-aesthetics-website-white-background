import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    // Debug logging
    console.log('=== Auth Callback Started ===')
    console.log('Full URL:', request.url)
    console.log('Code present:', !!code)
    console.log('Error present:', !!error)
    console.log('Next param:', next)

    // Handle error responses from Supabase
    if (error) {
        console.error('Auth callback error:', error, errorDescription)
        // If this was a password reset attempt, redirect to forgot-password with error
        if (next === '/reset-password') {
            return NextResponse.redirect(`${origin}/forgot-password?message=${encodeURIComponent(errorDescription || 'Authentication error')}`)
        }
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    if (code) {
        console.log('Attempting to exchange code for session...')
        const supabase = await createClient()
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        console.log('Exchange result:')
        console.log('- Session received:', !!data?.session)
        console.log('- User received:', !!data?.user)
        console.log('- Error:', exchangeError?.message || 'none')

        if (!exchangeError && data?.session) {
            console.log('Session exchange successful, redirecting to:', next)
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        } else {
            console.error('Code exchange error:', exchangeError?.message)
            // If this was a password reset attempt, redirect with error message
            if (next === '/reset-password') {
                const errMsg = exchangeError?.message || 'Code exchange failed'
                return NextResponse.redirect(`${origin}/reset-password?message=${encodeURIComponent(errMsg)}`)
            }
        }
    } else {
        console.log('No code parameter found in URL')
    }

    // For password reset flow, redirect to reset-password page 
    // The client component will handle session verification
    if (next === '/reset-password') {
        console.log('Redirecting to reset-password (no code/session)')
        return NextResponse.redirect(`${origin}/reset-password`)
    }

    // return the user to an error page with instructions
    console.log('Redirecting to auth-code-error')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

