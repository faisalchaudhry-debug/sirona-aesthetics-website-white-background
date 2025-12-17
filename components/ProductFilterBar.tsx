'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, X } from 'lucide-react'

// Custom Debounce Hook to avoid external dependency
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

interface Category {
    id: string
    name: string
    href: string
}

const CATEGORIES: Category[] = [
    { id: 'all', name: 'All Products', href: '/products' },
    { id: 'pb-serum', name: 'PB Serum', href: '/products?category=pb-serum' },
    { id: 'novacutan', name: 'Novacutan', href: '/products?category=novacutan' },
    { id: 'smartker', name: 'Smartker', href: '/products?category=smartker' },
]

export default function ProductFilterBar({ currentCategory }: { currentCategory?: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // State
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
    const debouncedSearch = useDebounce(searchTerm, 500)

    // Handle Search
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (debouncedSearch) {
            params.set('search', debouncedSearch)
        } else {
            params.delete('search')
        }

        router.push(`/products?${params.toString()}`, { scroll: false })
    }, [debouncedSearch, router, searchParams])

    return (
        <div className="sticky top-20 z-30 mb-12">
            <div className="bg-[#131B3A]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-2 md:p-3 shadow-2xl shadow-black/50">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Category Pills */}
                    <div className="flex space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {CATEGORIES.map((cat) => {
                            const isActive = (!currentCategory && cat.id === 'all') || currentCategory === cat.id
                            return (
                                <Link
                                    key={cat.id}
                                    href={cat.href}
                                    scroll={false}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center ${isActive
                                        ? 'bg-[#d946ef] text-white shadow-lg shadow-[#d946ef]/25'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0B1121] border border-white/10 rounded-lg py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d946ef] focus:ring-1 focus:ring-[#d946ef] transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
