'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TrainingAcademy() {
    return (
        <section className="relative min-h-[80vh] flex flex-col lg:flex-row bg-[#0B0F19]">

            {/* Left Side: Image */}
            <div className="w-full lg:w-2/5 relative min-h-[50vh] lg:min-h-full">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full lg:w-3/5 p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-brand opacity-5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10">
                    <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold tracking-wider text-accent mb-6 uppercase">
                        Professional Training Academy
                    </span>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        Step into the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Future of Bio-Remodeling
                        </span>
                    </h2>

                    <p className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
                        Master the art of enzymatic therapy and advanced bio-remodeling. Our expert-led workshops provide the hands-on experience and certification you need to elevate your practice.
                    </p>

                    <Link
                        href="/training"
                        className="group inline-flex items-center gap-4 bg-white text-[#0B0F19] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                        View All Programs
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

        </section>
    );
}
