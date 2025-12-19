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
        <div className="sticky top-24 z-30 mb-12">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl md:rounded-full p-4 md:p-2 shadow-xl shadow-gray-200/50 max-w-5xl mx-auto overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Category Pills */}
                    <div className="flex space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide px-2">
                        {CATEGORIES.map((cat) => {
                            const isActive = (!currentCategory && cat.id === 'all') || currentCategory === cat.id
                            return (
                                <Link
                                    key={cat.id}
                                    href={cat.href}
                                    scroll={false}
                                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center ${isActive
                                        ? 'bg-gradient-brand text-white shadow-lg shadow-accent/25'
                                        : 'text-gray-500 hover:text-sirona-navy hover:bg-gray-100'
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-72 pr-2">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-12 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
