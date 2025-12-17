import Link from 'next/link'
import { ArrowRight, Check, ShieldCheck, Star } from 'lucide-react'
import LatestBlogs from '@/components/LatestBlogs'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-accent selection:text-white overflow-x-hidden">

      {/* 1. Hero Section - Centered & Premium with Glow Effects */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-3000"></div>
          <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-sm font-medium tracking-[0.2em] text-gray-300 uppercase bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Next Generation Aesthetic Theory
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
            The Science of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-secondary">
              Bio-Remodeling
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Exclusive distributor of recombinant enzymes and tissue engineering solutions.
            We bridge the gap between medical science and aesthetic results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/products" className="group px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-[0_0_20px_rgba(236,0,140,0.4)] hover:shadow-[0_0_30px_rgba(236,0,140,0.6)] transition-all flex items-center">
              View Products <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors">
              Professional Access
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats Strip - Minimalist */}
      <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm py-12">
        <div className="container-custom">
          <div className="flex flex-wrap justify-between items-center text-center gap-8 md:gap-0">
            <div className="w-full md:w-1/3">
              <div className="text-4xl font-light text-white mb-2">100%</div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Authentic Enzymes</div>
            </div>
            <div className="w-full md:w-1/3 border-x border-white/5 px-8">
              <div className="text-4xl font-light text-white mb-2">Global</div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Distribution Network</div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="text-4xl font-light text-white mb-2">Clinical</div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Proven Efficacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Portfolio Section - Dark Cards */}
      {/* 3. Portfolio Section - Dark Cards */}
      <section className="py-24 relative bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1128] mb-4">Our <span className="text-accent">Portfolio</span></h2>
            <p className="text-gray-600 max-w-xl mx-auto">Curated solutions for fibrosis, localized fat reduction, and rejuvenation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#0F1420] border border-white/5 hover:border-accent/50 transition-colors duration-500">
              <div className="aspect-[4/5] bg-gradient-to-b from-blue-900/20 to-transparent relative p-8 flex flex-col justify-end">
                <div className="absolute inset-0 bg-[url('https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/m2g0mlzca6l_1765985406595.png')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-[#0F1420]/50 to-transparent"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">PB Serum</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">The versatility of recombinant enzymes for targeted treatments.</p>
                  <span className="text-accent text-sm font-bold uppercase tracking-wider flex items-center group-hover:translate-x-2 transition-transform cursor-pointer">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#0F1420] border border-white/5 hover:border-accent/50 transition-colors duration-500">
              <div className="aspect-[4/5] bg-gradient-to-b from-purple-900/20 to-transparent relative p-8 flex flex-col justify-end">
                <div className="absolute inset-0 bg-[url('https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/esxjq61117w_1765985399210.png')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-[#0F1420]/50 to-transparent"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Novacutan</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">Exo-protection technology targeting skin aging from an environmental level.</p>
                  <span className="text-accent text-sm font-bold uppercase tracking-wider flex items-center group-hover:translate-x-2 transition-transform cursor-pointer">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#0F1420] border border-white/5 hover:border-accent/50 transition-colors duration-500">
              <div className="aspect-[4/5] bg-gradient-to-b from-cyan-900/20 to-transparent relative p-8 flex flex-col justify-end">
                <div className="absolute inset-0 bg-[url('https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/fwghhcavb34_1765985413011.png')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-[#0F1420]/50 to-transparent"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Smartker</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">Post-procedure care extending the result of clinical treatments.</p>
                  <span className="text-accent text-sm font-bold uppercase tracking-wider flex items-center group-hover:translate-x-2 transition-transform cursor-pointer">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature / Context Section (Split) */}
      <section className="py-24 bg-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4 px-3 py-1 rounded bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-bold">
                Safety & Efficacy
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Redefining <br />
                <span className="text-gray-500">Aesthetic Standards</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We bridge the gap between medical science and aesthetic results. Our products are backed by rigorous clinical studies and designed for professional use.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Advanced Bio-Technology</h4>
                    <p className="text-sm text-gray-500">Innovations in recombinant enzymes and peptides.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Proven Safety Proifle</h4>
                    <p className="text-sm text-gray-500">Clinically proven results with minimal downtime.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-[#0F1420] border border-white/5 relative overflow-hidden flex items-center justify-center">
                {/* Placeholder for feature graphic */}
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4 animate-pulse">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Trusted by Doctors</h3>
                  <p className="text-gray-500 text-sm">Across the World</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Training Academy Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-transparent"></div>

        <div className="container-custom relative z-10 flex flex-col justify-center h-full">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Professional <span className="text-accent">Training Academy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mb-10">
            Master the art of enzymatic therapy and advanced bio-remodeling. Our expert-led workshops provide the hands-on experience and certification you need.
          </p>
          <div>
            <button className="bg-white text-[#0B0F19] px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg">
              Join Our Academy
            </button>
          </div>
        </div>
      </section>

      {/* 6. Latest Blogs */}
      <LatestBlogs />

    </div>
  )
}
