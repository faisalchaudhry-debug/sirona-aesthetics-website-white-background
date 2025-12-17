'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react'

export default function CartPage() {
    const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
                    <Link href="/products" className="btn-primary inline-flex items-center">
                        Browse Products <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <span className="text-xs text-gray-400">No Image</span>
                                    )}
                                </div>

                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-primary font-bold">£{item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 text-gray-500 hover:text-primary transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 text-gray-500 hover:text-primary transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>£{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>£{cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={async () => {
                                    try {
                                        const response = await fetch('/api/checkout', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ items }),
                                        })
                                        const data = await response.json()
                                        if (data.url) {
                                            window.location.href = data.url
                                        } else {
                                            alert('Checkout failed: ' + (data.error || 'Unknown error'))
                                        }
                                    } catch (error) {
                                        console.error('Checkout error:', error)
                                        alert('An error occurred during checkout.')
                                    }
                                }}
                                className="w-full btn-primary py-3 font-bold text-lg shadow-lg shadow-blue-500/20 mb-4"
                            >
                                Proceed to Checkout
                            </button>

                            <Link href="/products" className="block text-center text-gray-500 hover:text-primary text-sm font-medium">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
