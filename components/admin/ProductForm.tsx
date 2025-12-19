'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createProduct, updateProduct, deleteProductMedia } from '@/app/admin/products/actions'

type ProductMedia = {
    id: string
    url: string
    media_type: 'gallery' | 'before_after'
}

type Product = {
    id?: string
    name: string
    description?: string
    short_description?: string
    long_description?: string
    price: number
    sale_price?: number | null
    stock: number
    category: string
    is_active: boolean
    product_media?: ProductMedia[]
}

export default function ProductForm({ product }: { product?: Product }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
    const [beforeAfterPreviews, setBeforeAfterPreviews] = useState<string[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'before_after') => {
        const files = e.target.files
        if (!files) return

        const newPreviews: string[] = []
        const MAX_SIZE = 5 * 1024 * 1024 // 5MB

        Array.from(files).forEach(file => {
            if (file.size > MAX_SIZE) {
                alert(`File ${file.name} is too large. Max size is 5MB.`)
                return
            }
            newPreviews.push(URL.createObjectURL(file))
        })

        // If we filtered out all files due to size, don't update state
        if (newPreviews.length === 0 && files.length > 0) return

        if (type === 'gallery') {
            setGalleryPreviews(prev => [...prev, ...newPreviews])
        } else {
            setBeforeAfterPreviews(prev => [...prev, ...newPreviews])
        }
    }

    const handleDeleteMedia = async (mediaId: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return

        const result = await deleteProductMedia(mediaId)
        if (result.success) {
            router.refresh()
        } else {
            alert('Failed to delete image')
        }
    }

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            let result
            if (product?.id) {
                // Determine which files to delete based on the form state (if any custom logic was needed, but here we just submit)
                result = await updateProduct(formData)
            } else {
                result = await createProduct(formData)
            }

            if (result && result.error) {
                alert(`Error: ${result.error}`)
                return
            }

            if (result?.success) {
                if (product?.id) {
                    // Update: Stay on page
                    alert('Product updated successfully!')
                    setGalleryPreviews([])
                    setBeforeAfterPreviews([])
                    router.refresh()
                } else if ((result as any).id) {
                    // Create: Redirect to edit page
                    router.push(`/admin/products/${(result as any).id}`)
                    router.refresh()
                } else {
                    // Fallback
                    router.push('/admin/products')
                    router.refresh()
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            alert(`Failed to save product: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const galleryImages = product?.product_media?.filter(m => m.media_type === 'gallery') || []
    const beforeAfterImages = product?.product_media?.filter(m => m.media_type === 'before_after') || []

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center space-x-4">
                <Link href="/admin/products" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">
                    {product?.id ? 'Edit Product' : 'New Product'}
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <form action={handleSubmit} className="p-6 space-y-8">
                    {product?.id && <input type="hidden" name="productId" value={product.id} />}

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input type="text" name="name" defaultValue={product?.name} required className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input type="number" name="price" step="0.01" defaultValue={product?.price} required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                                <input type="number" name="sale_price" step="0.01" defaultValue={product?.sale_price ?? ''} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    name="is_active"
                                    defaultValue={product?.is_active ? 'true' : 'false'}
                                    className="w-full px-4 py-2 border rounded-lg bg-white"
                                >
                                    <option value="true">Active (Visible)</option>
                                    <option value="false">Draft (Hidden)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input type="number" name="stock" defaultValue={product?.stock ?? 0} required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select name="category" defaultValue={product?.category ?? 'pb-serum'} className="w-full px-4 py-2 border rounded-lg bg-white">
                                    <option value="pb-serum">PB Serum</option>
                                    <option value="novacutan">Novacutan</option>
                                    <option value="smartker">Smartker</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Descriptions</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                            <textarea name="description" rows={2} defaultValue={product?.description} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Highlight)</label>
                            <input type="text" name="short_description" defaultValue={product?.short_description} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
                            <textarea name="long_description" rows={6} defaultValue={product?.long_description} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </div>

                    {/* Media Gallery */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Product Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {galleryImages.map((media) => (
                                    <div key={media.id} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                                        <Image src={media.url} alt="Gallery" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteMedia(media.id)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {galleryPreviews.map((url, i) => (
                                    <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-primary/50">
                                        <Image src={url} alt="Preview" fill className="object-cover" />
                                    </div>
                                ))}
                                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-primary cursor-pointer transition-colors bg-gray-50/50 hover:bg-gray-50">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Add Images</span>
                                    <input
                                        type="file"
                                        name="gallery_files"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'gallery')}
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Before & After Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {beforeAfterImages.map((media) => (
                                    <div key={media.id} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                                        <Image src={media.url} alt="Before/After" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteMedia(media.id)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {beforeAfterPreviews.map((url, i) => (
                                    <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-primary/50">
                                        <Image src={url} alt="Preview" fill className="object-cover" />
                                    </div>
                                ))}
                                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-primary cursor-pointer transition-colors bg-gray-50/50 hover:bg-gray-50">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Add B/A Images</span>
                                    <input
                                        type="file"
                                        name="before_after_files"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'before_after')}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
                        <Link href="/admin/products" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center disabled:opacity-50"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
