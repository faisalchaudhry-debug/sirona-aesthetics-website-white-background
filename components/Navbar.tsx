import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ShoppingCart, User } from 'lucide-react'
import CartBadge from './CartBadge'
import UserMenu from './UserMenu'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container-custom flex justify-between items-center h-16">
                <Link href="/" className="flex items-center">
                    <img
                        src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/5cex07u4g1_1765985064905.png"
                        alt="Sirona Aesthetics Logo"
                        className="h-12 w-auto"
                    />
                </Link>

                <div className="hidden md:flex space-x-8">
                    <Link href="/products" className="text-gray-700 hover:text-primary font-medium transition-colors">Products</Link>
                    <Link href="/ukrp" className="text-gray-700 hover:text-primary font-medium transition-colors">UKRP</Link>
                    <Link href="/training" className="text-gray-700 hover:text-primary font-medium transition-colors">Training</Link>
                    <Link href="/blogs" className="text-gray-700 hover:text-primary font-medium transition-colors">Blogs</Link>
                    <Link href="/about" className="text-gray-700 hover:text-primary font-medium transition-colors">About Us</Link>
                    <Link href="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</Link>
                </div>

                <div className="flex items-center space-x-6">
                    <CartBadge />

                    {user ? (
                        <UserMenu />
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-700 hover:text-primary font-medium transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:opacity-90 transition-all">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
