import { createClient } from '@/utils/supabase/server'
import CategoryManager from './CategoryManager'

export const revalidate = 0

export default async function AdminCategoriesPage() {
    const supabase = await createClient()

    // Fetch all categories
    const { data: categories } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name', { ascending: true })

    // Count products per category slug
    const { data: products } = await supabase
        .from('products')
        .select('category')

    const countMap: Record<string, number> = {}
    for (const p of products || []) {
        if (p.category) countMap[p.category] = (countMap[p.category] || 0) + 1
    }

    const categoriesWithCount = (categories || []).map(cat => ({
        ...cat,
        product_count: countMap[cat.slug] || 0,
    }))

    return <CategoryManager categories={categoriesWithCount} />
}
