'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function CartBadge() {
    const { cartCount } = useCart()

    return (
        <Link href="/cart" className="text-gray-700 hover:text-primary transition-colors relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                </span>
            )}
        </Link>
    )
}
