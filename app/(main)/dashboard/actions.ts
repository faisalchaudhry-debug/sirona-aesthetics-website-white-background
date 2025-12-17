'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const fullName = formData.get('fullName') as string
    const companyName = formData.get('companyName') as string
    const phone = formData.get('phone') as string

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
            company_name: companyName,
            phone: phone,
        })
        .eq('id', user.id)

    if (error) {
        console.error('Profile update error:', error)
        redirect('/dashboard/edit?error=update-failed')
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}
