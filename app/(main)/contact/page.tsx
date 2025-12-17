import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react'

export const metadata = {
    title: 'Contact Us | Sirona Aesthetics',
    description: 'Get in touch with our team for product inquiries and support.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0A1128] text-white selection:bg-accent selection:text-white">

            {/* Header */}
            <section className="pt-40 pb-10 container-custom text-center">
                <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
                <p className="text-xl text-gray-400 max-w-xl mx-auto">
                    Our support team is here to assist clinics and practitioners.
                </p>
            </section>

            <section className="py-12 pb-24">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Contact Info Side */}
                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Headquarters</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Sirona Aesthetics HQ<br />
                                            Business Bay, Building 4<br />
                                            Dubai, United Arab Emirates
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                        <p className="text-gray-400 mb-4">For general inquiries and support.</p>
                                        <a href="mailto:info@sirona-aesthetics.com" className="text-white font-semibold hover:text-accent transition-colors">
                                            info@sirona-aesthetics.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Call Us</h3>
                                        <p className="text-gray-400 mb-4">Mon-Fri from 9am to 6pm.</p>
                                        <a href="tel:+971500000000" className="text-white font-semibold hover:text-green-400 transition-colors">
                                            +971 50 000 0000
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="bg-[#131B3A] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">First Name</label>
                                        <input type="text" className="w-full bg-[#0A1128] border border-white/10 rounded-xl px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Last Name</label>
                                        <input type="text" className="w-full bg-[#0A1128] border border-white/10 rounded-xl px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                                    <input type="email" className="w-full bg-[#0A1128] border border-white/10 rounded-xl px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="john@clinic.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Subject</label>
                                    <select className="w-full bg-[#0A1128] border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                                        <option>General Inquiry</option>
                                        <option>Product Support</option>
                                        <option>Training Request</option>
                                        <option>Wholesale/Distribution</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Message</label>
                                    <textarea rows={4} className="w-full bg-[#0A1128] border border-white/10 rounded-xl px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="button" className="w-full py-4 bg-gradient-to-r from-accent to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-accent/25 hover:opacity-90 transition-all flex items-center justify-center">
                                    Send Message <Send className="ml-2 w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
