'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function registerWebinar(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const clinic = formData.get('clinic') as string
    const message = formData.get('message') as string

    if (!name || !email) {
        return { error: 'Name and Email are required.' }
    }

    const { error } = await supabase
        .from('webinar_registrations')
        .insert({
            full_name: name,
            email: email,
            clinic_name: clinic,
            message: message,
        })

    if (error) {
        console.error('Webinar registration error:', error)
        return { error: 'Failed to register. Please try again.' }
    }

    revalidatePath('/admin/webinars')
    return { success: true, message: 'Thank you! You have been added to the waitlist.' }
}
