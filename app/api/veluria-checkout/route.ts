import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

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

export async function POST(request: Request) {
    const { items, guestName, guestEmail } = await request.json()

    if (!items || items.length === 0) {
        return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    if (!guestName?.trim() || !guestEmail?.trim()) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    try {
        const supabase = getAdminClient()

        const subtotal = items.reduce(
            (sum: number, item: { price: number; quantity: number }) =>
                sum + item.price * item.quantity,
            0
        )
        const vatAmount = subtotal * 0.20
        const shippingCost = 7.50
        const totalAmount = subtotal + vatAmount + shippingCost

        // Create order — user_id is null for guest orders
        // Requires migration: ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: null,
                guest_name: guestName.trim(),
                guest_email: guestEmail.trim().toLowerCase(),
                status: 'pending',
                total_amount: totalAmount,
            })
            .select()
            .single()

        if (orderError || !order) {
            console.error('Veluria: error creating guest order:', orderError)
            return NextResponse.json(
                { error: 'Failed to create order. Please try again.' },
                { status: 500 }
            )
        }

        // Create order items
        const orderItemsData = items.map((item: {
            id: string
            quantity: number
            price: number
        }) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price_at_purchase: item.price,
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItemsData)

        if (itemsError) {
            console.error('Veluria: error creating order items:', itemsError)
            return NextResponse.json(
                { error: 'Failed to save order items. Please try again.' },
                { status: 500 }
            )
        }

        // Build Stripe line items
        const lineItems = [
            ...items.map((item: { name: string; image_url: string; price: number; quantity: number }) => ({
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: item.name,
                        images: item.image_url ? [item.image_url] : [],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            {
                price_data: {
                    currency: 'gbp',
                    product_data: { name: 'VAT (20%)' },
                    unit_amount: Math.round(vatAmount * 100),
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: 'gbp',
                    product_data: { name: 'Postage and Packing' },
                    unit_amount: Math.round(shippingCost * 100),
                },
                quantity: 1,
            },
        ]

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${baseUrl}/veluria/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/veluria/checkout`,
            customer_email: guestEmail.trim().toLowerCase(),
            metadata: {
                orderId: order.id,
                guestName: guestName.trim(),
                guestEmail: guestEmail.trim().toLowerCase(),
                source: 'veluria',
            },
        })

        // Link Stripe session to order
        await supabase
            .from('orders')
            .update({ stripe_payment_id: session.id })
            .eq('id', order.id)

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        console.error('Veluria checkout error:', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
