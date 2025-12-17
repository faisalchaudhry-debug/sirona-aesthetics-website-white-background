import { createClient } from '@/utils/supabase/server'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: product } = await supabase
        .from('products')
        .select(`
            *,
            product_media (*)
        `)
        .eq('id', id)
        .single()

    if (!product) {
        return <div>Product not found</div>
    }

    // Sort media by display_order or created_at locally if needed, but array order from DB might be enough for now.
    // Ideally we would add .order() to the nested select, but Supabase JS syntax for that can be tricky without full query builder.
    // Simple sort here:
    if (product.product_media) {
        product.product_media.sort((a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
    }

    return (
        <ProductForm product={product} />
    )
}
