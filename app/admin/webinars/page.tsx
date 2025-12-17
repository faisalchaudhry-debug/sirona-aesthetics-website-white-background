import { createClient } from '@/utils/supabase/server'
import { Calendar, Mail, User, Building, MessageSquare } from 'lucide-react'
import AddWebinarClient from './AddWebinarClient'

export const revalidate = 0

export default async function AdminWebinarsPage() {
    const supabase = await createClient()

    const { data: registrations } = await supabase
        .from('webinar_registrations')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Webinar Registrations</h1>
                    <p className="text-gray-500 mt-1">View and manage waitlist signups</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
                        Total: {registrations?.length || 0}
                    </div>
                    <AddWebinarClient />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clinic</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {!registrations || registrations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No registrations found yet.
                                    </td>
                                </tr>
                            ) : (
                                registrations.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(reg.created_at).toLocaleDateString()}
                                            <span className="text-xs text-gray-400 block mt-0.5">
                                                {new Date(reg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-3">
                                                    {reg.full_name?.charAt(0)}
                                                </div>
                                                <span className="font-medium text-gray-900">{reg.full_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Mail className="w-3 h-3 mr-2 text-gray-400" />
                                                {reg.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {reg.clinic_name ? (
                                                <div className="flex items-center">
                                                    <Building className="w-3 h-3 mr-2 text-gray-400" />
                                                    {reg.clinic_name}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={reg.message}>
                                            {reg.message || <span className="text-gray-400 italic">-</span>}
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
