import { createClient } from '@/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, Truck } from 'lucide-react'
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

    if (!user) {
        redirect('/register')
    }

    let showPrice = false

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
                // Redirect unapproved users to the account pending page
                redirect('/account-pending')
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
        <div className="bg-white min-h-screen pt-28 pb-20">
            <div className="container-custom">
                {/* Breadcrumb / Back Link */}
                <div className="mb-8">
                    <Link href="/products" className="inline-flex items-center text-gray-500 hover:text-sirona-navy transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 overflow-hidden">
                    {/* Left Column: Gallery (Sticky on Desktop) */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-32">
                            <ProductGallery images={galleryImages} productName={product.name} />
                        </div>
                    </div>

                    {/* Right Column: Product Info (Scrollable) */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-gray-100 text-sirona-navy text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-gray-200">
                                {product.category}
                            </span>
                            <AdminEditButton editUrl={`/admin/products/${product.id}`} />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-sirona-navy mb-4 leading-tight">{product.name}</h1>

                        {product.short_description && (
                            <p className="text-lg text-gray-500 mb-8 font-medium leading-relaxed">{product.short_description}</p>
                        )}

                        <div className="mb-8">
                            {showPrice ? (
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-end gap-3 mb-2">
                                        {product.sale_price ? (
                                            <>
                                                <span className="text-4xl font-bold text-red-600">£{product.sale_price.toFixed(2)}</span>
                                                <span className="text-xl text-gray-400 line-through mb-1.5">£{product.price.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className="text-4xl font-bold text-sirona-navy">£{product.price.toFixed(2)}</span>
                                        )}
                                        <span className="text-sm text-gray-500 mb-2 font-medium">VAT included</span>
                                    </div>
                                    <div className="h-px bg-gray-200 my-4 w-full"></div>
                                    <div className="flex flex-col gap-4">
                                        <AddToCartButton product={product} />
                                        <div className="flex items-center justify-center text-xs text-gray-500 gap-2">
                                            <Shield className="w-3 h-3" /> Secure Transaction
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#1A1433] rounded-2xl p-8 text-white shadow-xl shadow-[#1A1433]/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-accent/20"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                                                <Shield className="w-5 h-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">Professional Pricing</p>
                                                <p className="text-white/60 text-xs">Verified Access Only</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-6 leading-relaxed border-t border-white/10 pt-4">
                                            Exclusive wholesale pricing is available for verified medical professionals.
                                        </p>
                                        <Link href="/login" className="w-full block text-center bg-white text-sirona-navy hover:bg-gray-100 text-sm font-bold px-6 py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg">
                                            Login to View Price
                                        </Link>
                                        <div className="mt-4 text-center">
                                            <Link href="/register" className="text-xs text-white/50 hover:text-white transition-colors">
                                                Don't have an account? Register
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Details Accordion/Section */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-sirona-navy uppercase tracking-widest mb-4 flex items-center">
                                    <span className="w-8 h-px bg-sirona-navy mr-3"></span>
                                    Description
                                </h3>
                                <div className="prose prose-gray text-gray-600 max-w-none whitespace-pre-line">
                                    <p>{product.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <Shield className="w-5 h-5 text-sirona-navy mb-2" />
                                    <h4 className="font-bold text-sm text-sirona-navy">100% Authentic</h4>
                                    <p className="text-xs text-gray-500 mt-1">Direct from Manufacturer</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <Truck className="w-5 h-5 text-sirona-navy mb-2" />
                                    <h4 className="font-bold text-sm text-sirona-navy">Fast Delivery</h4>
                                    <p className="text-xs text-gray-500 mt-1">Next Day UK Shipping</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Long Description Section */}
            {product.long_description && (
                <div className="py-16 bg-white border-t border-gray-100">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-sirona-navy mb-8 text-center">Product Details</h2>
                            <div className="prose prose-lg prose-gray max-w-none whitespace-pre-line text-gray-600 leading-relaxed">
                                <p>{product.long_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Before After Gallery Section */}
            {beforeAfterImages.length > 0 && (
                <div className="py-16 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-sirona-navy">Clinical Results</h2>
                            <p className="text-gray-500 mt-3">Before and after transformations linked to this product.</p>
                        </div>
                        <BeforeAfterGallery images={beforeAfterImages} />
                    </div>
                </div>
            )}

            {/* Educational Section */}
            <ProductEducation category={product.category} />

            {/* Reviews Section */}
            <div className="bg-white py-16 md:py-24 border-t border-gray-100">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-sirona-navy">Client Feedback</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>)}
                            </div>
                            <span className="text-gray-500 font-medium">Trusted Reviews</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Reviews List */}
                        <div className="lg:col-span-7">
                            <ReviewList productId={product.id} />
                        </div>

                        {/* Review Form */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-32">
                                {user ? (
                                    <ReviewForm productId={product.id} slug={product.slug} />
                                ) : (
                                    <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                                        <h3 className="text-xl font-bold text-sirona-navy mb-4">Share your experience</h3>
                                        <p className="text-gray-500 mb-6">Verified purchases can leave reviews to help other professionals.</p>
                                        <Link
                                            href="/login"
                                            className="inline-block bg-sirona-navy text-white font-bold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors shadow-lg shadow-sirona-navy/20"
                                        >
                                            Login to Review
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 py-16 border-t border-gray-200">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold text-sirona-navy">Related Products</h2>
                        <Link href="/products" className="text-accent font-bold text-sm hover:underline">View All</Link>
                    </div>
                    <RelatedProducts
                        currentProductId={product.id}
                        showPrice={showPrice}
                        category={product.category}
                    />
                </div>
            </div>
        </div>
    )
}
