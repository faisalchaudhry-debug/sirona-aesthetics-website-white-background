import { Microscope, Hand, Award, Mail, ChevronRight, Calendar, User, Building, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import WebinarForm from './WebinarForm'

export default function TrainingPage() {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative bg-[#0B1121] text-white py-24 md:py-32 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#131B3A] to-transparent opacity-50"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#d946ef] rounded-full filter blur-[128px] opacity-20"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-[#d946ef]/10 text-[#d946ef] text-xs font-bold uppercase tracking-wider mb-6 border border-[#d946ef]/20">
                            Book Webinar
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Learn with <span className="text-[#d946ef]">Sirona</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                            Expert-led workshops and masterclasses designed for certified practitioners — practical, clinical, and results-driven.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#register" className="inline-flex justify-center items-center px-8 py-4 bg-[#d946ef] hover:bg-[#c026d3] text-white font-bold rounded-lg transition-all shadow-lg shadow-[#d946ef]/25">
                                Register Interest
                            </a>
                            <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-all">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Train with Sirona Section */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#131B3A] mb-4">
                            Why Train with <span className="text-[#d946ef]">Sirona?</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-[#131B3A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Microscope className="w-7 h-7 text-[#d946ef]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#131B3A] mb-3">Science-Led</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Grounded in evidence-based protocols and enzymatic innovation for clinical confidence.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-[#131B3A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Hand className="w-7 h-7 text-[#38bdf8]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#131B3A] mb-3">Hands-On</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Workshops designed to refine technique with practical skills you can apply immediately.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-[#131B3A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Award className="w-7 h-7 text-[#fbbf24]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#131B3A] mb-3">Certification</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Professional recognition that enhances trust, credibility, and patient outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Sessions & Form Section */}
            <section id="register" className="bg-[#131B3A] py-24 text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#d946ef] rounded-full filter blur-[150px] opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38bdf8] rounded-full filter blur-[150px] opacity-10"></div>

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left Column: Upcoming Sessions */}
                        <div>
                            <h2 className="text-3xl font-bold mb-8 flex items-center">
                                <Calendar className="w-8 h-8 mr-3 text-[#d946ef]" />
                                Upcoming Training Sessions
                            </h2>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Calendar className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No Sessions Currently Open</h3>
                                <p className="text-gray-400 max-w-sm mx-auto">
                                    No sessions are open for booking right now. Join our list to be the first notified when new dates are announced.
                                </p>
                            </div>

                            <div className="mt-12 p-6 bg-[#d946ef]/10 rounded-xl border border-[#d946ef]/20">
                                <h4 className="font-bold text-[#d946ef] mb-2">Want a private workshop?</h4>
                                <p className="text-gray-300 text-sm mb-4">
                                    We offer bespoke in-clinic training for teams of 4 or more.
                                </p>
                                <Link href="/contact" className="text-white text-sm font-bold underline hover:text-[#d946ef] transition-colors">
                                    Contact us to arrange →
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Waitlist Form */}
                        <div>
                            <h2 className="text-3xl font-bold mb-8">
                                Join the <span className="text-[#d946ef]">Waitlist</span>
                            </h2>

                            <WebinarForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
