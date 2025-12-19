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
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full">
            {/* Image Section - White Background */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
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

            {/* Details Section - White with Navy Text */}
            <div className="p-5 flex flex-col flex-grow bg-white">
                {/* Category Label */}
                <span className="text-[#d946ef] text-xs font-bold uppercase tracking-wider mb-2">
                    {product.category}
                </span>

                {/* Product Title */}
                <h3 className="text-sirona-navy text-lg font-bold mb-3 leading-tight group-hover:text-[#d946ef] transition-colors">
                    {product.name}
                </h3>

                {/* Price */}
                {showPrice ? (
                    <span className="text-sirona-navy text-xl font-bold mt-auto">
                        £{product.price.toFixed(2)}
                    </span>
                ) : (
                    <span className="text-gray-500 text-sm mt-auto">
                        Login to view price
                    </span>
                )}
            </div>
        </div>
    )
}
