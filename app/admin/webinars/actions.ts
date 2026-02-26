'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

async function verifyAdmin(): Promise<boolean> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    return profile?.role === 'admin'
}

export type TrainingEventFormState = {
    error: string
    success: boolean
}

export async function addTrainingEvent(
    prevState: TrainingEventFormState,
    formData: FormData
): Promise<TrainingEventFormState> {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) return { error: 'Unauthorized', success: false }

    const title = (formData.get('title') as string)?.trim()
    const event_date = formData.get('event_date') as string
    const description = (formData.get('description') as string)?.trim()

    if (!title || !event_date || !description) {
        return { error: 'All fields are required.', success: false }
    }

    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const supabase = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Append 'Z' so the datetime-local value (which has no timezone) is stored as UTC/GMT
    const { error } = await supabase
        .from('training_events')
        .insert({ title, event_date: event_date + 'Z', description })

    if (error) {
        console.error('Error adding training event:', error)
        return { error: 'Failed to add event. Please try again.', success: false }
    }

    revalidatePath('/admin/webinars')
    revalidatePath('/training')
    return { error: '', success: true }
}

export async function updateTrainingEvent(
    eventId: string,
    title: string,
    event_date: string,
    description: string
): Promise<{ error?: string; success?: boolean }> {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) return { error: 'Unauthorized' }

    if (!title?.trim() || !event_date || !description?.trim()) {
        return { error: 'All fields are required.' }
    }

    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const supabase = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { error } = await supabase
        .from('training_events')
        .update({ title: title.trim(), event_date, description: description.trim() })
        .eq('id', eventId)

    if (error) {
        console.error('Error updating training event:', error)
        return { error: 'Failed to update event. Please try again.' }
    }

    revalidatePath('/admin/webinars')
    revalidatePath('/training')
    return { success: true }
}

export async function updateWebinarRegistration(
    id: string,
    full_name: string,
    email: string,
    phone: string,
    clinic_name: string,
    message: string
): Promise<{ error?: string; success?: boolean }> {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) return { error: 'Unauthorized' }

    if (!full_name?.trim() || !email?.trim()) {
        return { error: 'Name and email are required.' }
    }

    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const supabase = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { error } = await supabase
        .from('webinar_registrations')
        .update({
            full_name: full_name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || null,
            clinic_name: clinic_name?.trim() || null,
            message: message?.trim() || null,
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating webinar registration:', error)
        return { error: 'Failed to update registration.' }
    }

    revalidatePath('/admin/webinars')
    return { success: true }
}

export async function deleteWebinarRegistration(id: string): Promise<{ error?: string; success?: boolean }> {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) return { error: 'Unauthorized' }

    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const supabase = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { error } = await supabase
        .from('webinar_registrations')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting webinar registration:', error)
        return { error: 'Failed to delete registration.' }
    }

    revalidatePath('/admin/webinars')
    return { success: true }
}

export async function deleteTrainingEvent(eventId: string) {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) return { error: 'Unauthorized' }

    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const supabase = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { error } = await supabase
        .from('training_events')
        .delete()
        .eq('id', eventId)

    if (error) {
        console.error('Error deleting training event:', error)
        return { error: 'Failed to delete event.' }
    }

    revalidatePath('/admin/webinars')
    revalidatePath('/training')
    return { success: true }
}
