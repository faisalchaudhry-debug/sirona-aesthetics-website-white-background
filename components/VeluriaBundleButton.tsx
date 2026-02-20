'use client'

import { useCart } from '@/context/CartContext'
import { ShoppingBag, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface BundleProduct {
  id: string
  name: string
  price: number
  image_url: string
}

const BUNDLE_TOTAL = 350

export default function VeluriaBundleButton({ products }: { products: BundleProduct[] }) {
  const { addItem, removeItem } = useCart()
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleBundle = () => {
    if (products.length === 0) return
    setLoading(true)

    // Remove any of these products already in the cart to avoid duplicates
    products.forEach(p => removeItem(p.id))

    // Distribute £350 proportionally by regular price
    const totalRegular = products.reduce((sum, p) => sum + p.price, 0)

    products.forEach((product, i) => {
      const isLast = i === products.length - 1
      let bundlePrice: number

      if (totalRegular === 0) {
        bundlePrice = Math.round((BUNDLE_TOTAL / products.length) * 100) / 100
      } else if (isLast) {
        // Last item absorbs rounding difference so cart total = exactly £350
        const alreadyAllocated = products
          .slice(0, -1)
          .reduce((sum, p) => sum + Math.round((p.price / totalRegular) * BUNDLE_TOTAL * 100) / 100, 0)
        bundlePrice = Math.round((BUNDLE_TOTAL - alreadyAllocated) * 100) / 100
      } else {
        bundlePrice = Math.round((product.price / totalRegular) * BUNDLE_TOTAL * 100) / 100
      }

      addItem({
        id: product.id,
        name: product.name,
        price: bundlePrice,
        quantity: 1,
        image_url: product.image_url || '',
      })
    })

    setLoading(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <button
      onClick={handleBundle}
      disabled={loading || products.length === 0}
      className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 ${
        added
          ? 'bg-green-500/20 border border-green-500/40 text-green-400'
          : 'border border-[#C9A84C] text-[#0E0B1F] hover:opacity-90'
      }`}
      style={added ? {} : { background: 'linear-gradient(135deg, #C9A84C, #F5D98B)' }}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Adding…
        </>
      ) : added ? (
        <>
          <Check className="w-4 h-4" />
          Bundle Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4" />
          Get the Bundle — £{BUNDLE_TOTAL}
        </>
      )}
    </button>
  )
}
