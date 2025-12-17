'use client'

import { useState, useActionState } from 'react'
import { Star } from 'lucide-react'
import { submitReview } from '@/app/(main)/products/[slug]/actions'

type FormState = {
    error?: string
    success?: string
}

const initialState: FormState = {
    error: '',
    success: ''
}

export default function ReviewForm({ productId, slug }: { productId: string, slug: string }) {
    const [state, formAction, isPending] = useActionState(submitReview, initialState)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    return (
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#131B3A] mb-4">Leave a Review</h3>

            <form action={formAction} className="space-y-4">
                <input type="hidden" name="productId" value={productId} />
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="rating" value={rating} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex bg-white p-3 rounded-lg border border-gray-200 w-fit">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="focus:outline-none"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            >
                                <Star
                                    className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        className="w-full rounded-lg border-gray-200 focus:border-[#d946ef] focus:ring-[#d946ef] bg-white p-3 text-gray-900"
                        placeholder="Share your experience with this product..."
                        required
                    />
                </div>

                {state?.error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                        {state.success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending || rating === 0}
                    className="w-full md:w-auto px-8 py-3 bg-[#131B3A] text-white font-bold rounded-lg hover:bg-[#1a254a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    )
}
