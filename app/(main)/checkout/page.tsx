import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CheckoutForm from './CheckoutForm'

export default async function CheckoutPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login?message=Please log in to checkout')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) {
        // Should not happen for authenticated users usually
        return <div>Error loading profile</div>
    }

    return <CheckoutForm userProfile={profile} />
}
