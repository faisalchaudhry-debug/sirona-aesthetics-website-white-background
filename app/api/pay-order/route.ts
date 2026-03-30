import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

if (!process.env.STRIPE_SECRET_KEY) throw new Error('Missing STRIPE_SECRET_KEY environment variable')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request: Request) {
    const supabase = await createClient()
    const { orderId } = await request.json()

    if (!orderId) {
        return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // 1. Fetch Order Details
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    products (
                        name,
                        image_url
                    )
                )
            `)
            .eq('id', orderId)
            .eq('user_id', user.id)
            .single()

        if (orderError || !order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        if (order.status === 'paid') {
            return NextResponse.json({ error: 'Order is already paid' }, { status: 400 })
        }

        // 2. Prepare Line Items for Stripe
        const lineItems = order.order_items.map((item: any) => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.products.name,
                    images: item.products.image_url ? [item.products.image_url] : [],
                },
                unit_amount: Math.round(item.price_at_purchase * 100),
            },
            quantity: item.quantity,
        }))

        // Add Shipping (Fixed for now, should match original order logic if possible)
        // Ideally the order.total_amount includes everything.
        // We can verify total implies shipping if needed, or explicitly add it.
        // In previous route, shipping was added explicitly.
        // Let's assume standard £7.50 shipping logic applies or calculate based on order total difference?
        // Simpler: Just add the shipping item fixed for now as it seems standard.
        // OR better: Check if total matches sum of items. If difference is ~7.50 + VAT, add it.
        // Actually, let's just use the order items as truth. If shipping was a line item in DB it would be better.
        // But in create-checkout it wasn't saved as a line item in 'order_items' table (wait, let's check).
        // In create-checkout: order_items inserted. shipping NOT order_items.
        // So we need to re-add shipping to Stripe session.

        const subtotal = order.order_items.reduce((sum: number, item: any) => sum + (item.price_at_purchase * item.quantity), 0)
        const vatAmount = subtotal * 0.20
        const shippingCost = 7.50 // Standard

        lineItems.push({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: 'VAT (20%)',
                },
                unit_amount: Math.round(vatAmount * 100),
            },
            quantity: 1,
        })

        lineItems.push({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: 'Postage and Packing',
                },
                unit_amount: Math.round(shippingCost * 100),
            },
            quantity: 1,
        })

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()


        // 3. Create Stripe Session
        const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/account/orders/${order.id}`, // Return to order page on cancel
            customer_email: user.email,
            metadata: {
                userId: user.id,
                orderId: order.id,
                is_payment_for_existing: 'true' // Flag to know this is paying for existing
            },
        })

        // 4. Update order with new session ID
        await supabase
            .from('orders')
            .update({ stripe_payment_id: session.id })
            .eq('id', order.id)

        return NextResponse.json({ url: session.url })

    } catch (err: any) {
        console.error('Payment intent error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
