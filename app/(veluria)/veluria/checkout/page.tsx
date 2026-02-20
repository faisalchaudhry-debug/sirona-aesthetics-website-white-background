'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag, Loader2, Trash2 } from 'lucide-react'

export default function VeluriaCheckoutPage() {
  const { items, cartTotal, removeItem, updateQuantity } = useCart()
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const vat = cartTotal * 0.20
  const shipping = 7.50
  const total = cartTotal + vat + shipping

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/veluria-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, guestName, guestEmail }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0E0B1F] flex items-center justify-center text-white">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-white/40 text-sm mb-6">Add some Veluria products to continue.</p>
          <Link
            href="/veluria"
            className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#F5D98B] transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Veluria
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0E0B1F] text-white pt-8 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/veluria"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Veluria
        </Link>

        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-white/40 text-sm mb-10">No account needed — enter your details below.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left: Guest Details Form ── */}
          <div>
            <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-6">
              Your Details
            </h2>

            <form onSubmit={handleCheckout} className="space-y-5">
              <div>
                <label className="block text-sm text-white/60 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Dr. Jane Smith"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="jane@clinic.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
                <p className="text-white/30 text-xs mt-2">
                  Your order confirmation will be sent here by Stripe.
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-3.5 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', color: '#0E0B1F' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  `Pay £${total.toFixed(2)}`
                )}
              </button>

              <p className="text-white/25 text-xs text-center leading-relaxed">
                Secure payment via Stripe. You will be redirected to complete payment.
                VAT (20%) and postage (£7.50) are included in the total above.
              </p>
            </form>
          </div>

          {/* ── Right: Order Summary ── */}
          <div>
            <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
                >
                  {item.image_url && (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#1A1535] shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  )}

                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-sm text-white leading-snug line-clamp-2">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="text-white/60 text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-2">
                    <p className="font-bold text-[#F5D98B] text-sm">
                      £{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-white/25 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal</span>
                <span>£{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>Postage & Packing</span>
                <span>£{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-lg pt-3 border-t border-white/10">
                <span>Total</span>
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #C9A84C, #F5D98B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
