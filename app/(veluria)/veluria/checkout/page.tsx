'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag, Loader2, Trash2, MapPin, User, CreditCard } from 'lucide-react'

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors'

const labelClass = 'block text-sm text-white/60 mb-2'

interface AddressFields {
  line1: string
  line2: string
  city: string
  postcode: string
  country: string
}

const EMPTY_ADDRESS: AddressFields = { line1: '', line2: '', city: '', postcode: '', country: 'GB' }

const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'IE', name: 'Ireland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'AE', name: 'United Arab Emirates' },
]

function AddressForm({
  values,
  onChange,
  prefix,
}: {
  values: AddressFields
  onChange: (field: keyof AddressFields, value: string) => void
  prefix: string
}) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={`${prefix}-line1`} className={labelClass}>
          Address Line 1 *
        </label>
        <input
          id={`${prefix}-line1`}
          type="text"
          required
          value={values.line1}
          onChange={(e) => onChange('line1', e.target.value)}
          placeholder="123 High Street"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${prefix}-line2`} className={labelClass}>
          Address Line 2 <span className="text-white/30">(optional)</span>
        </label>
        <input
          id={`${prefix}-line2`}
          type="text"
          value={values.line2}
          onChange={(e) => onChange('line2', e.target.value)}
          placeholder="Apartment, suite, unit…"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${prefix}-city`} className={labelClass}>
            City *
          </label>
          <input
            id={`${prefix}-city`}
            type="text"
            required
            value={values.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="London"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${prefix}-postcode`} className={labelClass}>
            Postcode *
          </label>
          <input
            id={`${prefix}-postcode`}
            type="text"
            required
            value={values.postcode}
            onChange={(e) => onChange('postcode', e.target.value)}
            placeholder="SW1A 1AA"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${prefix}-country`} className={labelClass}>
          Country *
        </label>
        <select
          id={`${prefix}-country`}
          required
          value={values.country}
          onChange={(e) => onChange('country', e.target.value)}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code} className="bg-[#1A1535] text-white">
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default function VeluriaCheckoutPage() {
  const { items, cartTotal, removeItem, updateQuantity } = useCart()

  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [shipping, setShipping] = useState<AddressFields>({ ...EMPTY_ADDRESS })
  const [billingSame, setBillingSame] = useState(true)
  const [billing, setBilling] = useState<AddressFields>({ ...EMPTY_ADDRESS })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const vat = cartTotal * 0.2
  const shippingCost = 7.5
  const total = cartTotal + vat + shippingCost

  const handleShippingChange = (field: keyof AddressFields, value: string) =>
    setShipping((prev) => ({ ...prev, [field]: value }))

  const handleBillingChange = (field: keyof AddressFields, value: string) =>
    setBilling((prev) => ({ ...prev, [field]: value }))

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/veluria-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          guestName,
          guestEmail,
          phone,
          shippingAddress: shipping,
          billingAddress: billingSame ? shipping : billing,
        }),
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
          <form onSubmit={handleCheckout} className="space-y-8">

            {/* ── Section 1: Contact Details ── */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)' }}>
                  <User className="w-3.5 h-3.5 text-[#0E0B1F]" />
                </div>
                <h2 className="text-xs font-bold text-white/70 uppercase tracking-[0.2em]">
                  Contact Details
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Dr. Jane Smith"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="jane@clinic.com"
                    className={inputClass}
                  />
                  <p className="text-white/30 text-xs mt-2">
                    Your order confirmation will be sent here by Stripe.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7700 900000"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* ── Section 2: Shipping Address ── */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)' }}>
                  <MapPin className="w-3.5 h-3.5 text-[#0E0B1F]" />
                </div>
                <h2 className="text-xs font-bold text-white/70 uppercase tracking-[0.2em]">
                  Shipping Address
                </h2>
              </div>

              <AddressForm values={shipping} onChange={handleShippingChange} prefix="shipping" />
            </div>

            {/* ── Section 3: Billing Address ── */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)' }}>
                  <CreditCard className="w-3.5 h-3.5 text-[#0E0B1F]" />
                </div>
                <h2 className="text-xs font-bold text-white/70 uppercase tracking-[0.2em]">
                  Billing Address
                </h2>
              </div>

              {/* Toggle */}
              <label className="flex items-center gap-3 cursor-pointer mb-5 group w-fit">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={billingSame}
                    onChange={(e) => setBillingSame(e.target.checked)}
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-all duration-300 ${
                      billingSame ? '' : 'bg-white/10'
                    }`}
                    style={billingSame ? { background: 'linear-gradient(135deg, #C9A84C, #F5D98B)' } : {}}
                  />
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                      billingSame ? 'left-6' : 'left-1'
                    }`}
                  />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors select-none">
                  Billing address same as shipping
                </span>
              </label>

              {/* Billing fields — shown only when unchecked */}
              {!billingSame && (
                <div className="border border-white/10 rounded-2xl p-5 bg-white/[0.02]">
                  <AddressForm values={billing} onChange={handleBillingChange} prefix="billing" />
                </div>
              )}
            </div>

            {/* ── Error ── */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-3.5 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
                <span>Postage &amp; Packing</span>
                <span>£{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-lg pt-3 border-t border-white/10">
                <span>Total</span>
                <span
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #C9A84C, #F5D98B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
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
