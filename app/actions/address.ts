'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateAddress(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    // Check if acting as admin (optional, for future admin use)
    // For now, users update their own address
    // We could add logic here to allow admins to update other users' addresses
    // passing a userId in formData, but let's stick to the simple flow first.

    // If an admin is updating another user, they should pass 'targetUserId'
    // Otherwise it defaults to the current user
    let targetUserId = user.id

    if (formData.has('targetUserId')) {
        // Verify admin status before allowing targetUserId usage
        const { data: adminProfile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (adminProfile?.role === 'admin') {
            targetUserId = formData.get('targetUserId') as string
        } else {
            return { error: 'Unauthorized to update other users' }
        }
    }

    const addressData = {
        address_line1: formData.get('address_line1') as string,
        address_line2: formData.get('address_line2') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        postal_code: formData.get('postal_code') as string,
        country: formData.get('country') as string,
    }

    const { error } = await supabase
        .from('profiles')
        .update(addressData)
        .eq('id', targetUserId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    revalidatePath('/checkout')
    revalidatePath('/admin/users') // invalidating admin path just in case

    return { success: true }
}
