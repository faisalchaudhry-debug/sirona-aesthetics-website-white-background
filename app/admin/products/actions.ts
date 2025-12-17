'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const ADMIN_BUCKET = 'product-images'

async function uploadImage(file: File) {
    const supabase = await createClient()
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const { error } = await supabase.storage
        .from(ADMIN_BUCKET)
        .upload(fileName, file)

    if (error) {
        console.error('Upload Error:', error)
        return null
    }

    const { data: { publicUrl } } = supabase.storage
        .from(ADMIN_BUCKET)
        .getPublicUrl(fileName)

    return publicUrl
}

export async function deleteProductMedia(mediaId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Check if media exists first to get URL (optional cleanup of storage)
    // For now just deleting db record

    const { error } = await supabase
        .from('product_media')
        .delete()
        .eq('id', mediaId)

    if (error) return { error: error.message }
    return { success: true }
}

export async function deleteProduct(productId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/products')
    return { success: true }
}

async function handleMediaUploads(productId: string, formData: FormData) {
    const supabase = await createClient()

    // Handle Gallery Images
    const galleryFiles = formData.getAll('gallery_files') as File[]
    for (const file of galleryFiles) {
        if (file.size > 0) {
            const url = await uploadImage(file)
            if (url) {
                await supabase.from('product_media').insert({
                    product_id: productId,
                    url,
                    media_type: 'gallery'
                })
            }
        }
    }

    // Handle Before/After Images
    const baFiles = formData.getAll('before_after_files') as File[]
    for (const file of baFiles) {
        if (file.size > 0) {
            const url = await uploadImage(file)
            if (url) {
                await supabase.from('product_media').insert({
                    product_id: productId,
                    url,
                    media_type: 'before_after'
                })
            }
        }
    }
}

export async function createProduct(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const productData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        short_description: formData.get('short_description') as string,
        long_description: formData.get('long_description') as string,
        price: parseFloat(formData.get('price') as string),
        sale_price: formData.get('sale_price') ? parseFloat(formData.get('sale_price') as string) : null,
        stock: parseInt(formData.get('stock') as string),
        category: formData.get('category') as string,
        is_active: true // default active for new simplified form
    }

    const { data: product, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single()

    if (error) return { error: error.message }

    await handleMediaUploads(product.id, formData)

    revalidatePath('/admin/products')
    redirect('/admin/products')
}

export async function updateProduct(formData: FormData) {
    const supabase = await createClient()
    const productId = formData.get('productId') as string

    const productData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        short_description: formData.get('short_description') as string,
        long_description: formData.get('long_description') as string,
        price: parseFloat(formData.get('price') as string),
        sale_price: formData.get('sale_price') ? parseFloat(formData.get('sale_price') as string) : null,
        stock: parseInt(formData.get('stock') as string),
        category: formData.get('category') as string
    }

    const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', productId)

    if (error) return { error: error.message }

    await handleMediaUploads(productId, formData)

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${productId}`)
    revalidatePath(`/products`) // Update public pages too
    redirect('/admin/products')
}
