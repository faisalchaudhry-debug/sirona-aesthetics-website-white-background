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
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        // 1. Calculate Total Amount
        const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

        // 2. Create Order in Pending Status
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user.id,
                status: 'pending',
                total_amount: totalAmount,
            })
            .select()
            .single()

        if (orderError || !order) {
            console.error('Error creating order:', orderError)
            return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
        }

        // 3. Create Order Items
        const orderItemsData = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.id, // Assuming item has id
            quantity: item.quantity,
            price_at_purchase: item.price
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItemsData)

        if (itemsError) {
            console.error('Error creating order items:', itemsError)
            return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
        }

        // 4. Create Stripe Session with Order ID
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cancel`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
                orderId: order.id, // Link Stripe Session to Order
                address: profile ? JSON.stringify({
                    line1: profile.address_line1,
                    line2: profile.address_line2,
                    city: profile.city,
                    state: profile.state,
                    postal_code: profile.postal_code,
                    country: profile.country
                }) : '',
            },
        })

        // Update order with Stripe Session ID (optional, but good for tracking)
        await supabase
            .from('orders')
            .update({ stripe_payment_id: session.id })
            .eq('id', order.id)

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (err: any) {
        console.error('Stripe error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
