import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

export const metadata = {
    title: 'Contact Us | Sirona Aesthetics',
    description: 'Get in touch with our team for product inquiries and support.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#2D2654] text-white selection:bg-accent selection:text-white font-sans">

            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-brand opacity-10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-10 rounded-full blur-[150px]"></div>
            </div>

            {/* Header */}
            <section className="relative pt-32 pb-16 container-custom text-center z-10">
                <span className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                    Support & Inquiries
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Get in <span className="text-gradient-ocean">Touch</span></h1>
                <p className="text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
                    Our support team is here to assist clinics and practitioners. Reach out to us for any questions.
                </p>
            </section>

            <section className="relative py-12 pb-24 z-10">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Contact Info Side */}
                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                                <div className="flex items-start space-x-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1A1433] flex items-center justify-center shrink-0 border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 text-white">Headquarters</h3>
                                        <p className="text-gray-400 leading-relaxed text-lg">
                                            London, United Kingdom
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                                <div className="flex items-start space-x-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1A1433] flex items-center justify-center shrink-0 border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 text-white">Email Us</h3>
                                        <p className="text-gray-400 mb-4">For general inquiries and support.</p>
                                        <a href="mailto:info@sirona-aesthetics.com" className="text-xl font-bold text-white hover:text-accent transition-colors flex items-center">
                                            info@sirona-aesthetics.com <ArrowRight className="ml-2 w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                                <div className="flex items-start space-x-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1A1433] flex items-center justify-center shrink-0 border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 text-white">Call Us</h3>
                                        <p className="text-gray-400 mb-4">Mon-Fri from 9am to 6pm.</p>
                                        <a href="tel:+447727241711" className="text-xl font-bold text-white hover:text-green-400 transition-colors flex items-center">
                                            +44 7727 241711 <ArrowRight className="ml-2 w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <ContactForm />
                    </div>
                </div>
            </section>

        </div>
    )
}

