import { Shield, FileCheck, Globe, AlertCircle, CheckCircle, Scale, Clock, Stethoscope, ChevronRight, Phone } from 'lucide-react'
import Link from 'next/link'

export default function UKRPPage() {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative bg-[#0B1121] text-white py-24 md:py-32 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#131B3A] to-transparent opacity-50"></div>
                <div className="absolute top-10 left-10 w-64 h-64 bg-[#38bdf8] rounded-full filter blur-[100px] opacity-10"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#d946ef] rounded-full filter blur-[100px] opacity-10"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] text-xs font-bold uppercase tracking-wider mb-6 border border-[#38bdf8]/20">
                            Compliance Solutions
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            UK Responsible <span className="text-[#38bdf8]">Person</span> (UKRP)
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                            Stay compliant and expand into the UK market with confidence. Sirona streamlines UK cosmetics responsibilities so you can focus on clinical results.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0B1121] font-bold rounded-lg transition-all shadow-lg shadow-[#38bdf8]/25">
                                Book a Call
                            </Link>
                            <a href="#how-it-works" className="inline-flex justify-center items-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-all">
                                How It Works
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is UKRP Section */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#131B3A] mb-6">
                                What is <span className="text-[#38bdf8]">UKRP?</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                A UK Responsible Person is the legally designated entity ensuring cosmetic products comply with UK regulations. They act as your compliance representative to authorities, protecting your brand and ensuring uninterrupted market access.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Maintain Product Information Files (PIF)",
                                    "Ensure Cosmetic Product Safety Reports (CPSR)",
                                    "Notify products on the UK portal (OPSS)",
                                    "Label & claims compliance",
                                    "Adverse event reporting & vigilance"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-[#131B3A]/10 flex items-center justify-center mt-0.5 mr-3">
                                            <CheckCircle className="w-4 h-4 text-[#131B3A]" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-[#131B3A] mb-2 flex items-center">
                                    <Shield className="w-5 h-5 text-[#d946ef] mr-2" />
                                    Why UKRP Matters
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Compliance isn't just about ticking boxes. It builds trust, protects patients, and opens doors to new opportunities in the UK aesthetics market.
                                </p>
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#38bdf8] to-[#d946ef] rounded-3xl opacity-10 transform rotate-3"></div>
                            <div className="bg-[#131B3A] text-white p-8 rounded-3xl relative shadow-xl">
                                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Compliance Status</p>
                                        <p className="text-2xl font-bold text-[#4ade80] flex items-center">
                                            Active & Monitored <span className="w-2 h-2 rounded-full bg-[#4ade80] ml-3 animate-pulse"></span>
                                        </p>
                                    </div>
                                    <Shield className="w-12 h-12 text-[#38bdf8] opacity-50" />
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FileCheck className="w-5 h-5 text-[#d946ef] mr-3" />
                                            <div>
                                                <p className="font-bold">Documentation</p>
                                                <p className="text-xs text-gray-400">PIF & Safety Data</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] text-xs font-bold">In Review</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Globe className="w-5 h-5 text-[#38bdf8] mr-3" />
                                            <div>
                                                <p className="font-bold">CPSR Report</p>
                                                <p className="text-xs text-gray-400">Safety Assessment</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-xs font-bold">Verified</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <AlertCircle className="w-5 h-5 text-[#a855f7] mr-3" />
                                            <div>
                                                <p className="font-bold">Vigilance</p>
                                                <p className="text-xs text-gray-400">24/7 Monitoring</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold">Active</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <Link href="/contact" className="text-sm font-bold text-center block text-white/50 hover:text-white transition-colors">
                                        Talk to Compliance →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Sirona Section */}
            <section className="py-24 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#131B3A] mb-4">
                            Why Choose <span className="text-[#38bdf8]">Sirona</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="w-12 h-12 rounded-xl bg-[#131B3A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Scale className="w-6 h-6 text-[#fbbf24]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#131B3A] mb-3">Regulatory Expertise</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Experienced oversight across documentation, submissions, and vigilance. We navigate the complex legal landscape so you don't have to.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="w-12 h-12 rounded-xl bg-[#131B3A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-6 h-6 text-[#38bdf8]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#131B3A] mb-3">Streamlined Process</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Clear checklists, defined timelines, responsive communication—no guesswork. We make compliance a predictable, manageable process.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="w-12 h-12 rounded-xl bg-[#131B3A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Stethoscope className="w-6 h-6 text-[#d946ef]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#131B3A] mb-3">Clinical Lens</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Aesthetics-focused guidance that respects professional practice and patient safety. We understand the products, not just the paperwork.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-[#131B3A] text-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-[#38bdf8] text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                            Process
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            How It <span className="text-[#38bdf8]">Works</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Your path to UK compliance in four simple steps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Intro Call",
                                desc: "Discuss your product lineup, markets, and timelines."
                            },
                            {
                                step: "02",
                                title: "Document Intake",
                                desc: "We collect formulas, safety reports, labels, and claims."
                            },
                            {
                                step: "03",
                                title: "Compliance Setup",
                                desc: "PIF/CPSR assembly, OPSS notifications, and adjustments."
                            },
                            {
                                step: "04",
                                title: "Ongoing Support",
                                desc: "Label updates, incident handling, and continuous monitoring."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative group">
                                <div className="text-6xl font-bold text-white/5 absolute -top-4 -left-2 z-0 group-hover:text-white/10 transition-colors">
                                    {item.step}
                                </div>
                                <div className="relative z-10 pl-6 pt-4">
                                    <div className="w-2 h-12 bg-gradient-to-b from-[#38bdf8] to-transparent absolute left-0 top-6 rounded-full"></div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#38bdf8] transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container-custom">
                    <div className="bg-[#131B3A] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        {/* Decorations */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d946ef] rounded-full filter blur-[150px] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38bdf8] rounded-full filter blur-[150px] opacity-20"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Get <span className="text-[#38bdf8]">Compliant?</span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                                Book a free consultation with Sirona today and take the first step towards effortless UK compliance.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0B1121] font-bold rounded-lg transition-all shadow-lg shadow-[#38bdf8]/25 text-lg">
                                    <Phone className="w-5 h-5 mr-3" />
                                    Book a Free Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
