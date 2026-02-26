'use client'

import { useState, useTransition, Fragment } from 'react'
import { updateWebinarRegistration, deleteWebinarRegistration } from './actions'
import { Pencil, Trash2, X, Save, Loader2, Mail, Phone, Building } from 'lucide-react'

interface Registration {
    id: string
    full_name: string | null
    email: string | null
    phone: string | null
    clinic_name: string | null
    message: string | null
    created_at: string
}

interface EditState {
    id: string
    full_name: string
    email: string
    phone: string
    clinic_name: string
    message: string
    saving: boolean
    error: string
}

export default function RegistrationsClient({ registrations }: { registrations: Registration[] }) {
    const [editing, setEditing] = useState<EditState | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [, startTransition] = useTransition()

    const startEdit = (reg: Registration) => {
        setEditing({
            id: reg.id,
            full_name: reg.full_name || '',
            email: reg.email || '',
            phone: reg.phone || '',
            clinic_name: reg.clinic_name || '',
            message: reg.message || '',
            saving: false,
            error: '',
        })
    }

    const cancelEdit = () => setEditing(null)

    const saveEdit = () => {
        if (!editing) return
        setEditing((e) => e ? { ...e, saving: true, error: '' } : e)
        startTransition(async () => {
            const result = await updateWebinarRegistration(
                editing.id,
                editing.full_name,
                editing.email,
                editing.phone,
                editing.clinic_name,
                editing.message,
            )
            if (result?.error) {
                setEditing((e) => e ? { ...e, saving: false, error: result.error! } : e)
            } else {
                setEditing(null)
            }
        })
    }

    const handleDelete = (id: string, name: string | null) => {
        if (!confirm(`Delete registration for ${name || 'this user'}? This cannot be undone.`)) return
        setDeletingId(id)
        startTransition(async () => {
            await deleteWebinarRegistration(id)
            setDeletingId(null)
        })
    }

    if (registrations.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-12 text-center text-gray-500">
                No registrations found yet.
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clinic</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {registrations.map((reg) => {
                            const isEditingThis = editing?.id === reg.id
                            return (
                                <Fragment key={reg.id}>
                                    {/* Main row */}
                                    <tr
                                        className={`transition-colors ${isEditingThis ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(reg.created_at).toLocaleDateString()}
                                            <span className="text-xs text-gray-400 block mt-0.5">
                                                {new Date(reg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-3 shrink-0">
                                                    {reg.full_name?.charAt(0) || '?'}
                                                </div>
                                                <span className="font-medium text-gray-900">{reg.full_name || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Mail className="w-3 h-3 mr-2 text-gray-400 shrink-0" />
                                                {reg.email || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                            {reg.phone ? (
                                                <div className="flex items-center">
                                                    <Phone className="w-3 h-3 mr-2 text-gray-400 shrink-0" />
                                                    {reg.phone}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {reg.clinic_name ? (
                                                <div className="flex items-center">
                                                    <Building className="w-3 h-3 mr-2 text-gray-400 shrink-0" />
                                                    {reg.clinic_name}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={reg.message || ''}>
                                            {reg.message || <span className="text-gray-400 italic">-</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => isEditingThis ? cancelEdit() : startEdit(reg)}
                                                    className={`p-1.5 rounded-lg transition-colors ${
                                                        isEditingThis
                                                            ? 'text-blue-500 bg-blue-100 hover:bg-blue-200'
                                                            : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                                                    }`}
                                                    title={isEditingThis ? 'Cancel edit' : 'Edit registration'}
                                                >
                                                    {isEditingThis
                                                        ? <X className="w-4 h-4" />
                                                        : <Pencil className="w-4 h-4" />
                                                    }
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(reg.id, reg.full_name)}
                                                    disabled={deletingId === reg.id || isEditingThis}
                                                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-30"
                                                    title="Delete registration"
                                                >
                                                    {deletingId === reg.id
                                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                                        : <Trash2 className="w-4 h-4" />
                                                    }
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Inline edit row */}
                                    {isEditingThis && editing && (
                                        <tr className="bg-blue-50/30">
                                            <td colSpan={7} className="px-6 py-5">
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                                                            <input
                                                                type="text"
                                                                value={editing.full_name}
                                                                onChange={(e) => setEditing((s) => s ? { ...s, full_name: e.target.value } : s)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                                                            <input
                                                                type="email"
                                                                value={editing.email}
                                                                onChange={(e) => setEditing((s) => s ? { ...s, email: e.target.value } : s)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                                                            <input
                                                                type="tel"
                                                                value={editing.phone}
                                                                onChange={(e) => setEditing((s) => s ? { ...s, phone: e.target.value } : s)}
                                                                placeholder="+44 7700 900000"
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Clinic / Practice</label>
                                                            <input
                                                                type="text"
                                                                value={editing.clinic_name}
                                                                onChange={(e) => setEditing((s) => s ? { ...s, clinic_name: e.target.value } : s)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
                                                            <input
                                                                type="text"
                                                                value={editing.message}
                                                                onChange={(e) => setEditing((s) => s ? { ...s, message: e.target.value } : s)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    {editing.error && (
                                                        <p className="text-red-600 text-xs bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                                                            {editing.error}
                                                        </p>
                                                    )}

                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={cancelEdit}
                                                            className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-xs transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={saveEdit}
                                                            disabled={editing.saving}
                                                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                                                        >
                                                            {editing.saving
                                                                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                                                                : <><Save className="w-3.5 h-3.5" /> Save Changes</>
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
