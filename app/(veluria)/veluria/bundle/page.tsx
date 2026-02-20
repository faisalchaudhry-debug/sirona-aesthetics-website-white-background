import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Sparkles, ShoppingBag, Check, Zap, Droplets, Shield, Package, Star } from "lucide-react"
import type { Metadata } from "next"
import VeluriaBundleButton from "@/components/VeluriaBundleButton"
import VeluriaCartHeaderButton from "@/components/VeluriaCartHeaderButton"

export const revalidate = 0

export const metadata: Metadata = {
  title: "All in One Bundle — £350 | Veluria by PB Serum",
  description:
    "Get the complete Veluria bioremodeling collection — all products in one bundle for just £350. PDRN, Exosomes, VEGF & Glutathione formulas included.",
}

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
  price: number
  image_url?: string
  slug?: string
  key_ingredients?: string
  product_media?: ProductMedia[]
}

function getFirstImage(product: Product): string | null {
  const gallery = product.product_media
    ?.filter((m) => m.media_type === "gallery")
    .sort((a, b) => a.position - b.position)
  if (gallery && gallery.length > 0) return gallery[0].url
  return product.image_url || null
}

const BUNDLE_PRICE = 350

const WHAT_YOU_GET = [
  { icon: Check, text: "All Veluria bioremodeling serums" },
  { icon: Check, text: "Free standard UK shipping" },
  { icon: Check, text: "Full professional dosage per product" },
  { icon: Check, text: "Exclusive bundle pricing — best value" },
]

const ACTIVES = [
  { icon: Zap, name: "PDRN", desc: "Deep tissue regeneration & collagen synthesis" },
  { icon: Sparkles, name: "Exosomes", desc: "Accelerated skin renewal & inflammation control" },
  { icon: Droplets, name: "VEGF", desc: "Microcirculation & vital nutrient delivery" },
  { icon: Shield, name: "Glutathione", desc: "Melanin inhibition & antioxidant protection" },
]

export default async function BundlePage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select("*, product_media(*)")
    .eq("category", "veluria")
    .eq("is_active", true)
    .order("created_at", { ascending: true })

  const veluriaProducts: Product[] = products || []
  const regularTotal = veluriaProducts.reduce((s, p) => s + p.price, 0)
  const saving = regularTotal > BUNDLE_PRICE ? regularTotal - BUNDLE_PRICE : null

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
            <span className="text-white/60">All in One Bundle</span>
          </nav>
        </div>
      </div>

      {/* ── Product Main ── */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Product Image Collage */}
          <div className="lg:sticky lg:top-24">
            {veluriaProducts.length > 0 ? (
              <div className="relative">
                {/* Primary large image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#1A1535] border border-white/10">
                  {getFirstImage(veluriaProducts[0]) ? (
                    <Image
                      src={getFirstImage(veluriaProducts[0])!}
                      alt="Veluria All in One Bundle"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-20 h-20 text-[#C9A84C]/30" />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1F]/70 via-transparent to-transparent" />

                  {/* Bundle badge overlay */}
                  <div className="absolute top-5 left-5">
                    <div
                      className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-[#0E0B1F]"
                      style={{ background: "linear-gradient(135deg, #C9A84C, #F5D98B)" }}
                    >
                      Best Value
                    </div>
                  </div>

                  {/* Product count badge */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-[#0E0B1F]/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-2">Includes</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {veluriaProducts.map((p) => (
                          <span key={p.id} className="text-xs text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnail strip */}
                {veluriaProducts.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {veluriaProducts.map((p) => {
                      const img = getFirstImage(p)
                      return (
                        <div
                          key={p.id}
                          className="relative aspect-square rounded-xl overflow-hidden bg-[#1A1535] border border-white/10"
                        >
                          {img ? (
                            <Image
                              src={img}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-[#C9A84C]/30" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Placeholder when no products yet */
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#1A1535] border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #2D2654, #C9A84C30)" }}
                  >
                    <Package className="w-10 h-10 text-[#C9A84C]" />
                  </div>
                  <p className="text-white/40 text-sm">Bundle Preview</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div className="flex flex-col gap-6">

            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" />
              Complete Collection
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-2">
                All in One
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #C9A84C 100%)" }}
                >
                  Bundle
                </span>
              </h1>
              <p className="text-white/50 text-sm">
                The complete Veluria bioremodeling range — every formula, one price.
              </p>
            </div>

            {/* Star rating strip */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <span className="text-white/40 text-xs">Professional Grade · PB Serum</span>
            </div>

            {/* Pricing */}
            <div className="flex items-end gap-4 pt-1">
              <div>
                {regularTotal > BUNDLE_PRICE && (
                  <p className="text-white/30 text-base line-through mb-1">
                    £{regularTotal.toFixed(2)} individually
                  </p>
                )}
                <span
                  className="text-5xl font-bold"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  £{BUNDLE_PRICE}
                </span>
              </div>
              {saving && saving > 0 && (
                <div className="pb-1">
                  <span className="bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    Save £{saving.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            <p className="text-white/30 text-xs -mt-4">
              One flat price · {veluriaProducts.length} products included · Free UK shipping
            </p>

            {/* What you get */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-4">What&apos;s Included</p>
              {WHAT_YOU_GET.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center shrink-0">
                    <Icon className="w-3 h-3 text-[#C9A84C]" />
                  </div>
                  <span className="text-white/70 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <VeluriaBundleButton
                products={veluriaProducts.map((p) => ({
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  image_url: getFirstImage(p) || "",
                }))}
              />
              <Link
                href="/veluria/checkout"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-bold uppercase tracking-widest hover:border-white/40 hover:text-white transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                View Cart
              </Link>
            </div>

            <p className="text-white/25 text-xs text-center">
              Secure checkout via Stripe · No account required
            </p>

          </div>
        </div>
      </section>

      {/* ── Products in Bundle ── */}
      {veluriaProducts.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-3">What&apos;s in the Box</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {veluriaProducts.length} Products Included
              </h2>
              <p className="text-white/40 text-sm max-w-md mx-auto">
                Each product targets a distinct concern — together they deliver complete bioremodeling results.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {veluriaProducts.map((product) => {
                const img = getFirstImage(product)
                const link = `/veluria/${product.slug || product.id}`
                return (
                  <div
                    key={product.id}
                    className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#C9A84C]/40 transition-all duration-500 flex flex-col"
                  >
                    <Link href={link} className="relative aspect-square bg-[#1A1535] overflow-hidden block">
                      {img ? (
                        <Image
                          src={img}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-[#C9A84C]/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1F]/60 via-transparent to-transparent" />
                    </Link>

                    <div className="p-5 flex flex-col flex-grow">
                      <Link href={link}>
                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#F5D98B] transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      {product.key_ingredients && (
                        <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-wider mb-2">
                          {product.key_ingredients}
                        </p>
                      )}
                      <p className="text-white/40 text-xs leading-relaxed flex-grow line-clamp-3 mb-4">
                        {product.short_description || product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white/30 text-xs line-through">£{product.price.toFixed(2)}</span>
                          <span className="text-[10px] font-bold text-white/30">individual</span>
                        </div>
                        <Link
                          href={link}
                          className="text-xs font-bold text-[#C9A84C]/60 hover:text-[#C9A84C] group-hover:translate-x-0.5 transition-all"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Key Actives ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1535]/60" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-3">The Science</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              4 Active Complexes
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)" }}
              >
                One Complete System
              </span>
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Every formula in the bundle is powered by the same cutting-edge active technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACTIVES.map(({ icon: Icon, name, desc }) => (
              <div
                key={name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-colors text-center"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #2D2654, #C9A84C30)" }}
                >
                  <Icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <p className="text-white font-bold text-base mb-2">{name}</p>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#2D2654] opacity-40 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#C9A84C]/15 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, #C9A84C, #F5D98B)" }}
          >
            <Package className="w-8 h-8 text-[#0E0B1F]" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Get the Complete
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #C9A84C 100%)" }}
            >
              Veluria System
            </span>
          </h2>

          <p className="text-white/50 leading-relaxed mb-3">
            {veluriaProducts.length} professional bioremodeling formulas.
            {saving && saving > 0
              ? ` Save £${saving.toFixed(2)} when you buy the bundle.`
              : " One flat price for the complete collection."}
          </p>

          <div className="flex items-baseline justify-center gap-2 mb-8">
            {regularTotal > BUNDLE_PRICE && (
              <span className="text-white/30 text-xl line-through">£{regularTotal.toFixed(2)}</span>
            )}
            <span
              className="text-6xl font-bold"
              style={{
                backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              £{BUNDLE_PRICE}
            </span>
          </div>

          <div className="max-w-sm mx-auto flex flex-col gap-3">
            <VeluriaBundleButton
              products={veluriaProducts.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image_url: getFirstImage(p) || "",
              }))}
            />
            <Link
              href="/veluria"
              className="text-white/40 hover:text-white/60 text-sm transition-colors"
            >
              ← Browse individual products
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
