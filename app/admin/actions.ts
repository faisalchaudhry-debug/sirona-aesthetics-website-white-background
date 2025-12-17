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
    const { error } = await supabaseAdmin
        .from('profiles')
        .update({ is_approved: true, role: 'doctor' })
        .eq('id', userId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return { success: true }
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

    const { error } = await supabaseAdmin
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

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${userId}`)
    return { success: true }
}
