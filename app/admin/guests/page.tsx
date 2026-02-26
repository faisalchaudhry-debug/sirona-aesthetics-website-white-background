import { createClient } from '@/utils/supabase/server'
import GuestManagement from '@/components/admin/GuestManagement'

export const revalidate = 0

export type GuestOrder = {
    id: string
    created_at: string
    total_amount: number
    status: string
}

export type GuestSummary = {
    email: string
    name: string
    phone: string | null
    shippingLine1: string | null
    shippingLine2: string | null
    shippingCity: string | null
    shippingPostcode: string | null
    shippingCountry: string | null
    billingLine1: string | null
    billingCity: string | null
    billingPostcode: string | null
    billingCountry: string | null
    orderCount: number
    totalSpent: number
    firstOrderDate: string
    lastOrderDate: string
    orders: GuestOrder[]
}

export default async function AdminGuestsPage() {
    const supabase = await createClient()

    const { data: orders } = await supabase
        .from('orders')
        .select('id, created_at, total_amount, status, guest_name, guest_email, guest_phone, shipping_line1, shipping_line2, shipping_city, shipping_postcode, shipping_country, billing_line1, billing_line2, billing_city, billing_postcode, billing_country')
        .is('user_id', null)
        .not('guest_email', 'is', null)
        .order('created_at', { ascending: false })

    // Group orders by guest_email
    const guestMap = new Map<string, GuestSummary>()

    for (const order of orders || []) {
        const email = order.guest_email as string
        const existing = guestMap.get(email)

        const orderEntry: GuestOrder = {
            id: order.id,
            created_at: order.created_at,
            total_amount: Number(order.total_amount),
            status: order.status,
        }

        if (existing) {
            existing.orders.push(orderEntry)
            existing.orderCount += 1
            existing.totalSpent += Number(order.total_amount)
            // Keep latest name/phone/address from the most recent order (already sorted desc)
            if (!existing.name && order.guest_name) existing.name = order.guest_name
            // Update earliest order date
            if (order.created_at < existing.firstOrderDate) existing.firstOrderDate = order.created_at
        } else {
            guestMap.set(email, {
                email,
                name: order.guest_name || '',
                phone: order.guest_phone || null,
                shippingLine1: order.shipping_line1 || null,
                shippingLine2: order.shipping_line2 || null,
                shippingCity: order.shipping_city || null,
                shippingPostcode: order.shipping_postcode || null,
                shippingCountry: order.shipping_country || null,
                billingLine1: order.billing_line1 || null,
                billingCity: order.billing_city || null,
                billingPostcode: order.billing_postcode || null,
                billingCountry: order.billing_country || null,
                orderCount: 1,
                totalSpent: Number(order.total_amount),
                firstOrderDate: order.created_at,
                lastOrderDate: order.created_at,
                orders: [orderEntry],
            })
        }
    }

    const guests = Array.from(guestMap.values()).sort(
        (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
    )

    return <GuestManagement guests={guests} />
}
