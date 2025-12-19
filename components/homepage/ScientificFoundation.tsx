'use client';

import { useState } from 'react';
import { Plus, X, Microscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScientificFoundation() {
    const [activeItem, setActiveItem] = useState<number | null>(0);

    const items = [
        {
            id: 0,
            title: "Advanced Bio-Technology",
            content: "Innovations in recombinant enzymes and peptides. Our products utilize state-of-the-art lyophilization to maintain 100% enzymatic activity until reconstitution, ensuring maximum potency for every treatment.",
        },
        {
            id: 1,
            title: "Proven Safety Profile",
            content: "Clinically proven results with minimal downtime. Extensive ISO-certified manufacturing processes guarantee purity and immunogenic safety, reducing the risk of adverse reactions.",
        },
        {
            id: 2,
            title: "Scientific Research",
            content: "Our products are backed by rigorous clinical studies and designed for professional use. We collaborate with leading research institutions to constantly validate and improve our therapeutic protocols.",
        },
        {
            id: 3,
            title: "Global Standards",
            content: "Trusted by aesthetic professionals across the world. Compliant with UKRP, EU MDR, and other international regulatory standards to ensure you are using the best-in-class solutions.",
        }
    ];

    return (
        <section className="py-24 bg-[#1A1433] relative overflow-hidden">
            {/* Background Molecular Motif */}
            <div className="absolute -left-20 top-20 w-96 h-96 opacity-10 animate-spin-slow pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FF6B9D" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.2C93.5,8.9,82.2,22.1,71.2,33.4C60.2,44.7,49.5,54.1,37.6,62.8C25.7,71.5,12.6,79.5,-1.3,81.7C-15.2,84,-31.2,80.5,-44.8,72.4C-58.4,64.3,-69.6,51.6,-77.2,37.2C-84.8,22.8,-88.8,6.7,-85.8,-8.1C-82.9,-22.9,-73,-36.4,-61.6,-46.8C-50.2,-57.2,-37.3,-64.5,-23.9,-72.1C-10.5,-79.7,3.4,-87.7,16.8,-87.3C30.2,-86.9,43.3,-78.1,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Side: Visual */}
                    <div className="w-full lg:w-1/2 relative min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                        {/* Using a placeholder for abstract scientific video/image */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1433] to-transparent opacity-80"></div>

                        <div className="absolute bottom-12 left-12 right-12">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,107,157,0.4)]">
                                <Microscope className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">Redefining Aesthetic Standards</h2>
                            <p className="text-gray-300 text-lg">We bridge the gap between medical science and aesthetic results</p>
                        </div>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="w-full lg:w-1/2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`rounded-xl border transition-all duration-300 ${activeItem === item.id ? 'bg-white/5 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <button
                                    onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`text-xl font-semibold ${activeItem === item.id ? 'text-white' : 'text-gray-400'}`}>
                                        {item.title}
                                    </span>
                                    <div className={`p-2 rounded-full transition-colors ${activeItem === item.id ? 'bg-gradient-brand text-white' : 'bg-white/10 text-white'}`}>
                                        {activeItem === item.id ? <X size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {activeItem === item.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5 mt-2">
                                                {item.content}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
