import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

if (!process.env.STRIPE_SECRET_KEY) throw new Error('Missing STRIPE_SECRET_KEY environment variable')
if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
        throw new Error('Missing Supabase environment variables')
    }

    return createClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}

// Tell Next.js not to parse the body — Stripe needs the raw bytes to verify the signature
export const config = {
    api: { bodyParser: false },
}

export async function POST(request: Request) {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')

    if (!sig) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        console.error('Webhook signature verification failed:', message)
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session

            // Only process if payment was actually collected
            if (session.payment_status !== 'paid') {
                console.log(`Session ${session.id} not paid yet, skipping.`)
                break
            }

            const orderId = session.metadata?.orderId

            if (!orderId) {
                console.error('Webhook: no orderId in session metadata', session.id)
                // Still return 200 so Stripe doesn't keep retrying
                break
            }

            try {
                const supabase = getAdminClient()

                const { error } = await supabase
                    .from('orders')
                    .update({
                        status: 'paid',
                        stripe_payment_id: (session.payment_intent as string) || session.id,
                    })
                    .eq('id', orderId)

                if (error) {
                    console.error(`Webhook: failed to update order ${orderId}:`, error)
                    // Return 500 so Stripe retries this event
                    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
                }

                console.log(`Webhook: order ${orderId} marked as paid ✅`)
            } catch (err) {
                console.error('Webhook: unexpected error updating order:', err)
                return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
            }

            break
        }

        case 'checkout.session.expired': {
            // Optional: mark order as cancelled if session expired
            const session = event.data.object as Stripe.Checkout.Session
            const orderId = session.metadata?.orderId

            if (orderId) {
                try {
                    const supabase = getAdminClient()
                    await supabase
                        .from('orders')
                        .update({ status: 'cancelled' })
                        .eq('id', orderId)
                        .eq('status', 'pending') // Only cancel if still pending

                    console.log(`Webhook: order ${orderId} cancelled due to expired session`)
                } catch (err) {
                    console.error('Webhook: failed to cancel expired order:', err)
                }
            }
            break
        }

        default:
            // Unhandled event type — just acknowledge it
            console.log(`Webhook: unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
