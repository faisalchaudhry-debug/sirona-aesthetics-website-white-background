'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function CartBadge({ className, onClick }: { className?: string, onClick?: () => void }) {
    console.log('CartBadge rendering')
    const { cartCount } = useCart()

    return (
        <Link href="/cart" onClick={onClick} className={`transition-colors relative ${className || 'text-white/80 hover:text-white'}`}>
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                </span>
            )}
        </Link>
    )
}

