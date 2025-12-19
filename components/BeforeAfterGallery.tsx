'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type ProductMedia = {
    id: string
    url: string
    media_type: 'gallery' | 'before_after'
}

export default function BeforeAfterGallery({ images }: { images: ProductMedia[] }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    if (!images || images.length === 0) return null

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (lightboxIndex === null) return
        if (e.key === 'Escape') setLightboxIndex(null)
        if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : (prev as number) - 1))
        if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : (prev as number) + 1))
    }

    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [lightboxIndex])

    return (
        <div
            className="bg-white rounded-2xl p-8 border border-gray-100 my-12 shadow-sm focus:outline-none"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {images.map((image, idx) => (
                    <div key={image.id} className="space-y-3">
                        <div
                            className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in group"
                            onClick={() => setLightboxIndex(idx)}
                        >
                            <Image
                                src={image.url}
                                alt={`Before and After Result ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-sirona-navy px-4 py-2 rounded-full text-sm font-semibold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    View Fullsize
                                </span>
                            </div>
                        </div>
                        <p className="text-center text-sm font-medium text-gray-500">Result {idx + 1}</p>
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[110]"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : (prev as number) - 1))
                                }}
                                className="absolute left-0 md:-left-12 text-white/70 hover:text-white p-2 z-[110] transition-transform hover:scale-110"
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>
                        )}

                        <div className="relative w-full h-full">
                            <Image
                                src={images[lightboxIndex].url}
                                alt={`Result ${lightboxIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : (prev as number) + 1))
                                }}
                                className="absolute right-0 md:-right-12 text-white/70 hover:text-white p-2 z-[110] transition-transform hover:scale-110"
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>
                        )}
                    </div>

                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 z-[90]" onClick={() => setLightboxIndex(null)}></div>
                </div>
            )}
        </div>
    )
}
