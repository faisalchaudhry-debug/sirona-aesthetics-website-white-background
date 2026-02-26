import Link from 'next/link'
import { CheckCircle2, CalendarCheck, ArrowLeft, Phone } from 'lucide-react'

const CALENDAR_URL = process.env.NEXT_PUBLIC_TRAINING_CALENDAR_URL || ''

export default function TrainingThankYouPage() {
    return (
        <div className="bg-[#2D2654] min-h-screen font-sans flex items-center justify-center px-6 py-20 selection:bg-accent selection:text-white">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1433] to-[#2D2654] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-brand opacity-10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-xl w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center ring-1 ring-green-500/30">
                        <CheckCircle2 className="w-12 h-12 text-green-400" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Thank You for <br />
                    <span className="text-gradient-ocean">Registering!</span>
                </h1>

                <p className="text-gray-300 text-lg leading-relaxed mb-10">
                    We&apos;ve received your registration. Our team will get in touch with you shortly to confirm your seat and share all the details you need.
                </p>

                {/* Team contact card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 flex items-start gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <p className="text-white font-semibold mb-1">We&apos;ll be in touch</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A member of our team will contact you via email or phone to confirm your spot and answer any questions you may have.
                        </p>
                    </div>
                </div>

                {/* OR divider + Calendar CTA — only shown when CALENDAR_URL is set */}
                {CALENDAR_URL && (
                    <>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-white/30 text-sm font-semibold uppercase tracking-widest">or</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <div className="bg-[#1A1433] border border-white/10 rounded-3xl p-8 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                                <CalendarCheck className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Book Instantly</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Prefer not to wait? Use our online calendar to secure your seat right now — no back-and-forth needed.
                            </p>
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-brand text-white font-bold rounded-full shadow-[0_0_30px_rgba(255,107,157,0.3)] hover:shadow-[0_0_50px_rgba(255,107,157,0.5)] hover:scale-105 transition-all"
                            >
                                <CalendarCheck className="w-5 h-5" />
                                Book Your Seat Now
                            </a>
                        </div>
                    </>
                )}

                {/* Back link */}
                <Link
                    href="/training"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Training
                </Link>

            </div>
        </div>
    )
}
