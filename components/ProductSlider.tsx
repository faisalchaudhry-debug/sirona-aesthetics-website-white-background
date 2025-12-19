'use client'

import RelatedProductCard from './RelatedProductCard'

interface Product {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    category: string
    slug?: string
}

interface ProductSliderProps {
    products: Product[]
    showPrice: boolean
}

export default function ProductSlider({ products, showPrice }: ProductSliderProps) {
    if (!products || products.length === 0) return null

    return (
        <div className="relative">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product) => (
                    <div key={product.id}>
                        <RelatedProductCard product={product} showPrice={showPrice} />
                    </div>
                ))}
            </div>
        </div>
    )
}
