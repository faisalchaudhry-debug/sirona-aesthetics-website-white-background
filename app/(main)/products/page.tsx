import { createClient } from '@/utils/supabase/server'
import ProductCard from '@/components/ProductCard'
import ProductFilterBar from '@/components/ProductFilterBar'
import Link from 'next/link'
import { Search } from 'lucide-react'

export const revalidate = 0

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string }>
}) {
    const { category, search } = await searchParams
    const supabase = await createClient()

    // Check user role
    const { data: { user } } = await supabase.auth.getUser()
    let showPrice = false
    let isPending = false

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, is_approved')
            .eq('id', user.id)
            .single()

        if (profile) {
            if ((profile.role === 'doctor' || profile.role === 'admin') && profile.is_approved) {
                showPrice = true
            } else if ((profile.role === 'doctor' || profile.role === 'user') && !profile.is_approved) {
                isPending = true
            }
        }
    }

    // Fetch products
    let query = supabase.from('products').select('*').eq('is_active', true)

    // Apply Categories
    if (category) {
        query = query.eq('category', category)
    }

    // Apply Search
    if (search) {
        query = query.ilike('name', `%${search}%`)
    }

    // Default Sort (Newest)
    query = query.order('created_at', { ascending: false })

    const { data: products, error } = await query

    if (error) {
        console.error('Error fetching products:', error)
        return (
            <div className="bg-[#0B1121] min-h-screen py-32 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                <p className="text-gray-400">Unable to load products. Please try again later.</p>
            </div>
        )
    }

    return (
        <div className="bg-[#0B1121] min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#131B3A] to-transparent opacity-50"></div>
                <div className="absolute -top-32 left-1/2 w-96 h-96 bg-[#d946ef] rounded-full filter blur-[128px] opacity-10"></div>

                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#d946ef]/10 text-[#d946ef] text-xs font-bold uppercase tracking-wider mb-6 border border-[#d946ef]/20">
                        Professional Catalog
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Professional <span className="text-[#d946ef]">Collection</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Curated aesthetic solutions for certified practitioners. Browse our range of enzymes and skin boosters.
                    </p>
                </div>
            </div>

            <div className="container-custom pb-32">
                {/* Filters & Controls */}
                <ProductFilterBar currentCategory={category} />

                {/* Product Grid */}
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} showPrice={showPrice} isPending={isPending} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center rounded-3xl border border-dashed border-white/10 bg-white/5">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                        <p className="text-gray-400">
                            {search
                                ? `No results found for "${search}".`
                                : "Try adjusting your filters or search criteria."}
                        </p>
                        <Link href="/products" className="inline-block mt-6 text-[#d946ef] font-bold hover:underline">
                            Clear all filters
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
