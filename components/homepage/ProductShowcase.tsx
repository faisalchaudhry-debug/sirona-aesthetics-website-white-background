'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductShowcase() {
    const products = [
        {
            id: "pbserum",
            name: "PB Serum™",
            description: "The versatility of recombinant enzymes for targeted treatments",
            detail: "Three enzymes. Infinite possibilities. Treat fibrosis, scars, and localized fat with precision.",
            image: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/m2g0mlzca6l_1765985406595.png", // Using existing image URL
            bg: "bg-[#3A3366]",
            gradient: "from-[#3A3366] to-[#2D2654]",
            align: "left"
        },
        {
            id: "novacutan",
            name: "Novacutan™",
            description: "Exo-protection technology targeting skin aging from an environmental level",
            detail: "Protects against UV, HEV, and environmental pollutants while restoring skin youth.",
            image: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/esxjq61117w_1765985399210.png",
            bg: "bg-[#2D2654]",
            gradient: "from-[#2D2654] to-[#1A1433]",
            align: "right"
        },
        {
            id: "smartker",
            name: "Smartker™",
            description: "Post-procedure care extending the result of clinical treatments",
            detail: "Advanced recovery formulas that minimize downtime and enhance procedural outcomes.",
            image: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/fwghhcavb34_1765985413011.png",
            bg: "bg-[#3A3366]",
            gradient: "from-[#3A3366] to-[#252040]",
            align: "left"
        }
    ];

    return (
        <section className="py-24 bg-gray-50 relative">
            <div className="container-custom mb-20 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-sirona-navy mb-6">Our <span className="text-gradient">Portfolio</span></h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Curated solutions for fibrosis, localized fat reduction, and rejuvenation.
                </p>
            </div>

            <div className="flex flex-col">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`relative min-h-[600px] w-full flex flex-col md:flex-row items-center overflow-hidden ${product.gradient} bg-gradient-to-r`}
                    >
                        {product.align === 'left' ? (
                            <>
                                <div className="w-full md:w-3/5 h-full min-h-[400px] md:min-h-[600px] relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    {/* Using a background image approach for bleeding effect */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${product.image})` }}
                                    ></div>
                                </div>

                                <div className="w-full md:w-2/5 p-12 md:p-20 relative z-20">
                                    <div className="mb-4 inline-block w-16 h-1 bg-gradient-brand rounded-full"></div>
                                    <h3 className="text-4xl font-bold text-white mb-4">{product.name}</h3>
                                    <h4 className="text-xl text-gray-200 font-medium mb-6">{product.description}</h4>
                                    <p className="text-gray-300 mb-10 leading-relaxed">
                                        {product.detail}
                                    </p>

                                    <Link
                                        href={`/products`}
                                        className="group inline-flex items-center text-white font-bold tracking-wider uppercase text-sm border-b-2 border-transparent hover:border-white transition-all pb-1 gap-2"
                                    >
                                        Learn More
                                        <ArrowRight className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            // Mirror Layout
                            <>
                                <div className="w-full md:w-2/5 p-12 md:p-20 relative z-20 order-2 md:order-1">
                                    <div className="mb-4 inline-block w-16 h-1 bg-gradient-brand rounded-full"></div>
                                    <h3 className="text-4xl font-bold text-white mb-4">{product.name}</h3>
                                    <h4 className="text-xl text-gray-200 font-medium mb-6">{product.description}</h4>
                                    <p className="text-gray-300 mb-10 leading-relaxed">
                                        {product.detail}
                                    </p>

                                    <Link
                                        href={`/products`}
                                        className="group inline-flex items-center text-white font-bold tracking-wider uppercase text-sm border-b-2 border-transparent hover:border-white transition-all pb-1 gap-2"
                                    >
                                        Learn More
                                        <ArrowRight className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
                                    </Link>
                                </div>

                                <div className="w-full md:w-3/5 h-full min-h-[400px] md:min-h-[600px] relative group overflow-hidden order-1 md:order-2">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${product.image})` }}
                                    ></div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
