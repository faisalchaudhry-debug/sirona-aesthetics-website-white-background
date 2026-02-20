'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  id: string
  url: string
}

export default function VeluriaProductGallery({
  images,
  productName,
}: {
  images: GalleryImage[]
  productName: string
}) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-3xl bg-[#1A1535] flex items-center justify-center border border-white/10">
        <span className="text-white/20 text-sm uppercase tracking-widest">No Image</span>
      </div>
    )
  }

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#1A1535] border border-white/10 group">
        <Image
          src={images[active].url}
          alt={`${productName} — image ${active + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Subtle gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1F]/30 via-transparent to-transparent pointer-events-none" />

        {/* Prev / Next arrows — only when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dot indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === active ? 'bg-[#C9A84C] w-4' : 'bg-white/40'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === active
                  ? 'border-[#C9A84C] opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'
              }`}
            >
              <Image
                src={img.url}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
