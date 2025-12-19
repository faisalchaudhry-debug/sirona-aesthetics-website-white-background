import { createClient } from '@/utils/supabase/server'
import UserManagement from '@/components/admin/UserManagement'

export const revalidate = 0



export default async function AdminUsersPage() {
    const supabase = await createClient()

    // Fetch all profiles
    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <UserManagement users={profiles || []} />
    )
}
