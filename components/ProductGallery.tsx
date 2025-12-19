'use client'

import { useState, useEffect } from 'react'
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
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isLightboxOpen) return
        if (e.key === 'Escape') setIsLightboxOpen(false)
        if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
        if (e.key === 'ArrowRight') setActiveIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
    }

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isLightboxOpen])

    return (
        <div className="space-y-4" onKeyDown={(e: any) => handleKeyDown(e)} tabIndex={0}>
            {/* Main Image */}
            <div
                className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center cursor-zoom-in group"
                onClick={() => setIsLightboxOpen(true)}
            >
                {displayImages[activeIndex].url ? (
                    <>
                        <Image
                            src={displayImages[activeIndex].url}
                            alt={productName}
                            fill
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-sirona-navy px-4 py-2 rounded-full text-sm font-semibold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Click to Expand
                            </span>
                        </div>
                    </>
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
                                ? 'border-accent ring-2 ring-accent/20'
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

            {/* Lightbox Overlay */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[110]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>

                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
                        {displayImages.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
                                }}
                                className="absolute left-0 md:-left-12 text-white/70 hover:text-white p-2 z-[110] transition-transform hover:scale-110"
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>
                        )}

                        <div className="relative w-full h-full">
                            <Image
                                src={displayImages[activeIndex].url}
                                alt={productName}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {displayImages.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
                                }}
                                className="absolute right-0 md:-right-12 text-white/70 hover:text-white p-2 z-[110] transition-transform hover:scale-110"
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>
                        )}
                    </div>

                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 z-[90]" onClick={() => setIsLightboxOpen(false)}></div>
                </div>
            )}
        </div>
    )
}
