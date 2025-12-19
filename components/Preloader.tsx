'use client'

import React from 'react'

export default function Preloader() {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/60 backdrop-blur-md transition-opacity duration-300">
            <div className="relative flex items-center justify-center">
                {/* Spinning Ring */}
                <div className="absolute w-24 h-24 rounded-full border-4 border-gray-100 border-t-[#C5A059] animate-spin"></div>

                {/* Logo */}
                <img
                    src="https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/5cex07u4g1_1765985064905.png"
                    alt="Loading..."
                    className="w-12 h-auto"
                />
            </div>
        </div>
    )
}
