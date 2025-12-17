'use client'

import { useCart, CartItem } from '@/context/CartContext'
import { useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product }: { product: any }) {
    const { addItem } = useCart()
    const [added, setAdded] = useState(false)

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image_url: product.image_url,
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`flex-1 bg-[#d946ef] hover:bg-[#c026d3] text-white py-4 text-lg font-bold shadow-lg shadow-[#d946ef]/20 flex items-center justify-center transition-all ${added ? '!bg-green-600 hover:!bg-green-700' : ''
                }`}
        >
            {added ? (
                <>
                    <Check className="w-6 h-6 mr-2" />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    Add to Cart
                </>
            )}
        </button>
    )
}
