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
        <div className="group bg-[#131B3A] border border-white/5 rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-[0_0_20px_rgba(236,0,140,0.15)] transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-[#0A1128]">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    {product.image_url ? (
                        <div className="relative w-full h-full">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#131B3A] to-transparent opacity-60"></div>
                        </div>
                    ) : (
                        <span>No Image</span>
                    )}
                </div>
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {product.category}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    {showPrice ? (
                        <span className="text-2xl font-bold text-white">£{product.price.toFixed(2)}</span>
                    ) : isPending ? (
                        <div className="flex items-center text-yellow-500 text-xs uppercase tracking-wider font-bold">
                            <Clock className="w-3 h-3 mr-2" />
                            Pending Approval
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <Lock className="w-3 h-3 mr-2" />
                            Login for Price
                        </div>
                    )}

                    <Link href={`/products/${product.slug || product.id}`} className="text-white hover:text-accent font-bold text-sm flex items-center transition-colors">
                        Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
