'use client'

import { deleteUser } from '@/app/admin/actions'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2, AlertTriangle, X } from 'lucide-react'

export default function DeleteUserButton({ userId, redirectTo }: { userId: string, redirectTo?: string }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [confirmText, setConfirmText] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const CONFIRM_WORD = 'confirm'

    // Focus input when modal opens
    useEffect(() => {
        if (showModal && inputRef.current) {
            inputRef.current.focus()
        }
    }, [showModal])

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showModal) {
                handleCloseModal()
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [showModal])

    const handleOpenModal = (e: React.MouseEvent) => {
        e.preventDefault()
        setShowModal(true)
        setConfirmText('')
        setError('')
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setConfirmText('')
        setError('')
    }

    const handleDelete = async () => {
        if (confirmText.toLowerCase() !== CONFIRM_WORD) {
            setError(`Please type "${CONFIRM_WORD}" to confirm deletion`)
            return
        }

        setIsDeleting(true)
        setError('')
        try {
            const result = await deleteUser(userId)
            if (result?.error) {
                setError('Error deleting user: ' + result.error)
                setIsDeleting(false)
            } else {
                handleCloseModal()
                if (redirectTo) {
                    router.push(redirectTo)
                }
            }
        } catch (error) {
            console.error('Delete failed:', error)
            setError('Failed to delete user. Please try again.')
            setIsDeleting(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && confirmText.toLowerCase() === CONFIRM_WORD) {
            handleDelete()
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={handleOpenModal}
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

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-gray-600 mb-4">
                                This action <span className="font-semibold text-red-600">cannot be undone</span>.
                                This will permanently delete the user account and all associated data.
                            </p>

                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                                <p className="text-sm text-red-700">
                                    To confirm deletion, please type <span className="font-bold">{CONFIRM_WORD}</span> below:
                                </p>
                            </div>

                            <input
                                ref={inputRef}
                                type="text"
                                value={confirmText}
                                onChange={(e) => {
                                    setConfirmText(e.target.value)
                                    setError('')
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={`Type "${CONFIRM_WORD}" to proceed`}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                                disabled={isDeleting}
                            />

                            {error && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertTriangle className="w-4 h-4" />
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 p-4 bg-gray-50 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting || confirmText.toLowerCase() !== CONFIRM_WORD}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete User
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
