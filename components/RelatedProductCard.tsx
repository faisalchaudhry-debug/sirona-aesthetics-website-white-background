import Link from 'next/link'
import { Eye } from 'lucide-react'

interface Product {
    id: string
    name: string
    description: string
    short_description?: string
    price: number
    image_url: string
    category: string
    slug?: string
}

interface RelatedProductCardProps {
    product: Product
    showPrice: boolean
}

export default function RelatedProductCard({ product, showPrice }: RelatedProductCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            {/* Image Section - White Background */}
            <div className="relative aspect-square bg-white overflow-hidden">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        No Image
                    </div>
                )}
            </div>

            {/* Click to View Button - Magenta */}
            <Link
                href={`/products/${product.slug || product.id}`}
                className="bg-[#d946ef] hover:bg-[#c026d3] text-white font-bold py-3 px-6 flex items-center justify-center gap-2 transition-colors"
            >
                <Eye className="w-4 h-4" />
                Click to View
            </Link>

            {/* Details Section - Dark Navy */}
            <div className="bg-[#1a1f3a] p-5 flex flex-col flex-grow">
                {/* Category Label */}
                <span className="text-[#d946ef] text-xs font-bold uppercase tracking-wider mb-2">
                    {product.category}
                </span>

                {/* Product Title */}
                <h3 className="text-white text-lg font-bold mb-3 leading-tight">
                    {product.name}
                </h3>

                {/* Price */}
                {showPrice ? (
                    <span className="text-white text-xl font-bold mt-auto">
                        £{product.price.toFixed(2)}
                    </span>
                ) : (
                    <span className="text-gray-400 text-sm mt-auto">
                        Login to view price
                    </span>
                )}
            </div>
        </div>
    )
}
