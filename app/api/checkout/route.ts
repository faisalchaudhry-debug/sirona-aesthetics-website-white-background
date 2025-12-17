import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await request.json()

    if (!items || items.length === 0) {
        return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const lineItems = items.map((item: any) => ({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: item.name,
                images: item.image_url ? [item.image_url] : [],
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents/pence
        },
        quantity: item.quantity,
    }))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cancel`,
            metadata: {
                userId: user.id,
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (err: any) {
        console.error('Stripe error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
