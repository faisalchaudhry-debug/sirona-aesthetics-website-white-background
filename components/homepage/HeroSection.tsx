'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function HeroSection() {
    const slides = [
        {
            id: 1,
            title: "The Science of Bio-Remodeling",
            subtitle: "Exclusive distributor of recombinant enzymes and tissue engineering solutions",
            cta: "View Products",
            link: "/products",
            // Using a gradient background as fallback/placeholder for video
            bgClass: "bg-gradient-to-br from-[#1a103c] to-[#000000]",
            video: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/idyhulsosib_1766163046840.mp4"
        },
        {
            id: 2,
            title: "PB Serum™ - Recombinant Innovation",
            subtitle: "The versatility of advanced enzymes for targeted aesthetic treatments",
            cta: "Discover PB Serum",
            link: "/products?brand=pbserum",
            bgClass: "bg-gradient-to-br from-[#2D2654] to-[#1e3a8a]",
            video: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/lh9pi7lnm6g_1766163058367.mp4"
        },
        {
            id: 3,
            title: "Professional Training Academy",
            subtitle: "Expert-led workshops and certification in enzymatic therapy",
            cta: "Join Academy",
            link: "/training",
            bgClass: "bg-gradient-to-br from-[#0f172a] to-[#3A3366]",
            image: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/vikk3r06c2_1766162482858.webp"
        }
    ];

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">0' + (index + 1) + '</span>';
                    },
                }}
                navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                }}
                loop={true}
                className="h-full w-full hero-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={`relative h-full w-full flex items-center ${slide.bgClass}`}>
                            {/* Background Video */}
                            {slide.video && (
                                <div className="absolute inset-0 z-0">
                                    <video
                                        src={slide.video}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                </div>
                            )}

                            {/* Background Image (Only if no video) */}
                            {slide.image && !slide.video && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Abstract Background Animation Placeholder (Only if no image and no video) */}
                            {!slide.image && !slide.video && (
                                <div className="absolute inset-0 opacity-40">
                                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
                                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 bg-gradient-to-r from-black/60 to-transparent"></div>

                            <div className="container-custom relative z-10 px-6 md:px-12">
                                <div className="max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards', animationDelay: '0.5s' }}>
                                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-light">
                                        {slide.subtitle}
                                    </p>

                                    <Link
                                        href={slide.link}
                                        className="group inline-flex items-center gap-3 px-8 py-4 border border-white/30 rounded-full text-white font-semibold transition-all duration-300 hover:bg-gradient-brand hover:border-transparent hover:scale-105"
                                    >
                                        {slide.cta}
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Controls */}
                <div className="absolute bottom-12 right-12 z-20 flex gap-4 hidden md:flex">
                    <button className="custom-prev w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer group">
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button className="custom-next w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer group">
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Custom Pagination Styling */}
                <style jsx global>{`
          .hero-swiper .swiper-pagination {
            bottom: 3rem !important;
            display: flex;
            justify-content: center;
            gap: 1.5rem;
          }
          .hero-swiper .swiper-pagination-bullet {
            width: auto;
            height: auto;
            background: transparent;
            opacity: 0.5;
            color: white;
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            position: relative;
          }
          .hero-swiper .swiper-pagination-bullet::after {
            content: '';
            width: 40px;
            height: 2px;
            background: rgba(255,255,255,0.3);
            transition: all 0.3s ease;
          }
          .hero-swiper .swiper-pagination-bullet-active {
            opacity: 1;
          }
          .hero-swiper .swiper-pagination-bullet-active::after {
            background: white;
            width: 60px;
            box-shadow: 0 0 10px rgba(255,255,255,0.5);
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
        `}</style>
            </Swiper>
        </section>
    );
}
