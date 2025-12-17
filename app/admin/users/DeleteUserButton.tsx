'use client'

import { deleteUser } from '@/app/admin/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2 } from 'lucide-react'

export default function DeleteUserButton({ userId, redirectTo }: { userId: string, redirectTo?: string }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault() // Prevent form submission if inside a form
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        try {
            const result = await deleteUser(userId)
            if (result?.error) {
                alert('Error deleting user: ' + result.error)
            } else {
                if (redirectTo) {
                    router.push(redirectTo)
                }
            }
        } catch (error) {
            console.error('Delete failed:', error)
            alert('Failed to delete user')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isDeleting ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4 mr-1.5" />
            )}
            Delete
        </button>
    )
}
