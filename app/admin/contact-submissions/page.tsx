import { createClient } from '@/utils/supabase/server'
import { Mail, Calendar, User, MapPin, Tag } from 'lucide-react'
import SubmissionCard from '@/components/admin/SubmissionCard'

export const revalidate = 0

export default async function ContactSubmissionsPage() {
    const supabase = await createClient()

    const { data: submissions, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return <div className="p-4 text-red-500">Error loading submissions: {error.message}</div>
    }

    const contactPageSubmissions = submissions?.filter(s => s.source === 'contact_page') || []
    const homeSectionSubmissions = submissions?.filter(s => s.source === 'home_section') || []

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Form Submissions</h1>
                <p className="text-gray-500">Manage inquiries from the website.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Page Submissions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            Contact Page
                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{contactPageSubmissions.length}</span>
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[800px] overflow-y-auto">
                        {contactPageSubmissions.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No submissions yet.</div>
                        ) : (
                            contactPageSubmissions.map((sub) => (
                                <SubmissionCard key={sub.id} submission={sub} />
                            ))
                        )}
                    </div>
                </div>

                {/* Home/Hero Submissions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-accent" />
                            Home Section
                            <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">{homeSectionSubmissions.length}</span>
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[800px] overflow-y-auto">
                        {homeSectionSubmissions.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No submissions yet.</div>
                        ) : (
                            homeSectionSubmissions.map((sub) => (
                                <SubmissionCard key={sub.id} submission={sub} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
