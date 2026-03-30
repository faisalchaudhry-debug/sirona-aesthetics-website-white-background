import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

if (!process.env.STRIPE_SECRET_KEY) throw new Error('Missing STRIPE_SECRET_KEY environment variable')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Webhook URL for Jackie's GHL automation — receives injectable order review notifications
const INJECTABLE_REVIEW_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/OdylxFk47CSXq3mt6RoF/webhook-trigger/anPUVZEblloi9JfblJgI'

async function fireInjectableReviewWebhook(order: any, profile: any, injectableItems: any[]) {
    const subtotal = injectableItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const allSubtotal = order.total_amount

    const payload = {
        event: 'injectable_order_pending_review',
        order_id: order.id,
        submitted_at: new Date().toISOString(),
        customer: {
            name: profile?.full_name || 'Unknown',
            email: profile?.email || 'Unknown',
            phone: profile?.phone || 'N/A',
            company: profile?.company_name || 'N/A',
            designation: profile?.designation || 'N/A',
            role: profile?.role || 'user',
            is_approved: profile?.is_approved || false,
            can_buy_injectables: false,
        },
        injectable_items: injectableItems.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            line_total: item.price * item.quantity,
        })),
        order_summary: {
            subtotal: allSubtotal,
            note: 'Includes VAT (20%) and shipping (£7.50)',
        },
        admin_order_link: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/orders`,
    }

    try {
        await fetch(INJECTABLE_REVIEW_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
    } catch (err) {
        // Non-blocking — webhook failure should not break the order
        console.error('Failed to fire injectable review webhook:', err)
    }
}

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

    try {
        // Fetch full user profile including injectable permission
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        // Fetch product details from DB to check is_injectable flag
        const productIds = items.map((item: any) => item.id)
        const { data: dbProducts } = await supabase
            .from('products')
            .select('id, is_injectable')
            .in('id', productIds)

        // Build a lookup map: productId → is_injectable
        const injectableMap: Record<string, boolean> = {}
        if (dbProducts) {
            for (const p of dbProducts) {
                injectableMap[p.id] = p.is_injectable || false
            }
        }

        // Identify which cart items are injectable
        const injectableItems = items.filter((item: any) => injectableMap[item.id])
        const hasInjectables = injectableItems.length > 0

        // Calculate totals
        const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
        const vatAmount = subtotal * 0.20
        const shippingCost = 7.50
        const totalAmount = subtotal + vatAmount + shippingCost

        // --- INJECTABLE DIVERSION ---
        // If cart has any injectable product AND user is NOT injectable-verified,
        // save the order as 'injectable_review' and notify Jackie. No Stripe session.
        if (hasInjectables && !profile?.can_buy_injectables) {
            // Create the order in DB with injectable_review status
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    status: 'injectable_review',
                    total_amount: totalAmount,
                })
                .select()
                .single()

            if (orderError || !order) {
                console.error('Error creating injectable review order:', orderError)
                return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
            }

            // Save order items
            const orderItemsData = items.map((item: any) => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_purchase: item.price,
            }))

            await supabase.from('order_items').insert(orderItemsData)

            // Fire webhook to Jackie's GHL automation
            await fireInjectableReviewWebhook(order, profile, injectableItems)

            // Return review signal — CheckoutForm will redirect to confirmation page
            return NextResponse.json({ requiresReview: true, orderId: order.id })
        }

        // --- NORMAL STRIPE CHECKOUT ---
        // User is either injectable-verified or has no injectable items in cart

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.name,
                    images: item.image_url ? [item.image_url] : [],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }))

        // Create Order in Pending Status
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

        // Create Order Items
        const orderItemsData = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price_at_purchase: item.price,
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItemsData)

        if (itemsError) {
            console.error('Error creating order items:', itemsError)
            return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
        }

        // Add VAT and Shipping to Stripe line items
        const finalLineItems = [
            ...lineItems,
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

        // Create Stripe Session
        const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: finalLineItems,
            mode: 'payment',
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cancel`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
                orderId: order.id,
                address: profile ? JSON.stringify({
                    line1: profile.address_line1,
                    line2: profile.address_line2,
                    city: profile.city,
                    state: profile.state,
                    postal_code: profile.postal_code,
                    country: profile.country,
                }) : '',
            },
        })

        // Store Stripe session ID on the order
        await supabase
            .from('orders')
            .update({ stripe_payment_id: session.id })
            .eq('id', order.id)

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (err: any) {
        console.error('Checkout error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
