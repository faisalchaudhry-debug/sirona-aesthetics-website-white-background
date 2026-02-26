import { createClient } from '@/utils/supabase/server'
import AddWebinarClient from './AddWebinarClient'
import TrainingEventsClient from './TrainingEventsClient'
import RegistrationsClient from './RegistrationsClient'

export const revalidate = 0

export default async function AdminWebinarsPage() {
    const supabase = await createClient()

    const [{ data: registrations }, { data: events }] = await Promise.all([
        supabase
            .from('webinar_registrations')
            .select('*')
            .order('created_at', { ascending: false }),
        supabase
            .from('training_events')
            .select('*')
            .order('event_date', { ascending: true }),
    ])

    return (
        <div className="space-y-12">

            {/* ── Section 1: Training Events ── */}
            <TrainingEventsClient events={events || []} />

            <hr className="border-gray-200" />

            {/* ── Section 2: Waitlist Registrations (unchanged) ── */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Waitlist Registrations</h2>
                        <p className="text-gray-500 text-sm mt-0.5">People who registered interest from the training page</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
                            Total: {registrations?.length || 0}
                        </div>
                        <AddWebinarClient />
                    </div>
                </div>

                <RegistrationsClient registrations={registrations || []} />
            </div>
        </div>
    )
}
