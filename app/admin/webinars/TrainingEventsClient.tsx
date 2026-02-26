'use client'

import { useActionState, useState, useTransition, Fragment } from 'react'
import { addTrainingEvent, updateTrainingEvent, deleteTrainingEvent, TrainingEventFormState } from './actions'
import { Plus, X, Loader2, Trash2, Calendar, CheckCircle2, Pencil, Save } from 'lucide-react'

const initialState: TrainingEventFormState = { error: '', success: false }

interface TrainingEvent {
    id: string
    title: string
    event_date: string
    description: string
    created_at: string
}

/** Convert a stored UTC ISO string → "YYYY-MM-DDTHH:MM" in UTC for datetime-local input */
function toDatetimeLocalGMT(isoString: string): string {
    return new Date(isoString).toISOString().slice(0, 16)
}

/** Format a UTC ISO string for display, always in GMT */
function formatGMT(isoString: string) {
    const d = new Date(isoString)
    const date = d.toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' })
    const time = d.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })
    return { date, time }
}

interface EditState {
    id: string
    title: string
    event_date: string   // datetime-local format (GMT)
    description: string
    saving: boolean
    error: string
}

export default function TrainingEventsClient({ events }: { events: TrainingEvent[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [state, formAction, isPending] = useActionState(addTrainingEvent, initialState)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [editing, setEditing] = useState<EditState | null>(null)
    const [, startTransition] = useTransition()

    const handleDelete = (eventId: string) => {
        if (!confirm('Delete this training event? It will no longer appear on the training page.')) return
        setDeletingId(eventId)
        startTransition(async () => {
            await deleteTrainingEvent(eventId)
            setDeletingId(null)
        })
    }

    const startEdit = (event: TrainingEvent) => {
        setEditing({
            id: event.id,
            title: event.title,
            event_date: toDatetimeLocalGMT(event.event_date),
            description: event.description,
            saving: false,
            error: '',
        })
    }

    const cancelEdit = () => setEditing(null)

    const saveEdit = () => {
        if (!editing) return
        setEditing((e) => e ? { ...e, saving: true, error: '' } : e)
        startTransition(async () => {
            const result = await updateTrainingEvent(
                editing.id,
                editing.title,
                editing.event_date + 'Z',   // ensure GMT
                editing.description
            )
            if (result?.error) {
                setEditing((e) => e ? { ...e, saving: false, error: result.error! } : e)
            } else {
                setEditing(null)
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Training Events</h2>
                    <p className="text-gray-500 text-sm mt-0.5">
                        The nearest upcoming event is shown on the public training page. All times are in GMT.
                    </p>
                </div>
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium text-sm"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                    </button>
                )}
            </div>

            {/* Success banner */}
            {state.success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in duration-300">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-green-800 font-medium text-sm">Event added successfully! It will now appear on the training page.</p>
                </div>
            )}

            {/* Add Event Form */}
            {isOpen && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-base font-bold text-gray-900">New Training Event</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form action={formAction} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="e.g. Bio-Remodeling Masterclass"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date &amp; Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="event_date"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">Enter time in GMT (UTC+0)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                placeholder="Brief description of what attendees will learn..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                            />
                        </div>

                        {state.error && (
                            <p className="text-red-600 text-sm bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                                {state.error}
                            </p>
                        )}

                        <div className="flex justify-end gap-3 pt-1">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm flex items-center gap-2 disabled:opacity-50 transition-colors"
                            >
                                {isPending ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Adding...</>
                                ) : (
                                    'Add Event'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Events Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date &amp; Time (GMT)</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-sm">
                                    No training events yet. Click "Add Event" to create one.
                                </td>
                            </tr>
                        ) : (
                            events.map((event) => {
                                const isUpcoming = new Date(event.event_date) >= new Date()
                                const isEditingThis = editing?.id === event.id
                                const { date, time } = formatGMT(event.event_date)

                                return (
                                    <Fragment key={event.id}>
                                        {/* Normal row */}
                                        <tr className={`transition-colors ${isEditingThis ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}>
                                            <td className="px-6 py-4 max-w-xs">
                                                <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{event.description}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    {date}
                                                    <span className="text-gray-400 text-xs">{time}</span>
                                                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">GMT</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    isUpcoming
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {isUpcoming ? 'Upcoming' : 'Past'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => isEditingThis ? cancelEdit() : startEdit(event)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            isEditingThis
                                                                ? 'text-blue-500 bg-blue-100 hover:bg-blue-200'
                                                                : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                                                        }`}
                                                        title={isEditingThis ? 'Cancel edit' : 'Edit event'}
                                                    >
                                                        {isEditingThis
                                                            ? <X className="w-4 h-4" />
                                                            : <Pencil className="w-4 h-4" />
                                                        }
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(event.id)}
                                                        disabled={deletingId === event.id || isEditingThis}
                                                        className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-30"
                                                        title="Delete event"
                                                    >
                                                        {deletingId === event.id
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
                                                <td colSpan={4} className="px-6 py-5">
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                                                                <input
                                                                    type="text"
                                                                    value={editing.title}
                                                                    onChange={(e) => setEditing((s) => s ? { ...s, title: e.target.value } : s)}
                                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                    Date &amp; Time
                                                                    <span className="ml-1 text-blue-500 font-semibold">(GMT)</span>
                                                                </label>
                                                                <input
                                                                    type="datetime-local"
                                                                    value={editing.event_date}
                                                                    onChange={(e) => setEditing((s) => s ? { ...s, event_date: e.target.value } : s)}
                                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                                            <textarea
                                                                value={editing.description}
                                                                onChange={(e) => setEditing((s) => s ? { ...s, description: e.target.value } : s)}
                                                                rows={2}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                                            />
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
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
