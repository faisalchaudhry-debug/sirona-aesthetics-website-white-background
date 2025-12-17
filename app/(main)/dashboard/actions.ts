'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const fullName = formData.get('fullName') as string
    const companyName = formData.get('companyName') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string

    // 1. Update Profile Data
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
            company_name: companyName,
            phone: phone,
        })
        .eq('id', user.id)

    if (profileError) {
        return { error: profileError.message }
    }

    // 2. Handle Email Change if different
    if (email && email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({ email: email })

        if (authError) {
            return { error: 'Profile updated, but email update failed: ' + authError.message }
        }

        // If email update initiated successfully
        return redirect('/dashboard?message=Profile updated. Please check your email inbox to confirm your new email address.')
    }



    revalidatePath('/dashboard')
    return redirect('/dashboard')
}
