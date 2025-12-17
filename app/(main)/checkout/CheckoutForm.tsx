'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { updateAddress } from '@/app/actions/address'
import { Loader2 } from 'lucide-react'

// Define the shape of the profile passed from the server
interface Profile {
    id: string
    full_name: string | null
    company_name: string | null
    phone: string | null
    email: string | null
    address_line1: string | null
    address_line2: string | null
    city: string | null
    state: string | null
    postal_code: string | null
    country: string | null
}

export default function CheckoutForm({ userProfile }: { userProfile: Profile }) {
    const { items, cartTotal } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        setError(null)

        try {
            // 1. Save address
            const result = await updateAddress(formData)
            if (result?.error) {
                throw new Error(result.error)
            }

            // 2. Create Stripe Session
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed')
            }

            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error('No checkout URL received')
            }
        } catch (err: any) {
            console.error('Checkout error:', err)
            setError(err.message || 'An unexpected error occurred')
            setLoading(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                <p className="mt-2 text-gray-600">Add some items before checking out.</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping Address Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">Shipping Address</h2>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    id="full_name"
                                    defaultValue={userProfile.full_name || ''}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border text-gray-900 bg-white"
                                    required // Assuming full name is required for shipping
                                    readOnly // Assuming name is managed in profile settings, or remove readOnly if editable
                                />
                                <p className="text-xs text-gray-500 mt-1">Managed in Profile Settings</p>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                                <input
                                    type="text"
                                    name="address_line1"
                                    id="address_line1"
                                    defaultValue={userProfile.address_line1 || ''}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border text-gray-900 bg-white"
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    name="address_line2"
                                    id="address_line2"
                                    defaultValue={userProfile.address_line2 || ''}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border text-gray-900 bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    defaultValue={userProfile.city || ''}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border text-gray-900 bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    defaultValue={userProfile.state || ''}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border text-gray-900 bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    defaultValue={userProfile.postal_code || ''}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border text-gray-900 bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    defaultValue={userProfile.country || ''}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border text-gray-900 bg-white"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm mt-2">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 btn-primary py-3 font-bold text-lg shadow-lg flex justify-center items-center"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : 'Proceed to Payment'}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-xl h-fit">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-900">{item.name}</span>
                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                </div>
                                <span className="font-medium text-gray-900">£{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-4 flex justify-between items-center font-bold text-lg text-gray-900">
                            <span>Total</span>
                            <span>£{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
