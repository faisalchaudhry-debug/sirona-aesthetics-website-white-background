'use client'

import { useState } from 'react'
import { Check, Shield, User as UserIcon, Stethoscope, Search, Filter } from 'lucide-react'
import { approveUser } from '@/app/admin/actions'
import DeleteUserButton from '@/app/admin/users/DeleteUserButton'
import Link from 'next/link'

type Profile = {
    id: string
    full_name: string | null
    email: string | null
    role: string
    is_approved: boolean | null
    company_name: string | null
    phone: string | null
    created_at: string
}

export default function UserManagement({ users }: { users: Profile[] }) {
    const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending'>('all')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredUsers = users.filter(user => {
        const matchesSearch = (
            (user.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.company_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        )

        if (!matchesSearch) return false

        if (activeTab === 'active') return user.is_approved
        if (activeTab === 'pending') return !user.is_approved

        return true
    })

    const pendingCount = users.filter(u => !u.is_approved).length
    const activeCount = users.filter(u => u.is_approved).length

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-sirona-navy/20 focus:border-sirona-navy outline-none w-full sm:w-64"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                <div className="flex space-x-1">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'all'
                                ? 'bg-gray-100 text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        All Users
                        <span className="ml-2 bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                            {users.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'active'
                                ? 'bg-green-50 text-green-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Active
                        <span className="ml-2 bg-green-100 text-green-700 py-0.5 px-2 rounded-full text-xs">
                            {activeCount}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'pending'
                                ? 'bg-orange-50 text-orange-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Pending
                        <span className="ml-2 bg-orange-100 text-orange-700 py-0.5 px-2 rounded-full text-xs">
                            {pendingCount}
                        </span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Company</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Joined</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No users found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white mr-3 ${user.role === 'admin' ? 'bg-purple-600' :
                                                        user.role === 'doctor' ? 'bg-blue-600' : 'bg-gray-400'
                                                    }`}>
                                                    {user.role === 'admin' ? <Shield className="w-4 h-4" /> : user.role === 'doctor' ? <Stethoscope className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{user.full_name || 'No Name'}</div>
                                                    <div className="text-gray-500 text-sm">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {user.company_name || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.is_approved ? (
                                                <span className="inline-flex items-center text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-md">
                                                    <Check className="w-3 h-3 mr-1.5" /> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center text-orange-600 text-sm font-medium bg-orange-50 px-2 py-1 rounded-md">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={`/admin/users/${user.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                {!user.is_approved && (
                                                    <button
                                                        onClick={async () => {
                                                            if (confirm('Approve this user?')) {
                                                                await approveUser(user.id)
                                                            }
                                                        }}
                                                        className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center transition-colors"
                                                    >
                                                        <Check className="w-4 h-4 mr-1.5" /> Approve
                                                    </button>
                                                )}
                                                <DeleteUserButton userId={user.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
