import { Shield, FileCheck, Globe, AlertCircle, CheckCircle, Scale, Stethoscope, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function UKRPPage() {
    return (
        <div className="bg-[#2D2654] min-h-screen font-sans selection:bg-accent selection:text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden text-center">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A1433] to-[#2D2654] pointer-events-none"></div>
                <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-secondary text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                            Compliance Solutions
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
                            UK Responsible <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#4ADE80]">Person (UKRP)</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                            Stay compliant and expand into the UK market with confidence. Sirona streamlines UK cosmetics responsibilities so you can focus on clinical results.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact" className="inline-flex justify-center items-center px-10 py-4 bg-secondary hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:scale-105">
                                Book a Call
                            </Link>
                            <a href="#how-it-works" className="inline-flex justify-center items-center px-10 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                                How It Works
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is UKRP Section */}
            <section className="py-24 bg-white relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-sirona-navy mb-8">
                                What is <span className="text-secondary">UKRP?</span>
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
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 mr-3">
                                            <CheckCircle className="w-4 h-4 text-secondary" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                <h4 className="font-bold text-sirona-navy mb-2 flex items-center">
                                    <Shield className="w-5 h-5 text-accent mr-2" />
                                    Why UKRP Matters
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Compliance isn't just about ticking boxes. It builds trust, protects patients, and opens doors to new opportunities in the UK aesthetics market.
                                </p>
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-accent rounded-[2rem] blur-2xl opacity-10 transform rotate-3"></div>
                            <div className="bg-white text-gray-900 p-10 rounded-[2rem] relative border border-gray-100 shadow-2xl">
                                <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Compliance Status</p>
                                        <p className="text-2xl font-bold text-[#4ade80] flex items-center">
                                            Active & Monitored <span className="w-2 h-2 rounded-full bg-[#4ade80] ml-3 animate-pulse"></span>
                                        </p>
                                    </div>
                                    <Shield className="w-12 h-12 text-secondary opacity-50" />
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <FileCheck className="w-5 h-5 text-accent mr-3" />
                                            <div>
                                                <p className="font-bold text-sirona-navy">Documentation</p>
                                                <p className="text-xs text-gray-500">PIF & Safety Data</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] text-xs font-bold border border-[#fbbf24]/20">In Review</span>
                                    </div>

                                    <div className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <Globe className="w-5 h-5 text-secondary mr-3" />
                                            <div>
                                                <p className="font-bold text-sirona-navy">CPSR Report</p>
                                                <p className="text-xs text-gray-500">Safety Assessment</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 text-[#4ade80] text-xs font-bold border border-[#4ade80]/20">Verified</span>
                                    </div>

                                    <div className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <AlertCircle className="w-5 h-5 text-[#a855f7] mr-3" />
                                            <div>
                                                <p className="font-bold text-sirona-navy">Vigilance</p>
                                                <p className="text-xs text-gray-500">24/7 Monitoring</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20">Active</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <Link href="/contact" className="text-sm font-bold text-center block text-gray-400 hover:text-sirona-navy transition-colors group">
                                        Talk to Compliance <ArrowRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Sirona Section */}
            <section className="py-24 bg-[#F8FAFC] relative">
                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-sirona-navy mb-6">
                            Why Choose <span className="text-secondary">Sirona</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <Scale className="w-6 h-6 text-[#fbbf24]" />
                            </div>
                            <h3 className="text-xl font-bold text-sirona-navy mb-3">Regulatory Expertise</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Experienced oversight across documentation, submissions, and vigilance. We navigate the complex legal landscape so you don't have to.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <CheckCircle className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-sirona-navy mb-3">Streamlined Process</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Clear checklists, defined timelines, responsive communication—no guesswork. We make compliance a predictable, manageable process.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <Stethoscope className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-sirona-navy mb-3">Clinical Lens</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Aesthetics-focused guidance that respects professional practice and patient safety. We understand the products, not just the paperwork.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-white text-sirona-navy relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                            Process
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            How It <span className="text-secondary">Works</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
                                <div className="text-7xl font-bold text-gray-100 absolute -top-6 -left-4 z-0 transition-colors group-hover:text-gray-200">
                                    {item.step}
                                </div>
                                <div className="relative z-10 pl-6 pt-4">
                                    <div className="w-1 h-12 bg-gradient-to-b from-secondary to-transparent absolute left-0 top-6 rounded-full"></div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors text-sirona-navy">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="container-custom">
                    <div className="bg-[#2D2654] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/10 shadow-xl">
                        {/* Decorations */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Get <span className="text-secondary">Compliant?</span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                                Book a free consultation with Sirona today and take the first step towards effortless UK compliance.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact" className="inline-flex justify-center items-center px-10 py-5 bg-secondary hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:scale-105 text-lg">
                                    <Phone className="w-5 h-5 mr-3" />
                                    Book a Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

