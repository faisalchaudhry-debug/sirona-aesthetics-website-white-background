import Link from 'next/link'
import { Award, Globe, Users, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata = {
    title: 'About Us | Sirona Aesthetics',
    description: 'Pioneering the future of enzymatic therapy and aesthetic medicine.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0A1128] text-white selection:bg-accent selection:text-white">

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-block mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-sm font-medium tracking-[0.2em] uppercase text-secondary">
                            Our Vision
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600">Aesthetic</span> <br />
                        Excellence
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Sirona Aesthetics bridges the gap between scientific innovation and clinical application. We are the exclusive distributors of next-generation recombinant enzymology.
                    </p>
                </div>
            </section>

            {/* Stats/Credibility */}
            <section className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm block">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-4"><Award className="w-8 h-8 text-accent" /></div>
                            <div className="text-3xl font-bold mb-1">Top Tier</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">Global Partners</div>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4"><Users className="w-8 h-8 text-secondary" /></div>
                            <div className="text-3xl font-bold mb-1">500+</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">Network Clinics</div>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4"><Globe className="w-8 h-8 text-purple-500" /></div>
                            <div className="text-3xl font-bold mb-1">10+</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-4"><CheckCircle className="w-8 h-8 text-green-500" /></div>
                            <div className="text-3xl font-bold mb-1">100%</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">Safety Record</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 1 - White Background */}
            <section className="py-24 bg-white text-[#0A1128]">
                <div className="container-custom">
                    {/* Story 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-600 rounded-3xl blur-2xl opacity-20 transform -rotate-3"></div>
                            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
                                <div className="aspect-[4/3] bg-gray-100 relative">
                                    {/* Placeholder for About Image */}
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A1128]">The Science of <span className="text-accent">Transformation</span></h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                Founded by a team of medical professionals and biotechnologists, Sirona was born from a simple realization: the aesthetic market lacked consistent, scientifically-verified solutions for complex tissue remodeling.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We partnered with global leaders in recombinant enzymology to bring PB Serum to the region, changing how doctors approach fibrosis and anti-aging forever.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 2 - Dark Background */}
            {/* Content Section 2 - White Background */}
            <section className="py-24 bg-white text-[#0A1128]">
                <div className="container-custom">
                    {/* Story 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A1128]">Uncompromising <span className="text-secondary">Quality</span></h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                Our supply chain is our pride. In an industry plagued by gray market goods and improper storage, Sirona stands as a fortress of integrity.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Direct Manufacturer Partnerships',
                                    'End-to-End Cold Chain Logistics (2-8°C)',
                                    'Lot Tracking & Serial Verification',
                                    'Strict Professional-Only Access'
                                ].map((item) => (
                                    <li key={item} className="flex items-center text-gray-600">
                                        <span className="w-2 h-2 rounded-full bg-secondary mr-3"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-blue-600 rounded-3xl blur-2xl opacity-20 transform rotate-3"></div>
                            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
                                <div className="aspect-[4/3] bg-gray-100 relative">
                                    {/* Placeholder for Quality Image */}
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631217868269-dfc1c5ccae4d?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            {/* CTA */}
            <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-900 via-primary to-blue-900">
                <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-6">Join the Network</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Access the worlds most advanced aesthetic portfolio. Verified professionals only.
                    </p>
                    <Link href="/register" className="inline-flex items-center px-8 py-4 bg-white text-[#0A1128] font-bold rounded-full hover:bg-gray-100 transition-colors">
                        Apply for an Account <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>

        </div>
    )
}
