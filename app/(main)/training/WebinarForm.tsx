'use client'

import { useActionState } from 'react'
import { registerWebinar, WebinarFormState } from '@/app/actions/webinar'
import { User, Mail, Building, MessageSquare, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react'

const initialState: WebinarFormState = {
    message: '',
    error: '',
    success: false
}

export default function WebinarForm() {
    const [state, formAction, isPending] = useActionState(registerWebinar, initialState)

    if (state?.success) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur-sm text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-gray-300">
                    {state.message}
                </p>
            </div>
        )
    }

    return (
        <form action={formAction} className="bg-[#1A1433] border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand"></div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2">Your Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="Enter your full name"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="clinic" className="block text-sm font-bold text-gray-300 mb-2">Clinic / Practice</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            name="clinic"
                            id="clinic"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="e.g. Skin Health Clinic"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-2">Message (Optional)</label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-500" />
                        </div>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="e.g. I'm interested in future workshops"
                        ></textarea>
                    </div>
                </div>

                {state?.error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {state.error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-brand hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Registering...
                        </>
                    ) : (
                        <>
                            Register Interest <ChevronRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                </button>
            </div>
        </form>
    )

}
