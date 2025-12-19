import Link from 'next/link'
import { Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#1A1433] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                    <Link href="/" className="inline-block mb-6">
                        <img
                            src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/5cex07u4g1_1765985064905.png"
                            alt="Sirona Aesthetics Logo"
                            className="h-10 w-auto"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Your partner in advanced tissue engineering and aesthetic solutions. We bring the future of bio-remodeling to your clinic today.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-brand transition-all">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-brand transition-all">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-white text-lg">Products</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="/products?category=pb-serum" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> PB Serum</Link></li>
                        <li><Link href="/products?category=novacutan" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> Novacutan</Link></li>
                        <li><Link href="/products?category=smartker" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> Smartker</Link></li>
                        <li><Link href="/products?category=devices" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/20"></span> Devices</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                        <li><Link href="/ukrp" className="hover:text-accent transition-colors">UKRP</Link></li>
                        <li><Link href="/training" className="hover:text-accent transition-colors">Training</Link></li>
                        <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-white text-lg">Contact</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex items-start gap-3">
                            <span className="text-accent">Email:</span>
                            <span className="text-white">info@sironaaesthetics.co.uk</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent">Phone:</span>
                            <span className="text-white">+44 123 456 7890</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent">Addr:</span>
                            <span className="text-white">London, United Kingdom</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container-custom pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Sirona Aesthetics. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}

