import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function BlogSidebar() {
    return (
        <div className="space-y-8 sticky top-24">
            {/* Discover Products Widget */}
            <div className="bg-[#131B3A]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-3">
                    Discover Sirona Products
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Explore our range of science-backed, enzyme-driven aesthetic solutions.
                </p>
                <Link
                    href="/products"
                    className="block w-full py-3 px-4 bg-white text-[#0B1121] text-center font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                    View Products
                </Link>
            </div>

            {/* Newsletter / Contact Widget (Optional placeholder based on design) */}
            <div className="bg-gradient-to-br from-[#d946ef]/20 to-[#131B3A]/50 border border-[#d946ef]/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                    Need help with compliance?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                    Our dedicated team can guide you through the entire process.
                </p>
                <Link
                    href="/ukrp"
                    className="flex items-center text-[#d946ef] text-sm font-bold hover:underline"
                >
                    Learn about our UKRP Services <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    )
}
