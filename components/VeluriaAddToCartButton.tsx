'use client'

import { useCart } from '@/context/CartContext'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'

interface Props {
  product: {
    id: string
    name: string
    price: number
    image_url: string
  }
}

export default function VeluriaAddToCartButton({ product }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url || '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
        added
          ? 'bg-green-500/20 border border-green-500/40 text-green-400'
          : 'bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/20 hover:border-[#C9A84C]/60'
      }`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </>
      )}
    </button>
  )
}
