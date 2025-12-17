'use client'

import { useActionState, useState } from 'react'
import { registerWebinar } from '@/app/actions/webinar'
import { User, Mail, Building, MessageSquare, Plus, X, Loader2, CheckCircle2 } from 'lucide-react'

const initialState = {
    message: null,
    error: null,
    success: false
}

export default function AddWebinarClient() {
    const [isOpen, setIsOpen] = useState(false)
    const [state, formAction, isPending] = useActionState(registerWebinar, initialState)

    if (state?.success && isOpen) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-center justify-between animate-in fade-in zoom-in duration-300">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-green-900">Success!</h3>
                        <p className="text-green-700 text-sm">
                            {state.message}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-green-700 hover:text-green-900 hover:bg-green-100 p-2 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        )
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Registrant
            </button>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Manually Add Registrant</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form action={formAction}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="clinic" className="block text-sm font-medium text-gray-700 mb-1">Clinic / Practice</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="clinic"
                                id="clinic"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Skin Health Clinic"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                        <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                                <MessageSquare className="h-4 w-4 text-gray-400" />
                            </div>
                            <textarea
                                name="message"
                                id="message"
                                rows={1}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Notes..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {state?.error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4 border border-red-100">
                        {state.error}
                    </div>
                )}

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            'Add Registrant'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
