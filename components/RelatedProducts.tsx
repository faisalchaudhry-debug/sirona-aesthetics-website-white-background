import { createClient } from '@/utils/supabase/server'
import ProductSlider from './ProductSlider'

interface RelatedProductsProps {
    currentProductId: string
    showPrice: boolean
    category?: string
}

export default async function RelatedProducts({ currentProductId, showPrice, category }: RelatedProductsProps) {
    const supabase = await createClient()

    // Fetch products
    // We'll fetch more than we need to allow for some randomness
    let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .neq('id', currentProductId)
        .limit(12)

    // Optional: Prefer same category if provided, but for now strict random from all active might be better
    // if the catalog is small. If category is provided, we could prioritize it, 
    // but standardizing on "random from all" as requested is safer for small catalogs.

    const { data: products } = await query

    if (!products || products.length === 0) return null

    // Shuffle the array to show random products
    const shuffled = [...products].sort(() => 0.5 - Math.random())

    return (
        <div className="mt-24 border-t border-white/10 pt-16">
            <ProductSlider products={shuffled} showPrice={showPrice} />
        </div>
    )
}
