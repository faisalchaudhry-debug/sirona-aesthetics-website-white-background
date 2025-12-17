import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Edit } from 'lucide-react'

export default async function AdminEditButton({ editUrl }: { editUrl: string }) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profile || profile.role !== 'admin') {
        return null
    }

    return (
        <Link
            href={editUrl}
            className="inline-flex items-center px-3 py-1 bg-gray-800 text-white text-xs font-bold rounded-md hover:bg-gray-700 transition-colors shadow-sm ml-4"
        >
            <Edit className="w-3 h-3 mr-1.5" />
            Edit
        </Link>
    )
}
