'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Helper to upload image if a file is provided
async function uploadImage(file: File, bucket: string = 'blog-images') {
    const supabase = await createClient()

    // Ensure bucket exists (or handle failure gracefully if not created yet)
    // Note: User might need to create 'blog-images' bucket in Supabase.
    // For now we assume typical setup or fallback to failed upload.

    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file)

    if (error) {
        console.error('Upload Error:', error)
        return null
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

    return publicUrl
}

export async function deleteBlog(blogId: string) {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!adminProfile || adminProfile.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/blogs')
    return { success: true }
}

export async function createBlog(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Upload Cover Image if provided
    const imageFile = formData.get('imageFile') as File
    let cover_image = formData.get('cover_image_url') as string // Allow manual URL too

    if (imageFile && imageFile.size > 0) {
        // Try uploading to 'blog-images' bucket, fall back to 'product-images' if needed or just error listing
        // For simplicity, let's try 'product-images' since we know it exists, or a shared 'public' one.
        // Let's stick to 'product-images' for now to ensure it works without bucket creation steps, or just 'media'.
        // Actually, let's use 'product-images' as a safe existing bucket, or allow exact bucket config.
        const url = await uploadImage(imageFile, 'product-images')
        if (url) cover_image = url
    }

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const author_name = formData.get('author_name') as string
    const author_role = formData.get('author_role') as string
    const category = formData.get('category') as string
    const read_time = formData.get('read_time') as string
    const published_at = formData.get('published_at') as string
    const is_published = formData.get('is_published') === 'on'

    const { error } = await supabase
        .from('blogs')
        .insert({
            title,
            slug,
            excerpt,
            content,
            author_name,
            author_role,
            category,
            read_time,
            published_at: published_at || new Date().toISOString(),
            is_published,
            cover_image
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/blogs')
    return redirect('/admin/blogs')
}

export async function updateBlog(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const blogId = formData.get('blogId') as string

    // Image handling
    const imageFile = formData.get('imageFile') as File
    let cover_image = formData.get('current_cover_image') as string

    if (imageFile && imageFile.size > 0) {
        const url = await uploadImage(imageFile, 'product-images')
        if (url) cover_image = url
    } else {
        // If no file, check if URL text was updated manually
        const urlInput = formData.get('cover_image_url') as string
        if (urlInput && urlInput !== cover_image) {
            cover_image = urlInput
        }
    }

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const author_name = formData.get('author_name') as string
    const author_role = formData.get('author_role') as string
    const category = formData.get('category') as string
    const read_time = formData.get('read_time') as string
    const published_at = formData.get('published_at') as string
    const is_published = formData.get('is_published') === 'on'

    const { error } = await supabase
        .from('blogs')
        .update({
            title,
            slug,
            excerpt,
            content,
            author_name,
            author_role,
            category,
            read_time,
            published_at,
            is_published,
            cover_image
        })
        .eq('id', blogId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/blogs')
    return redirect('/admin/blogs')
}
