import { createClient } from '@/utils/supabase/server'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const [{ data: product }, { data: categories }] = await Promise.all([
        supabase
            .from('products')
            .select(`*, product_media (*)`)
            .eq('id', id)
            .single(),
        supabase
            .from('categories')
            .select('name, slug')
            .order('name', { ascending: true }),
    ])

    if (!product) {
        return <div>Product not found</div>
    }

    if (product.product_media) {
        product.product_media.sort((a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
    }

    return (
        <ProductForm product={product} categories={categories || []} />
    )
}
