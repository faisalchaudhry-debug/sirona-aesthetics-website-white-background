import { Microscope, Hand, Award, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import WebinarForm from './WebinarForm'

export default function TrainingPage() {
    return (
        <div className="bg-[#2D2654] min-h-screen font-sans selection:bg-accent selection:text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden text-center">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A1433] to-[#2D2654] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-brand opacity-10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                            Professional Education
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
                            Master the Art of <br />
                            <span className="text-gradient-ocean">Bio-Remodeling</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                            Expert-led workshops and masterclasses designed for certified practitioners. Practical, clinical, and results-driven education to elevate your practice.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="#register" className="inline-flex justify-center items-center px-10 py-4 bg-gradient-brand text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(255,107,157,0.4)] hover:shadow-[0_0_50px_rgba(255,107,157,0.6)] hover:scale-105">
                                Register Interest
                            </a>
                            <Link href="/contact" className="inline-flex justify-center items-center px-10 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Train with Sirona Section */}
            <section className="py-24 bg-white relative">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-sirona-navy mb-6">
                            Why Train with <span className="text-accent">Sirona?</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                                <Microscope className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-sirona-navy mb-4">Science-Led</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Grounded in evidence-based protocols and enzymatic innovation. We focus on the "why" and "how" behind every treatment.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                                <Hand className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-sirona-navy mb-4">Hands-On</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Workshops designed to refine technique with practical skills you can apply immediately in your clinic.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-2xl bg-[#FFC837] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                                <Award className="w-8 h-8 text-[#1A1433]" />
                            </div>
                            <h3 className="text-2xl font-bold text-sirona-navy mb-4">Certification</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Receive professional certification that enhances trust, credibility, and patient outcomes for your practice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Sessions & Form Section */}
            <section id="register" className="py-24 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left Column: Upcoming Sessions */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <Calendar className="w-6 h-6 text-accent" />
                                </span>
                                <h2 className="text-3xl font-bold text-white">
                                    Upcoming Sessions
                                </h2>
                            </div>

                            <div className="bg-[#1A1433] border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Calendar className="w-10 h-10 text-gray-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">No Sessions Currently Open</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto mb-8">
                                        No public sessions are open for booking right now. Join our waitlist to be notified first.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-gradient-to-br from-[#d946ef]/20 to-transparent rounded-3xl border border-[#d946ef]/30">
                                <h4 className="text-xl font-bold text-white mb-2">Want a private workshop?</h4>
                                <p className="text-gray-300 mb-6">
                                    We offer bespoke in-clinic training for teams of 4 or more.
                                </p>
                                <Link href="/contact" className="inline-flex items-center text-accent font-bold hover:text-white transition-colors">
                                    Contact us to arrange <ChevronRight className="w-5 h-5 ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Waitlist Form */}
                        <div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Join the <span className="text-accent">Waitlist</span>
                                </h2>
                                <p className="text-gray-400">Be the first to know when new training dates are released.</p>
                            </div>

                            <WebinarForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

