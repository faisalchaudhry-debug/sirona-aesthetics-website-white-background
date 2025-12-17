'use client'

import { useState, useRef, useEffect } from 'react'
import { updateOrderStatus } from './actions'
import { ChevronDown, Check } from 'lucide-react'
import { createPortal } from 'react-dom'

interface OrderStatusSelectProps {
    orderId: string
    currentStatus: string
}

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
]

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState(currentStatus)
    const [isLoading, setIsLoading] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
    const buttonRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    // Calculate dropdown position when opening
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            setDropdownPosition({
                top: rect.bottom + 4,
                left: rect.left
            })
        }
    }, [isOpen])

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === status) {
            setIsOpen(false)
            return
        }

        setIsLoading(true)
        setIsOpen(false)

        const previousStatus = status
        setStatus(newStatus)

        try {
            const result = await updateOrderStatus(orderId, newStatus)
            if (result.error) {
                setStatus(previousStatus)
                alert('Failed to update status: ' + result.error)
            }
        } catch (error) {
            setStatus(previousStatus)
            alert('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const currentLabel = STATUS_OPTIONS.find(opt => opt.value === status)?.label || status

    const dropdownMenu = (
        <div
            ref={dropdownRef}
            className="w-[140px] bg-white rounded-md shadow-xl border border-gray-200 overflow-hidden"
            style={{
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 99999
            }}
        >
            {STATUS_OPTIONS.map((option, index) => (
                <button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className={`
                        flex items-center justify-between w-full px-3 py-2.5 text-sm text-left transition-colors
                        ${option.value === status
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                        ${index !== STATUS_OPTIONS.length - 1 ? 'border-b border-gray-100' : ''}
                    `}
                >
                    {option.label}
                    {option.value === status && <Check className="w-4 h-4" />}
                </button>
            ))}
        </div>
    )

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoading}
                className={`
                    flex items-center justify-between min-w-[120px] px-3 py-1.5 text-sm font-medium rounded-md border-2 transition-all duration-150
                    ${isOpen
                        ? 'border-indigo-400 ring-2 ring-indigo-100 bg-indigo-50 text-indigo-700'
                        : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:border-indigo-400'
                    }
                    focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                <span>{currentLabel}</span>
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && mounted && createPortal(dropdownMenu, document.body)}
        </div>
    )
}
