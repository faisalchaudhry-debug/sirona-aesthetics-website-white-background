import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Sparkles, Zap, Droplets, Shield, Tag, Package } from "lucide-react"
import VeluriaAddToCartButton from "@/components/VeluriaAddToCartButton"
import VeluriaCartHeaderButton from "@/components/VeluriaCartHeaderButton"

export const revalidate = 0

interface ProductMedia {
  id: string
  url: string
  position: number
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  slug?: string
  key_ingredients?: string
  short_description?: string
  product_media?: ProductMedia[]
}

const SCIENCE_ACTIVES = [
  {
    icon: Zap,
    name: "PDRN",
    label: "Polydeoxyribonucleotide",
    description:
      "Stimulates tissue regeneration and collagen synthesis at a cellular level for deep structural repair.",
  },
  {
    icon: Sparkles,
    name: "Exosomes",
    label: "Extracellular Vesicles",
    description:
      "Next-generation cell-to-cell communication particles that accelerate skin renewal and reduce inflammation.",
  },
  {
    icon: Droplets,
    name: "VEGF",
    label: "Vascular Endothelial Growth Factor",
    description:
      "Promotes microcirculation and angiogenesis, delivering vital nutrients to treated tissue.",
  },
  {
    icon: Shield,
    name: "Glutathione",
    label: "Master Antioxidant",
    description:
      "Inhibits melanin production while neutralising free radicals for a luminous, even complexion.",
  },
]

function getProductImage(product: Product): string | null {
  if (product.product_media && product.product_media.length > 0) {
    const sorted = [...product.product_media].sort((a, b) => a.position - b.position)
    return sorted[0].url
  }
  return product.image_url || null
}

export default async function VeluriaPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("*, product_media(*)")
    .eq("category", "veluria")
    .eq("is_active", true)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Veluria: error fetching products:", error)
  }

  const veluriaProducts: Product[] = products || []

  return (
    <div className="min-h-screen bg-[#0E0B1F] text-white font-[var(--font-geist-sans)]">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0E0B1F]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-[0.2em] text-white uppercase">
            Veluria
          </span>
          <span className="hidden sm:block text-white/30 text-sm">by PB Serum</span>
        </div>
        <div className="flex items-center gap-5">
          <VeluriaCartHeaderButton />
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Sirona
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* Gradient background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#2D2654] opacity-40 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/20 rounded-full blur-[100px]" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#2D2654]/60 rounded-full blur-[80px]" />
        </div>

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" />
            Cosmetic Bioremodeling by PB Serum
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="block text-white">VELURIA</span>
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #F5D98B 40%, #C9A84C 100%)",
              }}
            >
              Bioremodel
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            A professional-grade bioremodeling line engineered with PDRN, Exosomes, VEGF and
            Glutathione — delivering measurable skin transformation from within.
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #F5D98B)",
              color: "#0E0B1F",
            }}
          >
            Explore the Range
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ── Promotions ── */}
      {veluriaProducts.length > 0 && (() => {
        const regularTotal = veluriaProducts.reduce((s, p) => s + p.price, 0)
        const bundleSaving = regularTotal > 350 ? regularTotal - 350 : null
        return (
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Offer 1 — 10% off any single product */}
              <div className="relative rounded-3xl overflow-hidden border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-7 flex flex-col gap-4">
                {/* Corner badge */}
                <span className="absolute top-5 right-5 bg-[#C9A84C] text-[#0E0B1F] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Limited Offer
                </span>

                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #2D2654, #C9A84C40)" }}>
                  <Tag className="w-5 h-5 text-[#C9A84C]" />
                </div>

                <div>
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-1">Single Product Deal</p>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    10% Off<br />Any Product
                  </h3>
                </div>

                <p className="text-white/50 text-sm leading-relaxed flex-grow">
                  Buy any single Veluria product today and save 10% instantly.
                  Discounted prices are already reflected on every product below.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">Applied automatically — no code needed</span>
                </div>
              </div>

              {/* Offer 2 — Bundle all products for £350 */}
              <div className="relative rounded-3xl overflow-hidden border border-[#C9A84C]/30 p-7 flex flex-col gap-4"
                style={{ background: "linear-gradient(135deg, #2D2654 0%, #1A1535 100%)" }}>
                <span className="absolute top-5 right-5 bg-[#C9A84C] text-[#0E0B1F] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Best Value
                </span>

                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #F5D98B)" }}>
                  <Package className="w-5 h-5 text-[#0E0B1F]" />
                </div>

                <div>
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-1">Complete Bundle</p>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    All {veluriaProducts.length} Products<br />
                    <span style={{
                      backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      £350 Only
                    </span>
                  </h3>
                </div>

                <p className="text-white/50 text-sm leading-relaxed flex-grow">
                  Get the full Veluria bioremodeling collection in one order.
                  {bundleSaving && bundleSaving > 0
                    ? ` Save £${bundleSaving.toFixed(2)} compared to buying individually.`
                    : " One price for the complete professional range."}
                </p>

                <Link
                  href="/veluria/bundle"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #F5D98B)", color: "#0E0B1F" }}
                >
                  <Package className="w-4 h-4" />
                  Get the Bundle — £350
                </Link>
              </div>

            </div>
          </section>
        )
      })()}

      {/* ── Product Grid ── */}
      <section id="products" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-3">
              The Collection
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Veluria Solutions
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Each formula targets a distinct concern — from deep structural lifting to radiant
              pigment correction.
            </p>
          </div>

          {veluriaProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {veluriaProducts.map((product) => {
                const imageUrl = getProductImage(product)
                const productLink = `/veluria/${product.slug || product.id}`
                return (
                  <div
                    key={product.id}
                    className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#C9A84C]/50 transition-all duration-500 flex flex-col"
                  >
                    {/* Product image — clicking goes to detail page */}
                    <Link href={productLink} className="block relative aspect-square bg-[#1A1535] overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div
                              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                              style={{
                                background: "linear-gradient(135deg, #2D2654, #C9A84C30)",
                              }}
                            >
                              <Sparkles className="w-7 h-7 text-[#C9A84C]" />
                            </div>
                            <span className="text-white/30 text-xs uppercase tracking-wider">
                              Veluria
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B1F]/60 via-transparent to-transparent" />
                    </Link>

                    {/* Card body */}
                    <div className="p-6 flex flex-col flex-grow">
                      <Link href={productLink}>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#F5D98B] transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>

                      {product.key_ingredients && (
                        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wider mb-2">
                          {product.key_ingredients}
                        </p>
                      )}

                      <p className="text-white/50 text-sm leading-relaxed flex-grow line-clamp-3 mb-4">
                        {product.short_description || product.description}
                      </p>

                      {/* Price — 10% off displayed */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-white/30 text-sm line-through">
                          £{product.price.toFixed(2)}
                        </span>
                        <span
                          className="text-2xl font-bold"
                          style={{
                            backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          £{(product.price * 0.9).toFixed(2)}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#C9A84C]/20 text-[#C9A84C] px-2 py-0.5 rounded-full">
                          -10%
                        </span>
                      </div>

                      <VeluriaAddToCartButton
                        product={{
                          id: product.id,
                          name: product.name,
                          price: Math.round(product.price * 0.9 * 100) / 100,
                          image_url: imageUrl || "",
                        }}
                      />

                      {/* View Details link */}
                      <Link
                        href={productLink}
                        className="mt-3 text-center text-xs font-semibold text-white/40 hover:text-[#C9A84C] transition-colors uppercase tracking-widest"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Empty / Coming Soon state */
            <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2D2654, #C9A84C20)" }}
              >
                <Sparkles className="w-9 h-9 text-[#C9A84C]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
              <p className="text-white/40 max-w-sm mx-auto text-sm leading-relaxed">
                The Veluria collection is being prepared for launch. Contact us to be first to
                access these products.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
              >
                Get Notified
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Science / Technology Section ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1535]/60" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Collagenase spotlight */}
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Core Technology
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Collagenase G&H
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                  }}
                >
                  Enzyme Complex
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                At the heart of every Veluria formulation lies the proprietary Collagenase G&H
                enzyme complex — a precision bioremodeling agent that selectively dissolves
                disorganised collagen fibres while preserving healthy structural matrix.
              </p>
              <p className="text-white/60 leading-relaxed">
                This controlled enzymatic action creates the ideal microenvironment for
                neo-collagenesis, enabling the skin's own regenerative processes to rebuild
                denser, more organised collagen networks for lasting volumetric improvement.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Bioremodeling", "Neo-Collagenesis", "Enzymatic Action", "Structural Repair"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-xs font-semibold border border-[#C9A84C]/30 text-[#C9A84C]/80 bg-[#C9A84C]/5"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right — Key actives grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCIENCE_ACTIVES.map(({ icon: Icon, name, label, description }) => (
                <div
                  key={name}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, #2D2654, #C9A84C30)" }}
                  >
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <p className="text-white font-bold text-base mb-1">{name}</p>
                  <p className="text-[#C9A84C]/60 text-xs uppercase tracking-wider mb-3">
                    {label}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
