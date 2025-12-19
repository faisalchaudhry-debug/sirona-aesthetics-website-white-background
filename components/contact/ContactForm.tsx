'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { submitContactForm } from '@/app/actions/contact'

type FormData = {
    firstName: string
    lastName: string
    email: string
    subject: string
    message: string
}

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message?: string } | null>(null)

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setSubmitResult(null)

        const result = await submitContactForm({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            subject: data.subject,
            message: data.message,
            source: 'contact_page'
        })

        setIsSubmitting(false)

        if (result.success) {
            setSubmitResult({ success: true, message: 'Message sent successfully! We will get back to you soon.' })
            reset()
        } else {
            setSubmitResult({ success: false, message: result.error })
        }
    }

    return (
        <div className="bg-[#1A1433] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand"></div>

            <h3 className="text-3xl font-bold mb-8 text-white">Send us a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 ml-1">First Name</label>
                        <input
                            type="text"
                            placeholder="John"
                            {...register('firstName', { required: 'First name is required' })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                        {errors.firstName && <span className="text-red-400 text-xs ml-1">{errors.firstName.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 ml-1">Last Name</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            {...register('lastName', { required: 'Last name is required' })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                        {errors.lastName && <span className="text-red-400 text-xs ml-1">{errors.lastName.message}</span>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="john@clinic.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                    {errors.email && <span className="text-red-400 text-xs ml-1">{errors.email.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Subject</label>
                    <select
                        {...register('subject')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-gray-300 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
                    >
                        <option className="bg-[#1A1433]" value="General Inquiry">General Inquiry</option>
                        <option className="bg-[#1A1433]" value="Product Support">Product Support</option>
                        <option className="bg-[#1A1433]" value="Training Request">Training Request</option>
                        <option className="bg-[#1A1433]" value="Wholesale/Distribution">Wholesale/Distribution</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Message</label>
                    <textarea
                        rows={4}
                        placeholder="How can we help you?"
                        {...register('message', { required: 'Message is required' })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    ></textarea>
                    {errors.message && <span className="text-red-400 text-xs ml-1">{errors.message.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-brand text-white font-bold rounded-xl shadow-lg hover:shadow-accent/25 hover:opacity-90 transition-all flex items-center justify-center text-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>Sending... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                    ) : (
                        <>Send Message <Send className="ml-2 w-5 h-5" /></>
                    )}
                </button>

                {submitResult && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${submitResult.success ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {submitResult.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <p>{submitResult.message}</p>
                    </div>
                )}
            </form>
        </div>
    )
}
