import { createClient } from '@/utils/supabase/server'
import CartBadge from './CartBadge'
import UserMenu from './UserMenu'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
    const supabase = await createClient()
    let user = null
    try {
        const { data } = await supabase.auth.getUser()
        user = data.user
    } catch (error) {
        console.error('Navbar user fetch error:', error)
    }

    return (
        <NavbarClient user={user}>
            <div className="flex items-center gap-4">
                <CartBadge />
                {user && <UserMenu />}
            </div>
        </NavbarClient>
    )
}

