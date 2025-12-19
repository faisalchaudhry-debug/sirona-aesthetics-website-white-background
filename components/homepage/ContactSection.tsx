'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    type: string;
    message: string;
};

export default function ContactSection() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message?: string } | null>(null);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitResult(null);

        try {
            console.log('Submitting form data:', data);
            const result = await submitContactForm({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                source: 'home_section',
                country: data.country,
                type: data.type,
                message: data.message,
            });
            console.log('Submission result:', result);

            if (result.success) {
                setSubmitResult({ success: true, message: 'Message sent successfully!' });
                // Optional: Reset form here if desired, but user might want to resend? Usually reset.
                // reset(); 
            } else {
                setSubmitResult({ success: false, message: result.error || 'Something went wrong.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitResult({ success: false, message: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-[#3A3366] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D2654] to-[#3A3366]"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div className="text-white">
                        <h2 className="text-4xl font-bold mb-6">Let's Talk About <br /> Advanced Aesthetics</h2>
                        <p className="text-gray-300 text-lg mb-12">Partner with us for cutting-edge tissue engineering solutions.</p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Email Us</h4>
                                    <p className="text-gray-400">info@sironaaesthetics.co.uk</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Call Us</h4>
                                    <p className="text-gray-400">+44 123 456 7890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Visit Us</h4>
                                    <p className="text-gray-400">London, United Kingdom</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Jane"
                                        {...register("firstName", { required: true })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                    />
                                    {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        {...register("lastName", { required: true })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                    />
                                    {errors.lastName && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="jane@example.com"
                                    {...register("email", { required: true })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                />
                                {errors.email && <span className="text-red-500 text-xs">Required</span>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                    <select
                                        {...register("country")}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                    >
                                        <option value="UK">United Kingdom</option>
                                        <option value="US">United States</option>
                                        <option value="EU">Europe</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                                    <select
                                        {...register("type")}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                    >
                                        <option value="Health Professional">Health Professional</option>
                                        <option value="Patient">Patient</option>
                                        <option value="Distributor">Distributor</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help you?"
                                    {...register("message", { required: true })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-xs">Required</span>}
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 text-accent rounded border-gray-300 focus:ring-accent" />
                                <span className="text-xs text-gray-500">I understand my data will be processed per <a href="#" className="underline">Privacy Policy</a></span>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-lg bg-gradient-brand text-white font-bold text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        Sending... <Loader2 className="w-5 h-5 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {submitResult && (
                                <div className={`p-4 rounded-lg flex items-center gap-3 ${submitResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {submitResult.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <p>{submitResult.message}</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section >
    );
}
