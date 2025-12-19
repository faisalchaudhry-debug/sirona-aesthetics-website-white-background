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
        <div className="bg-white min-h-screen font-sans selection:bg-accent selection:text-white">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-brand opacity-[0.03] rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-[0.03] rounded-full blur-[150px]"></div>
            </div>

            {/* Hero Section - Keep Dark for Professional Catalog look */}
            <div className="relative pt-32 pb-16 overflow-hidden text-center z-10 bg-[#2D2654]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container-custom relative z-10">
                    <span className="inline-block py-2 px-4 rounded-full bg-white/10 border border-white/10 text-accent text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                        Professional Catalog
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-brand">Collection</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Curated aesthetic solutions for certified practitioners. Browse our range of enzymes and skin boosters.
                    </p>
                </div>
            </div>

            <div className="container-custom py-20 relative z-10">
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
                    <div className="py-32 text-center rounded-[3rem] border border-dashed border-gray-200 bg-gray-50">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-sirona-navy mb-2">No products found</h3>
                        <p className="text-gray-500">
                            {search
                                ? `No results found for "${search}".`
                                : "Try adjusting your filters or search criteria."}
                        </p>
                        <Link href="/products" className="inline-block mt-6 text-accent font-bold hover:underline">
                            Clear all filters
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
