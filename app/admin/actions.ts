'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function approveUser(userId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!adminProfile || adminProfile.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    // Initialize Admin Client with Service Role Key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
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

    // Update user
    const { data: updatedProfile, error } = await supabaseAdmin
        .from('profiles')
        .update({ is_approved: true, role: 'doctor' })
        .eq('id', userId)
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    // Send to CRM Webhook
    await sendToCrmWebhook(updatedProfile)

    revalidatePath('/admin/users')
    return { success: true }
}

async function sendToCrmWebhook(profile: any) {
    try {
        const webhookUrl = 'https://services.leadconnectorhq.com/hooks/OdylxFk47CSXq3mt6RoF/webhook-trigger/ce9150c8-5999-450b-b572-89960cb392fe'

        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        })
    } catch (error) {
        console.error('Failed to send to CRM webhook:', error)
        // We do not fail the request if webhook fails, just log it
    }
}

export async function deleteUser(userId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!adminProfile || adminProfile.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    // Initialize Admin Client with Service Role Key
    // Note: This requires SUPABASE_SERVICE_ROLE_KEY in .env.local
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
        console.error('Missing SUPABASE_SERVICE_ROLE_KEY')
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

    // Delete user from Supabase Auth (admin only feature)
    // Deleting from auth.users cascades to profiles automatically
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
        console.error('Failed to delete auth user:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return { success: true }
}

export async function updateUser(formData: FormData) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!adminProfile || adminProfile.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    const userId = formData.get('userId') as string
    const fullName = formData.get('fullName') as string
    const companyName = formData.get('companyName') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as string
    const isApproved = formData.get('isApproved') === 'on'

    const address_line1 = formData.get('address_line1') as string
    const address_line2 = formData.get('address_line2') as string
    const city = formData.get('city') as string
    const state = formData.get('state') as string
    const postal_code = formData.get('postal_code') as string
    const country = formData.get('country') as string

    // Initialize Admin Client with Service Role Key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
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

    const { data: updatedProfile, error } = await supabaseAdmin
        .from('profiles')
        .update({
            full_name: fullName,
            company_name: companyName,
            phone: phone,
            role: role,
            is_approved: isApproved,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country
        })
        .eq('id', userId)
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    // Trigger webhook ONLY if user is approved
    if (updatedProfile.is_approved) {
        await sendToCrmWebhook(updatedProfile)
    }

    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${userId}`)
    return { success: true }
}
