import { Zap, Droplet, Microscope, Wind, Sparkles, Clock, Shield, Activity, Layers } from 'lucide-react'

// Content definitions for different categories
const CONTENT_MAP: Record<string, any> = {
    'pb-serum': {
        science: {
            title: "Active <span class='text-[#d946ef]'>Molecular</span> Agents",
            subtitle: "Powered by clinical-grade ingredients engineered for maximum bioavailability and efficacy.",
            cards: [
                {
                    icon: Zap,
                    title: "Bio-Active Enzymes",
                    desc: "Catalyzes cellular renewal for accelerated tissue repair.",
                    color: "text-[#fbbf24]"
                },
                {
                    icon: Droplet,
                    title: "Hyaluronic Matrix",
                    desc: "Deeply hydrates and plumps skin structure.",
                    color: "text-[#38bdf8]"
                },
                {
                    icon: Microscope,
                    title: "Peptide Complex",
                    desc: "Signals collagen production for firmer skin architecture.",
                    color: "text-[#d946ef]"
                }
            ]
        },
        ritual: {
            title: "The Treatment <span class='text-[#d946ef]'>Ritual</span>",
            subtitle: "Designed not just as a product, but as a transformative experience. Follow this protocol for optimal results.",
            tip: "Ensure the skin is completely dry before application to maximize the enzymatic activity.",
            steps: [
                {
                    icon: Wind,
                    title: "Prepare",
                    time: "2 mins",
                    desc: "Cleanse the area thoroughly. Feel the cooling sensation as the skin is prepped.",
                    color: "text-[#38bdf8]",
                    bg: "bg-[#38bdf8]/10"
                },
                {
                    icon: Sparkles,
                    title: "Activate",
                    time: "5 mins",
                    desc: "Apply the serum. Massage gently until the formula transforms into a silky texture.",
                    color: "text-[#d946ef]",
                    bg: "bg-[#d946ef]/10"
                },
                {
                    icon: Clock,
                    title: "Absorb",
                    time: "10 mins",
                    desc: "Allow the active molecules to penetrate deeply. You may feel a gentle warming.",
                    color: "text-[#a855f7]",
                    bg: "bg-[#a855f7]/10"
                }
            ]
        }
    },
    'novacutan': {
        science: {
            title: "Bio-Optical <span class='text-[#d946ef]'>Restoration</span>",
            subtitle: "Advanced amino-acid complex protecting against environmental oxidation.",
            cards: [
                {
                    icon: Layers,
                    title: "HOPA Complex",
                    desc: "Targets endogenous aging markers for total skin rejuvenation.",
                    color: "text-[#fbbf24]"
                },
                {
                    icon: Shield,
                    title: "Double Protection",
                    desc: "Shields against UV radiation and blue light damage.",
                    color: "text-[#38bdf8]"
                },
                {
                    icon: Activity,
                    title: "Cellular Activation",
                    desc: "Stimulates fibroblast activity for increased elasticity.",
                    color: "text-[#d946ef]"
                }
            ]
        },
        ritual: {
            title: "The Injection <span class='text-[#d946ef]'>Protocol</span>",
            subtitle: "Precision delivery system for maximum dermal integration.",
            tip: "Use micro-papular technique for optimal distribution in the mid-dermis.",
            steps: [
                {
                    icon: Wind,
                    title: "Disinfect",
                    time: "2 mins",
                    desc: "Thoroughly disinfect the treatment area with chlorhexidine solution.",
                    color: "text-[#38bdf8]",
                    bg: "bg-[#38bdf8]/10"
                },
                {
                    icon: Sparkles,
                    title: "Inject",
                    time: "15 mins",
                    desc: "Administer using the recommended micro-bolus technique.",
                    color: "text-[#d946ef]",
                    bg: "bg-[#d946ef]/10"
                },
                {
                    icon: Clock,
                    title: "Soothe",
                    time: "5 mins",
                    desc: "Apply a soothing post-procedure mask to minimize redness.",
                    color: "text-[#a855f7]",
                    bg: "bg-[#a855f7]/10"
                }
            ]
        }
    },
    'smartker': {
        science: {
            title: "Smart <span class='text-[#d946ef]'>Keratin</span> Tech",
            subtitle: "Revolutionary hair restoration system using biomimetic peptides.",
            cards: [
                {
                    icon: Zap,
                    title: "Growth Factors",
                    desc: "Activates dormant follicles for improved density.",
                    color: "text-[#fbbf24]"
                },
                {
                    icon: Droplet,
                    title: "Scalp Health",
                    desc: "Normalizes sebum production and improved circulation.",
                    color: "text-[#38bdf8]"
                },
                {
                    icon: Microscope,
                    title: "Fiber Bond",
                    desc: "Strengthens hair shaft integrity from the inside out.",
                    color: "text-[#d946ef]"
                }
            ]
        },
        ritual: {
            title: "Application <span class='text-[#d946ef]'>Method</span>",
            subtitle: "Systematic approach for total scalp coverage and absorption.",
            tip: "Perform a gentle massage to stimulate blood flow before application.",
            steps: [
                {
                    icon: Wind,
                    title: "Section",
                    time: "2 mins",
                    desc: "Divide hair into clean sections to expose the scalp area.",
                    color: "text-[#38bdf8]",
                    bg: "bg-[#38bdf8]/10"
                },
                {
                    icon: Sparkles,
                    title: "Apply",
                    time: "5 mins",
                    desc: "Drop serum directly onto scalp along partings.",
                    color: "text-[#d946ef]",
                    bg: "bg-[#d946ef]/10"
                },
                {
                    icon: Activity,
                    title: "Stimulate",
                    time: "3 mins",
                    desc: "Massage vigorously using fingertips to ensure penetration.",
                    color: "text-[#a855f7]",
                    bg: "bg-[#a855f7]/10"
                }
            ]
        }
    },
    'default': {
        science: {
            title: "Advanced <span class='text-[#d946ef]'>Dermal</span> Science",
            subtitle: "Clinical-grade formulations for professional aesthetic results.",
            cards: [
                {
                    icon: Zap,
                    title: "High Potency",
                    desc: "Concentrated active ingredients for visible outcomes.",
                    color: "text-[#fbbf24]"
                },
                {
                    icon: Droplet,
                    title: "Bio-Compatibility",
                    desc: "Formulated to integrate seamlessly with skin tissue.",
                    color: "text-[#38bdf8]"
                },
                {
                    icon: Microscope,
                    title: "Clinical Safety",
                    desc: "Rigorously tested for stability and patient safety.",
                    color: "text-[#d946ef]"
                }
            ]
        },
        ritual: {
            title: "Professional <span class='text-[#d946ef]'>Usage</span>",
            subtitle: "Follow standard clinical protocols for medical aesthetic devices.",
            tip: "Always review the full contraindications list before proceeding.",
            steps: [
                {
                    icon: Wind,
                    title: "Assess",
                    time: "5 mins",
                    desc: "Evaluate patient suitability and treatment area condition.",
                    color: "text-[#38bdf8]",
                    bg: "bg-[#38bdf8]/10"
                },
                {
                    icon: Sparkles,
                    title: "Treat",
                    time: "20 mins",
                    desc: "Perform procedure according to standard medical protocols.",
                    color: "text-[#d946ef]",
                    bg: "bg-[#d946ef]/10"
                },
                {
                    icon: Clock,
                    title: "Aftercare",
                    time: "5 mins",
                    desc: "Review post-treatment care instructions with the patient.",
                    color: "text-[#a855f7]",
                    bg: "bg-[#a855f7]/10"
                }
            ]
        }
    }
}

export default function ProductEducation({ category }: { category?: string }) {
    const slug = category?.toLowerCase().replace(/\s+/g, '-') || 'default'
    const content = CONTENT_MAP[slug] || CONTENT_MAP['default']
    const { science, ritual } = content

    return (
        <div className="bg-[#0B1121] text-white py-24">
            <div className="container-custom">
                {/* Active Molecular Agents Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-[#d946ef] text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                            The Science Inside
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: science.title }}>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            {science.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {science.cards.map((card: any, idx: number) => (
                            <div key={idx} className="bg-[#131B3A] border border-white/5 p-8 rounded-2xl hover:border-[#d946ef]/50 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-[#1a1f3a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <card.icon className={`w-6 h-6 ${card.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Treatment Ritual Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    <div className="lg:col-span-5">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: ritual.title }}>
                        </h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            {ritual.subtitle}
                        </p>

                        <div className="bg-[#131B3A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#10b981] to-transparent"></div>
                            <div className="flex items-start">
                                <div className="mt-1 mr-4">
                                    <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Professional Tip</h4>
                                    <p className="text-gray-400 text-sm">
                                        {ritual.tip}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ritual.steps.map((step: any, idx: number) => (
                            <div key={idx} className="bg-[#1E1B4B]/30 border border-[#d946ef]/20 p-6 rounded-2xl relative overflow-hidden group hover:bg-[#1E1B4B]/50 transition-all">
                                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#1e293b] text-gray-500 flex items-center justify-center text-xs font-mono">{idx + 1}</div>
                                <div className={`w-10 h-10 rounded-lg ${step.bg || 'bg-white/10'} flex items-center justify-center mb-8 ${step.color}`}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold">{step.title}</h3>
                                    <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{step.time}</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
