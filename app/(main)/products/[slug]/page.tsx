import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Shield, Truck } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'
import RelatedProducts from '@/components/RelatedProducts'
import ProductEducation from '@/components/ProductEducation'
import AdminEditButton from '@/components/AdminEditButton'
import ReviewForm from '@/components/reviews/ReviewForm'
import ReviewList from '@/components/reviews/ReviewList'
import ProductGallery from '@/components/ProductGallery'
import BeforeAfterGallery from '@/components/BeforeAfterGallery'

export const revalidate = 0

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const supabase = await createClient()
    const { slug } = await params

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

    // Fetch product with media
    const { data: product, error } = await supabase
        .from('products')
        .select(`
            *,
            product_media (*)
        `)
        .eq('slug', slug)
        .single()

    if (error || !product) {
        notFound()
    }

    // Process media
    const galleryImages = product.product_media?.filter((m: any) => m.media_type === 'gallery') || []
    const beforeAfterImages = product.product_media?.filter((m: any) => m.media_type === 'before_after') || []

    // Fallback for gallery if migration script didn't run or table empty but image_url exists (backward compatibility)
    if (galleryImages.length === 0 && product.image_url) {
        galleryImages.push({ id: 'legacy-main', url: product.image_url, media_type: 'gallery' })
    }
    // Same for before/after
    if (beforeAfterImages.length === 0 && product.before_after_image_url) {
        beforeAfterImages.push({ id: 'legacy-ba', url: product.before_after_image_url, media_type: 'before_after' })
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="container-custom py-12">
                <Link href="/products" className="inline-flex items-center text-gray-500 hover:text-[#d946ef] mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Product Gallery */}
                    <ProductGallery images={galleryImages} productName={product.name} />

                    {/* Product Info */}
                    <div>
                        <div className="mb-4">
                            <span className="bg-[#d946ef]/10 text-[#d946ef] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {product.category}
                            </span>
                            <AdminEditButton editUrl={`/admin/products/${product.id}`} />
                        </div>
                        <h1 className="text-4xl font-bold text-[#131B3A] mb-4 leading-tight">{product.name}</h1>
                        {product.short_description && (
                            <p className="text-lg text-gray-500 mb-6 font-medium leading-relaxed">{product.short_description}</p>
                        )}

                        <div className="prose prose-gray text-gray-600 mb-8 border-b border-gray-100 pb-8">
                            <p>{product.long_description || product.description}</p>
                        </div>

                        <div className="mb-8">
                            {showPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-[#d946ef] mb-2">£{product.price.toFixed(2)}</span>
                                    <span className="text-sm text-gray-500">VAT included (if applicable)</span>
                                </div>
                            ) : isPending ? (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                                    <div className="flex items-center mb-3">
                                        <Truck className="w-5 h-5 text-yellow-600 mr-2" />
                                        <p className="font-bold text-lg text-yellow-800">Account Pending Approval</p>
                                    </div>
                                    <p className="text-yellow-700 text-sm leading-relaxed">
                                        Your account is currently under review by our team. Once approved, you will have full access to professional pricing and purchasing.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-[#131B3A] rounded-2xl p-6 text-white">
                                    <div className="flex items-center mb-3">
                                        <Shield className="w-5 h-5 text-[#d946ef] mr-2" />
                                        <p className="font-bold text-lg">Professional Pricing</p>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                        Exclusive pricing is available for verified medical professionals.
                                    </p>
                                    <Link href="/login" className="inline-block bg-[#d946ef] hover:bg-[#c026d3] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors">
                                        Login to view price
                                    </Link>
                                </div>
                            )}
                        </div>

                        {showPrice && (
                            <div className="flex space-x-4 mb-10">
                                <AddToCartButton product={product} />
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-start">
                                <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                    <Shield className="w-6 h-6 text-[#131B3A]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#131B3A] mb-1">Authentic Product</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">100% genuine, directly from manufacturer.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                    <Truck className="w-6 h-6 text-[#131B3A]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#131B3A] mb-1">Fast Delivery</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Next day delivery available in UK.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Before After Gallery Section */}
            {beforeAfterImages.length > 0 && (
                <div className="container-custom">
                    <BeforeAfterGallery images={beforeAfterImages} />
                </div>
            )}

            {/* Educational Section - Full Width */}
            <ProductEducation category={product.category} />

            {/* Reviews Section */}
            <div className="bg-gray-50 py-16 md:py-24 border-y border-gray-100">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-[#131B3A] mb-12 text-center">Customer Reviews</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Reviews List */}
                        <div className="lg:col-span-7">
                            <ReviewList productId={product.id} />
                        </div>

                        {/* Review Form */}
                        <div className="lg:col-span-5 sticky top-24 h-fit">
                            {user ? (
                                <ReviewForm productId={product.id} slug={product.slug} />
                            ) : (
                                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold text-[#131B3A] mb-4">Share your thoughts</h3>
                                    <p className="text-gray-500 mb-6">Please log in to leave a review for this product.</p>
                                    <Link
                                        href="/login"
                                        className="inline-block bg-[#131B3A] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1a254a] transition-colors"
                                    >
                                        Login to Review
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                {/* Related Products Slider */}
                <RelatedProducts
                    currentProductId={product.id}
                    showPrice={showPrice}
                    category={product.category}
                />
            </div>
        </div>
    )
}
