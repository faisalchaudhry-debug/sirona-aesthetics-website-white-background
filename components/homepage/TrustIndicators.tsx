'use client';

import { ShieldCheck, Globe, Activity } from 'lucide-react';

export default function TrustIndicators() {
    const stats = [
        {
            id: 1,
            icon: <Activity className="w-8 h-8 text-accent" />,
            value: "100%",
            label: "Authentic Enzymes",
            description: "Direct from manufacturer"
        },
        {
            id: 2,
            icon: <Globe className="w-8 h-8 text-accent" />,
            value: "Global",
            label: "Distribution Network",
            description: "Serving clinics worldwide"
        },
        {
            id: 3,
            icon: <ShieldCheck className="w-8 h-8 text-accent" />,
            value: "Clinical",
            label: "Proven Efficacy",
            description: "Backed by science"
        }
    ];

    return (
        <section className="bg-white border-y border-gray-100 py-16 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-brand opacity-[0.03] pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center text-center px-4 group pt-8 md:pt-0">
                            <div className="mb-6 p-4 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-gradient-brand group-hover:scale-110 transition-all duration-300 shadow-lg shadow-gray-200/50 group-hover:shadow-accent/20">
                                <div className="group-hover:text-white transition-colors">
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-4xl font-light text-sirona-navy mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-brand transition-colors">
                                {stat.value}
                            </h3>
                            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2 text-gradient">
                                {stat.label}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
