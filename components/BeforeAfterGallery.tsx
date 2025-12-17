'use client'

import Image from 'next/image'

type ProductMedia = {
    id: string
    url: string
    media_type: 'gallery' | 'before_after'
}

export default function BeforeAfterGallery({ images }: { images: ProductMedia[] }) {
    if (!images || images.length === 0) return null

    return (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 my-12 shadow-sm">
            <h2 className="text-2xl font-bold text-[#131B3A] mb-8 text-center">Before & After Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {images.map((image, idx) => (
                    <div key={image.id} className="space-y-3">
                        <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                            <Image
                                src={image.url}
                                alt={`Before and After Result ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-center text-sm font-medium text-gray-500">Result {idx + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
