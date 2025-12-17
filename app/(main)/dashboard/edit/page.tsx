import { createClient } from '@/utils/supabase/server'
import { updateProfile } from '../actions'
import { ArrowLeft, Save, User, Shield } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) {
        return <div>Profile not found</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Personal Information
                            </h2>
                        </div>
                        <form action={async (formData) => {
                            'use server'
                            await updateProfile(formData)
                        }} className="p-6 space-y-6">

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    defaultValue={profile.email || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                                />
                                <p className="mt-1 text-xs text-amber-600">
                                    Note: Changing your email will require clicking a confirmation link sent to both your old and new email addresses.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    defaultValue={profile.full_name}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company / Clinic</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        defaultValue={profile.company_name || ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        defaultValue={profile.phone || ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-blue-800 flex items-center mb-2">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Account Status
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500 block">Role</span>
                                        <span className="font-medium text-gray-900 capitalize">{profile.role}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block">Doctor Approval</span>
                                        <span className={`font-medium ${profile.is_approved ? 'text-green-600' : 'text-orange-600'}`}>
                                            {profile.is_approved ? 'Approved' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
                                <Link href="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium flex items-center hover:bg-blue-900 transition-colors shadow-sm"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}
