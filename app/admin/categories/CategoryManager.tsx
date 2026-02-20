'use client'

import { Fragment, useState, useTransition } from 'react'
import { createCategory, updateCategoryName, deleteCategory } from './actions'
import { Tag, Plus, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react'

interface Category {
    id: string
    name: string
    slug: string
    product_count: number
}

export default function CategoryManager({ categories }: { categories: Category[] }) {
    const [isPending, startTransition] = useTransition()

    // Add form state
    const [adding, setAdding] = useState(false)
    const [newName, setNewName] = useState('')
    const [addError, setAddError] = useState('')

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState('')
    const [editError, setEditError] = useState('')

    // Delete error
    const [deleteError, setDeleteError] = useState<Record<string, string>>({})

    const handleAdd = () => {
        if (!newName.trim()) { setAddError('Name is required'); return }
        setAddError('')
        const fd = new FormData()
        fd.append('name', newName.trim())
        startTransition(async () => {
            const result = await createCategory(fd)
            if (result?.error) { setAddError(result.error); return }
            setNewName('')
            setAdding(false)
        })
    }

    const handleEdit = (cat: Category) => {
        setEditingId(cat.id)
        setEditName(cat.name)
        setEditError('')
    }

    const handleEditSave = (id: string) => {
        if (!editName.trim()) { setEditError('Name is required'); return }
        setEditError('')
        const fd = new FormData()
        fd.append('id', id)
        fd.append('name', editName.trim())
        startTransition(async () => {
            const result = await updateCategoryName(fd)
            if (result?.error) { setEditError(result.error); return }
            setEditingId(null)
        })
    }

    const handleDelete = (id: string, name: string) => {
        if (!confirm(`Delete category "${name}"? This cannot be undone.`)) return
        setDeleteError(prev => ({ ...prev, [id]: '' }))
        startTransition(async () => {
            const result = await deleteCategory(id)
            if (result?.error) {
                setDeleteError(prev => ({ ...prev, [id]: result.error! }))
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage product categories. The slug is auto-generated from the name and used in product filters.
                    </p>
                </div>
                {!adding && (
                    <button
                        onClick={() => { setAdding(true); setAddError('') }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2D2654] text-white text-sm font-medium rounded-lg hover:bg-[#2D2654]/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Category
                    </button>
                )}
            </div>

            {/* Add Form */}
            {adding && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">New Category</h3>
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                                placeholder="e.g. PB Serum"
                                autoFocus
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2654]/30 focus:border-[#2D2654]"
                            />
                            {addError && <p className="text-red-500 text-xs mt-1">{addError}</p>}
                            {newName && (
                                <p className="text-gray-400 text-xs mt-1">
                                    Slug: <span className="font-mono">{newName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}</span>
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleAdd}
                            disabled={isPending}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#2D2654] text-white text-sm font-medium rounded-lg hover:bg-[#2D2654]/90 disabled:opacity-50 transition-colors"
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            Save
                        </button>
                        <button
                            onClick={() => { setAdding(false); setNewName(''); setAddError('') }}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Categories Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {categories.length === 0 ? (
                    <div className="py-16 text-center text-gray-400">
                        <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No categories yet</p>
                        <p className="text-sm mt-1">Click "Add Category" to create your first one.</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-5 py-3 font-semibold">Name</th>
                                <th className="px-5 py-3 font-semibold">Slug</th>
                                <th className="px-5 py-3 font-semibold text-center">Products</th>
                                <th className="px-5 py-3 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <Fragment key={cat.id}>
                                    <tr className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                                        {/* Name cell */}
                                        <td className="px-5 py-4">
                                            {editingId === cat.id ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={e => setEditName(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && handleEditSave(cat.id)}
                                                    autoFocus
                                                    className="px-3 py-1.5 border border-[#2D2654]/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2654]/20 w-48"
                                                />
                                            ) : (
                                                <span className="font-medium text-gray-900">{cat.name}</span>
                                            )}
                                        </td>

                                        {/* Slug cell */}
                                        <td className="px-5 py-4">
                                            <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {cat.slug}
                                            </span>
                                        </td>

                                        {/* Product count */}
                                        <td className="px-5 py-4 text-center">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                                cat.product_count > 0
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                {cat.product_count}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {editingId === cat.id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleEditSave(cat.id)}
                                                            disabled={isPending}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                                                        >
                                                            {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => { setEditingId(null); setEditError('') }}
                                                            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleEdit(cat)}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                                        >
                                                            <Pencil className="w-3 h-3" />
                                                            Rename
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(cat.id, cat.name)}
                                                            disabled={isPending}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg disabled:opacity-50 transition-colors"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Inline error rows */}
                                    {(editingId === cat.id && editError) && (
                                        <tr className="bg-red-50">
                                            <td colSpan={4} className="px-5 py-2 text-red-600 text-xs">{editError}</td>
                                        </tr>
                                    )}
                                    {deleteError[cat.id] && (
                                        <tr className="bg-red-50">
                                            <td colSpan={4} className="px-5 py-2 text-red-600 text-xs">{deleteError[cat.id]}</td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
