import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2, Package, Eye, RotateCcw, AlertTriangle } from 'lucide-react'
import { deleteProduct, restoreProduct, permanentDeleteProduct } from './actions'

export const revalidate = 0

export default async function AdminProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ view?: string }>
}) {
    const supabase = await createClient()
    const { view } = await searchParams
    const isTrashView = view === 'trash'

    let query = supabase
        .from('products')
        .select('*')
        .order('updated_at', { ascending: false })

    if (isTrashView) {
        query = query.not('deleted_at', 'is', null)
    } else {
        query = query.is('deleted_at', null)
    }

    const { data: products } = await query

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <div className="flex items-center space-x-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <Link
                            href="/admin/products"
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${!isTrashView ? 'bg-white text-sirona-navy shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Active
                        </Link>
                        <Link
                            href="/admin/products?view=trash"
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${isTrashView ? 'bg-white text-sirona-navy shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Trash
                        </Link>
                    </div>
                    {!isTrashView && (
                        <Link
                            href="/admin/products/new"
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-blue-900 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Link>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 font-medium">Product</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium">Stock</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Updated</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products?.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 text-gray-300 bg-gray-100 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <Package className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 capitalize">{product.category || '-'}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">${product.price}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                            ${product.stock > 10 ? 'bg-green-100 text-green-800' :
                                                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isTrashView ? (
                                            <span className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">Deleted</span>
                                        ) : product.is_active ? (
                                            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">Active</span>
                                        ) : (
                                            <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">Draft</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {new Date(product.updated_at || product.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {isTrashView ? (
                                            <>
                                                <form action={async () => {
                                                    'use server'
                                                    await restoreProduct(product.id)
                                                }} className="inline-block">
                                                    <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Restore">
                                                        <RotateCcw className="w-4 h-4" />
                                                    </button>
                                                </form>
                                                <form action={async () => {
                                                    'use server'
                                                    if (product.deleted_at) { // Confirm checks usually client-side, but standard hard delete here
                                                        await permanentDeleteProduct(product.id)
                                                    }
                                                }} className="inline-block">
                                                    <button className="text-red-500 hover:text-red-700 transition-colors" title="Delete Permanently">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={`/products/${(product as any).slug || product.id}`}
                                                    target="_blank"
                                                    className="text-gray-400 hover:text-blue-600 transition-colors inline-block"
                                                    title="View Product"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="text-gray-400 hover:text-primary transition-colors inline-block"
                                                    title="Edit Product"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <form action={async () => {
                                                    'use server'
                                                    await deleteProduct(product.id)
                                                }} className="inline-block">
                                                    <button className="text-gray-400 hover:text-red-600 transition-colors" title="Move to Trash">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {(!products || products.length === 0) && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        {isTrashView ? 'Trash is empty.' : 'No products found. Start by adding one.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
