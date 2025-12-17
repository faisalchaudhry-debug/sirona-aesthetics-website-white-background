import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-auto">
            <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="inline-block mb-4">
                        <img
                            src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/5cex07u4g1_1765985064905.png"
                            alt="Sirona Aesthetics Logo"
                            className="h-12 w-auto"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm">
                        Your partner in advanced tissue engineering and aesthetic solutions.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-secondary">Products</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><Link href="/products?category=pb-serum" className="hover:text-white">PB Serum</Link></li>
                        <li><Link href="/products?category=novacutan" className="hover:text-white">Novacutan</Link></li>
                        <li><Link href="/products?category=smartker" className="hover:text-white">Smartker</Link></li>
                        <li><Link href="/products?category=devices" className="hover:text-white">Devices</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-secondary">Company</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                        <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                        <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-secondary">Contact</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Email: info@sironaaesthetics.co.uk</li>
                        <li>Phone: +44 123 456 7890</li>
                        <li>London, United Kingdom</li>
                    </ul>
                </div>
            </div>
            <div className="container-custom mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Sirona Aesthetics. All rights reserved.
            </div>
        </footer>
    )
}
