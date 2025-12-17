import { createClient } from '@/utils/supabase/server'
import { Star, User } from 'lucide-react'

export default async function ReviewList({ productId }: { productId: string }) {
    const supabase = await createClient()

    const { data: reviews } = await supabase
        .from('product_reviews')
        .select(`
            *,
            profiles:user_id (
                full_name,
                company_name
            )
        `)
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                <p className="text-gray-500">Be the first to leave a review for this product.</p>
            </div>
        )
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-[#131B3A]">{averageRating.toFixed(1)}</div>
                <div>
                    <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(averageRating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">{reviews.length} Reviews</p>
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <div className="bg-gray-200 rounded-full p-2 mr-4">
                                    <User className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#131B3A]">
                                        {review.profiles?.full_name || 'Anonymous User'}
                                    </h4>
                                    {review.profiles?.company_name && (
                                        <p className="text-xs text-gray-500">{review.profiles.company_name}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= review.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(review.created_at).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
