'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ProductMedia = {
    id: string
    url: string
    media_type: 'gallery' | 'before_after'
}

export default function ProductGallery({ images, productName }: { images: ProductMedia[], productName: string }) {
    // Determine which images to show. If no gallery images, use a placeholder or empty state.
    // If passed images include before/after, we should stick to 'gallery' type for this main component
    // But the parent might filter it. Let's assume 'images' passed here are already filtered for gallery or main.

    // Fallback if no images
    const displayImages = images.length > 0 ? images : [{ id: 'placeholder', url: '', media_type: 'gallery' }]

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
                {displayImages[activeIndex].url ? (
                    <Image
                        src={displayImages[activeIndex].url}
                        alt={productName}
                        fill
                        className="object-contain p-4"
                        priority
                    />
                ) : (
                    <span className="text-gray-300 text-lg">No Image</span>
                )}
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {displayImages.map((image, idx) => (
                        <button
                            key={image.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative aspect-square bg-white rounded-lg overflow-hidden border transition-all ${activeIndex === idx
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-gray-100 hover:border-gray-300'
                                }`}
                        >
                            <Image
                                src={image.url}
                                alt={`${productName} thumbnail ${idx + 1}`}
                                fill
                                className="object-contain p-1"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
