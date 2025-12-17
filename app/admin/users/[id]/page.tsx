import { createClient } from '@/utils/supabase/server'
import { updateUser } from '../../actions'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

    if (!userProfile) {
        return <div>User not found</div>
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center space-x-4">
                <Link href="/admin/users" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">User ID: {userProfile.id}</h2>
                </div>
                <form action={async (formData) => {
                    'use server'
                    await updateUser(formData)
                    redirect('/admin/users')
                }} className="p-6 space-y-6">
                    <input type="hidden" name="userId" value={userProfile.id} />

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Read Only)</label>
                            <input
                                type="text"
                                disabled
                                value={userProfile.email}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                defaultValue={userProfile.full_name}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company / Clinic</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    defaultValue={userProfile.company_name || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    defaultValue={userProfile.phone || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    name="role"
                                    id="role"
                                    defaultValue={userProfile.role}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="user">User</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex items-center pt-6">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isApproved"
                                        defaultChecked={userProfile.is_approved}
                                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-900">
                                        Approved for Access
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
                        <Link href="/admin/users" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium flex items-center hover:bg-blue-900 transition-colors shadow-sm"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
