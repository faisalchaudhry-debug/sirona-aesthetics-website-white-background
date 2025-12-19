'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type ContactFormData = {
    firstName: string
    lastName: string
    email: string
    phone?: string
    subject?: string
    message: string
    source: string
    country?: string
    type?: string
}

export async function submitContactForm(data: ContactFormData) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('contact_submissions')
        .insert({
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            source: data.source,
            country: data.country,
            type: data.type,
        })

    if (error) {
        console.error('Contact submission error:', error)
        return { success: false, error: 'Failed to submit form. Please try again.' }
    }

    revalidatePath('/admin/contact-submissions')
    return { success: true }
}

export async function deleteContactSubmission(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id)
    if (error) {
        console.error('Error deleting submission:', error)
        return { success: false, error: error.message }
    }
    revalidatePath('/admin/contact-submissions')
    return { success: true }
}

export async function updateContactSubmission(id: string, data: Partial<ContactFormData> & { status?: string }) {
    const supabase = await createClient()
    const { error } = await supabase.from('contact_submissions').update({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        country: data.country,
        type: data.type,
        status: data.status,
    }).eq('id', id)

    if (error) {
        console.error('Error updating submission:', error)
        return { success: false, error: error.message }
    }
    revalidatePath('/admin/contact-submissions')
    return { success: true }
}
