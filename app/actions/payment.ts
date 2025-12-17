'use server'

import { createClient } from '@/utils/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function verifyPayment(sessionId: string) {
    if (!sessionId) return { error: 'Missing session ID' }

    try {
        // 1. Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (!session) {
            return { error: 'Session not found' }
        }

        // 2. Check payment status
        if (session.payment_status === 'paid') {
            const orderId = session.metadata?.orderId

            if (!orderId) {
                return { error: 'No order ID found in session metadata' }
            }

            // 3. Update Order Status in Supabase
            // Use Service Role to ensure we can update the status regardless of user context (RLS)
            // This is critical because users typically don't have permission to UPDATE orders, only INSERT.

            const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
            if (!serviceRoleKey) {
                console.error('Missing SUPABASE_SERVICE_ROLE_KEY')
                // Fallback to normal client if key is missing (might work for admins, but likely fail for users)
                // But better to return specific error so we know config is wrong.
                return { error: 'Server configuration error: Missing Service Role Key' }
            }

            const { createClient: createAdminClient } = await import('@supabase/supabase-js')
            const supabaseAdmin = createAdminClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                serviceRoleKey,
                {
                    auth: {
                        autoRefreshToken: false,
                        persistSession: false
                    }
                }
            )

            // Update the order
            const { error: updateError } = await supabaseAdmin
                .from('orders')
                .update({
                    status: 'paid',
                    stripe_payment_id: session.payment_intent as string || session.id
                })
                .eq('id', orderId)
            // We trust the Stripe metadata link

            if (updateError) {
                console.error('Error updating order:', updateError)
                return { error: 'Failed to update order status: ' + updateError.message }
            }

            return { success: true, orderId }
        } else {
            return { error: 'Payment not completed', status: session.payment_status }
        }

    } catch (error: any) {
        console.error('Verify payment error:', error)
        return { error: error.message }
    }
}
