'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image_url: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    cartTotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    console.log('CartProvider mounting')
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error('Failed to parse cart', e)
            }
        }
    }, [])

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addItem = useCallback((newItem: CartItem) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === newItem.id)
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            }
            return [...currentItems, newItem]
        })
    }, [])

    const removeItem = useCallback((id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }, [])

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity < 1) return
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const cartCount = items.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
