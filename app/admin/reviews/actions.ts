'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function approveReview(reviewId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
        .from('product_reviews')
        .update({ is_approved: true })
        .eq('id', reviewId)

    if (error) {
        return { error: 'Failed to approve review' }
    }

    revalidatePath('/admin/reviews')
    revalidatePath('/products') // Revalidate all products or specific one if we knew it
    return { success: 'Review approved' }
}

export async function deleteReview(reviewId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
        .from('product_reviews')
        .delete()
        .eq('id', reviewId)

    if (error) {
        return { error: 'Failed to delete review' }
    }

    revalidatePath('/admin/reviews')
    revalidatePath('/products')
    return { success: 'Review deleted' }
}
