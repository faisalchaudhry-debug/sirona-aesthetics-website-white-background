import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Sparkles, ShoppingBag } from "lucide-react"
import type { Metadata } from "next"
import VeluriaProductGallery from "@/components/VeluriaProductGallery"
import VeluriaAddToCartButton from "@/components/VeluriaAddToCartButton"
import VeluriaCartHeaderButton from "@/components/VeluriaCartHeaderButton"

export const revalidate = 0

interface ProductMedia {
  id: string
  url: string
  media_type: "gallery" | "before_after"
  position: number
}

interface Product {
  id: string
  name: string
  description: string
  short_description?: string
  long_description?: string
  price: number
  sale_price?: number | null
  image_url?: string
  slug?: string
  category: string
  is_active: boolean
  product_media?: ProductMedia[]
}

async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createClient()

  // Try by slug first
  let { data } = await supabase
    .from("products")
    .select("*, product_media(*)")
    .eq("category", "veluria")
    .eq("is_active", true)
    .eq("slug", slug)
    .maybeSingle()

  if (!data) {
    // Fallback: try by id
    const res = await supabase
      .from("products")
      .select("*, product_media(*)")
      .eq("category", "veluria")
      .eq("is_active", true)
      .eq("id", slug)
      .maybeSingle()
    data = res.data
  }

  return data
}

async function getOtherVeluriaProducts(excludeId: string): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*, product_media(*)")
    .eq("category", "veluria")
    .eq("is_active", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: true })

  return data || []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: "Product Not Found | Veluria" }
  return {
    title: `${product.name} | Veluria by PB Serum`,
    description: product.short_description || product.description || `${product.name} — professional cosmetic bioremodeling by PB Serum.`,
  }
}

function getFirstImage(product: Product): string | null {
  const gallery = product.product_media
    ?.filter((m) => m.media_type === "gallery")
    .sort((a, b) => a.position - b.position)
  if (gallery && gallery.length > 0) return gallery[0].url
  return product.image_url || null
}

export default async function VeluriaProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const otherProducts = await getOtherVeluriaProducts(product.id)

  const galleryImages = (product.product_media || [])
    .filter((m) => m.media_type === "gallery")
    .sort((a, b) => a.position - b.position)
    .map((m) => ({ id: m.id, url: m.url }))

  // If no gallery images, fall back to image_url
  if (galleryImages.length === 0 && product.image_url) {
    galleryImages.push({ id: "main", url: product.image_url })
  }

  const beforeAfterImages = (product.product_media || [])
    .filter((m) => m.media_type === "before_after")
    .sort((a, b) => a.position - b.position)

  const discountedPrice = Math.round(product.price * 0.9 * 100) / 100
  const productLink = `/veluria/${product.slug || product.id}`

  return (
    <div className="min-h-screen bg-[#0E0B1F] text-white font-[var(--font-geist-sans)]">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0E0B1F]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link href="/veluria" className="text-xl font-bold tracking-[0.2em] text-white uppercase hover:text-[#F5D98B] transition-colors">
            Veluria
          </Link>
          <span className="hidden sm:block text-white/30 text-sm">by PB Serum</span>
        </div>
        <div className="flex items-center gap-5">
          <VeluriaCartHeaderButton />
          <Link
            href="/veluria"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">All Products</span>
          </Link>
        </div>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="pt-24 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href="/veluria" className="hover:text-white/70 transition-colors">Veluria</Link>
            <span>/</span>
            <span className="text-white/60">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product Main ── */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Gallery */}
          <div className="lg:sticky lg:top-24">
            <VeluriaProductGallery images={galleryImages} productName={product.name} />
          </div>

          {/* Right — Info */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
              Veluria by PB Serum
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            {/* Short description */}
            {product.short_description && (
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider">
                {product.short_description}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-white/60 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-white/30 text-lg line-through">£{product.price.toFixed(2)}</span>
              <span
                className="text-4xl font-bold"
                style={{
                  backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                £{discountedPrice.toFixed(2)}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#C9A84C]/20 text-[#C9A84C] px-2.5 py-1 rounded-full">
                -10%
              </span>
            </div>

            <p className="text-white/30 text-xs -mt-2">Exclusive introductory offer — automatically applied</p>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex-1">
                <VeluriaAddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: discountedPrice,
                    image_url: getFirstImage(product) || "",
                  }}
                />
              </div>
              <Link
                href="/veluria/checkout"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-bold uppercase tracking-widest hover:border-white/40 hover:text-white transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                View Cart
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 pt-6">
              {/* Long description */}
              {product.long_description && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Product Details</h2>
                  <div className="text-white/60 leading-relaxed text-sm space-y-3">
                    {product.long_description.split("\n").filter(Boolean).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key actives chips */}
            <div className="flex flex-wrap gap-2">
              {["PDRN", "Exosomes", "VEGF", "Glutathione", "Collagenase G&H"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border border-[#C9A84C]/30 text-[#C9A84C]/80 bg-[#C9A84C]/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Before & After ── */}
      {beforeAfterImages.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-3">Results</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Before &amp; After</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beforeAfterImages.map((media) => (
                <div
                  key={media.id}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#1A1535]"
                >
                  <Image
                    src={media.url}
                    alt={`${product.name} before & after`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Other Veluria Products ── */}
      {otherProducts.length > 0 && (
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1535]/40" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-3">Explore More</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Other Veluria Products</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p) => {
                const img = getFirstImage(p)
                const link = `/veluria/${p.slug || p.id}`
                const dp = Math.round(p.price * 0.9 * 100) / 100
                return (
                  <Link
                    key={p.id}
                    href={link}
                    className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#C9A84C]/50 transition-all duration-500 flex flex-col"
                  >
                    <div className="relative aspect-square bg-[#1A1535] overflow-hidden">
                      {img ? (
                        <Image
                          src={img}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-[#C9A84C]/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1F]/60 via-transparent to-transparent" />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#F5D98B] transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-white/40 text-sm line-clamp-2 flex-grow mb-3">
                        {p.short_description || p.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white/30 text-sm line-through">£{p.price.toFixed(2)}</span>
                          <span
                            className="text-lg font-bold"
                            style={{
                              backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            £{dp.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#C9A84C] group-hover:translate-x-1 transition-transform">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
