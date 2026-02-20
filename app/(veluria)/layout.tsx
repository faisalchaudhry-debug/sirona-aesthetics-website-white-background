import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "../globals.css"
import { Providers } from "@/components/Providers"
import Footer from "@/components/Footer"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VELURIA | Cosmetic Bioremodeling Solutions",
  description:
    "Professional cosmetic bioremodeling solutions by PB Serum — Silk Skin, Ultra Lift, Pearl Tone, Hair Force+",
}

export default function VeluriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
