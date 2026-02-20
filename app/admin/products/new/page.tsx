import { createClient } from '@/utils/supabase/server'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
    const supabase = await createClient()
    const { data: categories } = await supabase
        .from('categories')
        .select('name, slug')
        .order('name', { ascending: true })

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <ProductForm categories={categories || []} />
        </div>
    )
}
