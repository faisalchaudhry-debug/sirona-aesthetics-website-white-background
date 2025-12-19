import Link from 'next/link'
import { ArrowRight, Lock, Clock } from 'lucide-react'

interface Product {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    category: string
    slug?: string
}

interface ProductCardProps {
    product: Product
    showPrice: boolean
    isPending?: boolean
}

export default function ProductCard({ product, showPrice, isPending }: ProductCardProps) {
    return (
        <div className="group bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:border-accent/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-gray-50">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {product.image_url ? (
                        <div className="relative w-full h-full">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {/* Subtle gradient for depth, but lighter */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    ) : (
                        <span>No Image</span>
                    )}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-sirona-navy uppercase tracking-wider shadow-sm">
                    {product.category}
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow relative">
                <h3 className="text-xl font-bold text-sirona-navy mb-3 group-hover:text-accent transition-colors leading-tight">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-8 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    {showPrice ? (
                        <span className="text-2xl font-bold text-sirona-navy">£{product.price.toFixed(2)}</span>
                    ) : isPending ? (
                        <div className="flex items-center text-amber-500 text-xs uppercase tracking-wider font-bold">
                            <Clock className="w-3 h-3 mr-2" />
                            Pending Approval
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <Lock className="w-3 h-3 mr-2" />
                            Login for Price
                        </div>
                    )}

                    <Link href={`/products/${product.slug || product.id}`} className="text-sirona-navy hover:text-accent font-bold text-sm flex items-center transition-colors">
                        Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
