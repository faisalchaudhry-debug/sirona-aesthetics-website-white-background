'use client'

import { useCart } from '@/context/CartContext'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function VeluriaCartHeaderButton() {
  const { cartCount } = useCart()

  return (
    <Link
      href="/veluria/checkout"
      className="relative flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
    >
      <ShoppingBag className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-[#0E0B1F]"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)' }}
        >
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </Link>
  )
}
