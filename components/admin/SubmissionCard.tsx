'use client'

import { useState } from 'react'
import { Mail, Calendar, User, MapPin, Trash2, Edit2, CheckCircle, XCircle, Save, X } from 'lucide-react'
import { deleteContactSubmission, updateContactSubmission, ContactFormData } from '@/app/actions/contact'

type Submission = {
    id: string
    created_at: string
    first_name: string
    last_name: string
    email: string
    phone?: string
    subject?: string
    message: string
    source: string
    country?: string
    type?: string
    status: string
}

export default function SubmissionCard({ submission }: { submission: Submission }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Edit state
    const [editData, setEditData] = useState({
        firstName: submission.first_name,
        lastName: submission.last_name,
        email: submission.email,
        subject: submission.subject || '',
        message: submission.message,
        status: submission.status
    })

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this submission?')) return

        setIsDeleting(true)
        const result = await deleteContactSubmission(submission.id)
        if (!result.success) {
            alert('Failed to delete: ' + result.error)
            setIsDeleting(false)
        }
        // If success, the component will unmount/refresh via revalidatePath
    }

    const handleSave = async () => {
        setIsSaving(true)
        const result = await updateContactSubmission(submission.id, {
            ...editData,
            status: editData.status
        })

        setIsSaving(false)
        if (result.success) {
            setIsEditing(false)
        } else {
            alert('Failed to update: ' + result.error)
        }
    }

    const toggleStatus = async () => {
        const newStatus = submission.status === 'new' ? 'read' : 'new'
        await updateContactSubmission(submission.id, { status: newStatus })
    }

    if (isEditing) {
        return (
            <div className="p-6 bg-white border-l-4 border-yellow-400 shadow-sm animate-in fade-in">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-800">Edit Submission</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">First Name</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2 text-sm"
                            value={editData.firstName}
                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Last Name</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2 text-sm"
                            value={editData.lastName}
                            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2 text-sm"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Subject</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2 text-sm"
                            value={editData.subject}
                            onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                    <select
                        className="w-full border rounded p-2 text-sm"
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Message</label>
                    <textarea
                        rows={4}
                        className="w-full border rounded p-2 text-sm"
                        value={editData.message}
                        onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 flex items-center gap-2 text-sm font-bold"
                    >
                        {isSaving ? 'Saving...' : <>Save Changes <Save className="w-4 h-4" /></>}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`p-6 hover:bg-gray-50 transition-colors group relative ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex justify-between items-start mb-3 pr-20">
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleStatus}
                        className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 transition-opacity ${submission.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                        title="Click to toggle status"
                    >
                        {submission.status}
                    </button>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(submission.created_at).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}
                    </span>
                </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-1">{submission.subject || 'No Subject'}</h3>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {submission.first_name} {submission.last_name}
                </span>
                <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {submission.email}
                </span>
                {submission.country && (
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {submission.country}
                    </span>
                )}
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                {submission.message}
            </div>

            {submission.type && (
                <div className="mt-3 text-xs text-gray-500">
                    User Type: <span className="font-medium text-gray-700">{submission.type}</span>
                </div>
            )}
        </div>
    )
}
