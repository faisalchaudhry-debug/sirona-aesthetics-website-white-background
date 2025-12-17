import { createClient } from '@/utils/supabase/server'
import { approveUser, deleteUser } from '../actions'
import { Check, Shield, User as UserIcon, Stethoscope } from 'lucide-react'
import DeleteUserButton from './DeleteUserButton'

export const revalidate = 0

export default async function AdminUsersPage() {
    const supabase = await createClient()

    // Fetch all profiles
    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    const pendingUsers = profiles?.filter(p => !p.is_approved && p.role === 'user') || []
    const approvedUsers = profiles?.filter(p => p.is_approved || p.role === 'admin') || []

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>

            {/* Pending Approvals Section */}
            {pendingUsers.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-orange-100 bg-orange-50 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-orange-800 flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Pending Doctor Approvals
                        </h2>
                        <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
                            {pendingUsers.length} Pending
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-orange-50/50">
                                <tr className="text-orange-900/60 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Company</th>
                                    <th className="px-6 py-3 font-medium">Phone</th>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-100">
                                {pendingUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-orange-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{user.full_name}</div>
                                            <div className="text-gray-500 text-sm">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.company_name}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                                        <td className="px-6 py-4 text-gray-600">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <a
                                                    href={`/admin/users/${user.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Edit
                                                </a>
                                                <form action={async () => {
                                                    'use server'
                                                    await approveUser(user.id)
                                                }}>
                                                    <button className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center transition-colors">
                                                        <Check className="w-4 h-4 mr-1.5" /> Approve
                                                    </button>
                                                </form>
                                                <DeleteUserButton userId={user.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* All Users Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">All Users</h2>
                </div>
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
                            {approvedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3">
                                                {user.role === 'admin' ? <Shield className="w-4 h-4" /> : user.role === 'doctor' ? <Stethoscope className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.full_name}</div>
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
                                    <td className="px-6 py-4 text-gray-600">{user.company_name || '-'}</td>
                                    <td className="px-6 py-4">
                                        {user.is_approved ? (
                                            <span className="text-green-600 text-sm flex items-center"><Check className="w-3 h-3 mr-1" /> Active</span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <a href={`/admin/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</a>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
