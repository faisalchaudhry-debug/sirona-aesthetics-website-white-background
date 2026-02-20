'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function toSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

export async function createCategory(formData: FormData) {
    const name = (formData.get('name') as string)?.trim()
    if (!name) return { error: 'Name is required' }

    const slug = toSlug(name)
    if (!slug) return { error: 'Invalid category name' }

    const supabase = await createClient()

    const { error } = await supabase
        .from('categories')
        .insert({ name, slug })

    if (error) {
        if (error.code === '23505') return { error: 'A category with that name already exists' }
        return { error: error.message }
    }

    revalidatePath('/admin/categories')
    revalidatePath('/products')
    return { success: true }
}

export async function updateCategoryName(formData: FormData) {
    const id   = (formData.get('id')   as string)?.trim()
    const name = (formData.get('name') as string)?.trim()

    if (!id || !name) return { error: 'Missing fields' }

    const supabase = await createClient()

    const { error } = await supabase
        .from('categories')
        .update({ name })
        .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/categories')
    revalidatePath('/products')
    return { success: true }
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()

    // Check how many products use this category's slug
    const { data: category } = await supabase
        .from('categories')
        .select('slug')
        .eq('id', id)
        .single()

    if (!category) return { error: 'Category not found' }

    const { count } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true })
        .eq('category', category.slug)

    if (count && count > 0) {
        return {
            error: `Cannot delete — ${count} product${count === 1 ? '' : 's'} still use this category. Reassign them first.`,
        }
    }

    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/categories')
    revalidatePath('/products')
    return { success: true }
}
