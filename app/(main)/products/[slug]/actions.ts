'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitReview(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to leave a review.' }
    }

    const productId = formData.get('productId') as string
    const rating = parseInt(formData.get('rating') as string)
    const comment = formData.get('comment') as string
    const slug = formData.get('slug') as string

    if (!rating || rating < 1 || rating > 5) {
        return { error: 'Please select a rating.' }
    }

    if (!comment || comment.trim().length < 10) {
        return { error: 'Review must be at least 10 characters long.' }
    }

    const { error } = await supabase
        .from('product_reviews')
        .insert({
            product_id: productId,
            user_id: user.id,
            rating,
            comment
        })

    if (error) {
        console.error('Review submission error:', error)
        return { error: 'Failed to submit review. Please try again.' }
    }

    revalidatePath(`/products/${slug}`)
    return { success: 'Review submitted successfully! It will be visible after approval.' }
}
