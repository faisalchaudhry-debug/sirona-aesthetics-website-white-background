'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

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

    // Get product ID before deleting
    const { data: media } = await supabase
        .from('product_media')
        .select('product_id')
        .eq('id', mediaId)
        .single()

    const { error } = await supabase
        .from('product_media')
        .delete()
        .eq('id', mediaId)

    if (error) return { error: error.message }

    if (media?.product_id) {
        await syncMainImage(media.product_id)
    }

    return { success: true }
}

export async function deleteProduct(productId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Soft Delete
    const { error } = await supabase
        .from('products')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', productId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/products')
    return { success: true }
}

export async function restoreProduct(productId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Restore
    const { error } = await supabase
        .from('products')
        .update({ deleted_at: null })
        .eq('id', productId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/products')
    return { success: true }
}

export async function permanentDeleteProduct(productId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Hard Delete
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

    await syncMainImage(productId)
}

async function syncMainImage(productId: string) {
    const supabase = await createClient()

    // Get the first gallery image
    const { data: firstImage } = await supabase
        .from('product_media')
        .select('url')
        .eq('product_id', productId)
        .eq('media_type', 'gallery')
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

    // Update product image_url
    await supabase
        .from('products')
        .update({ image_url: firstImage?.url || null })
        .eq('id', productId)
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
        is_active: formData.get('is_active') === 'true'
    }

    const { data: product, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single()

    if (error) return { error: error.message }

    await handleMediaUploads(product.id, formData)

    revalidatePath('/admin/products')
    return { success: true, id: product.id }
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
        category: formData.get('category') as string,
        updated_at: new Date().toISOString(),
        is_active: formData.get('is_active') === 'true'
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
    return { success: true }
}
