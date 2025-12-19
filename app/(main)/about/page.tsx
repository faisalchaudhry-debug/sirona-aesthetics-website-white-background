import Link from 'next/link'
import Image from 'next/image'
import { Award, Globe, Users, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata = {
    title: 'About Us | Sirona Aesthetics',
    description: 'Pioneering the future of enzymatic therapy and aesthetic medicine.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#2D2654] text-white selection:bg-accent selection:text-white font-sans">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A1433] to-[#2D2654] pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent rounded-full blur-[150px] opacity-20 mix-blend-screen animate-pulse pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="inline-block mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-accent">
                            Our Vision
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Pioneering <span className="text-transparent bg-clip-text bg-gradient-brand">Aesthetic</span> <br />
                        Excellence
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        Sirona Aesthetics bridges the gap between scientific innovation and clinical application. We are the exclusive distributors of next-generation recombinant enzymology.
                    </p>
                </div>
            </section>

            {/* Stats/Credibility */}
            <section className="py-16 border-y border-white/5 bg-[#1A1433]/50 backdrop-blur-sm block">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        <div className="text-center group">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <Award className="w-8 h-8 text-accent" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2 text-white">Top Tier</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400 font-bold">Global Partners</div>
                        </div>
                        <div className="text-center group">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                    <Users className="w-8 h-8 text-secondary" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2 text-white">500+</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400 font-bold">Network Clinics</div>
                        </div>
                        <div className="text-center group">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#a855f7]/20 transition-colors">
                                    <Globe className="w-8 h-8 text-[#a855f7]" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2 text-white">10+</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400 font-bold">Countries</div>
                        </div>
                        <div className="text-center group">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2 text-white">100%</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400 font-bold">Safety Record</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 1 */}
            <section className="py-24 bg-white text-gray-900">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-[#a855f7] rounded-[2rem] blur-2xl opacity-20 transform -rotate-3"></div>
                            <div className="relative rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl">
                                <div className="aspect-[4/3] bg-gray-100 relative">
                                    <Image
                                        src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/dclofeobe7_1766162478500.webp"
                                        alt="The Science of Transformation"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-brand opacity-10 mix-blend-overlay"></div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">The Science of <span className="text-accent">Transformation</span></h2>
                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                Founded by a team of medical professionals and biotechnologists, Sirona was born from a simple realization: the aesthetic market lacked consistent, scientifically-verified solutions for complex tissue remodeling.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We partnered with global leaders in recombinant enzymology to bring PB Serum to the region, changing how doctors approach fibrosis and anti-aging forever.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 2 */}
            <section className="py-24 bg-white text-gray-900">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Uncompromising <span className="text-secondary">Quality</span></h2>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                Our supply chain is our pride. In an industry plagued by gray market goods and improper storage, Sirona stands as a fortress of integrity.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Direct Manufacturer Partnerships',
                                    'End-to-End Cold Chain Logistics (2-8°C)',
                                    'Lot Tracking & Serial Verification',
                                    'Strict Professional-Only Access'
                                ].map((item) => (
                                    <li key={item} className="flex items-center text-gray-700">
                                        <div className="w-2 h-2 rounded-full bg-secondary mr-4 box-content ring-4 ring-secondary/20"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-blue-600 rounded-[2rem] blur-2xl opacity-20 transform rotate-3"></div>
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                <div className="aspect-[4/3] bg-gray-900 relative">
                                    <Image
                                        src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/wdb766yljdf_1766162474551.webp"
                                        alt="Uncompromising Quality"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent mix-blend-overlay"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[#1A1433]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Join the Network</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                        Access the worlds most advanced aesthetic portfolio. Verified professionals only.
                    </p>
                    <Link href="/register" className="inline-flex items-center px-12 py-5 bg-gradient-brand text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(217,70,239,0.5)] transition-all hover:scale-105">
                        Apply for an Account <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>

        </div>
    )
}

