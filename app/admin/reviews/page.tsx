import { createAdminClient } from '@/utils/supabase/admin'
import { Check, Star, Trash2 } from 'lucide-react'
import { approveReview, deleteReview } from './actions'
import { revalidatePath } from 'next/cache'

export const revalidate = 0

export default async function AdminReviewsPage() {
    let supabase;
    try {
        supabase = createAdminClient()
    } catch (error) {
        console.error('Failed to create admin client:', error)
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Review Management</h1>
                <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-12 text-center">
                    <p className="text-red-600 font-medium text-lg">Error: Failed to connect to database.</p>
                    <p className="text-red-400 text-sm mt-2">Please check SUPABASE_SERVICE_ROLE_KEY is set in .env.local</p>
                </div>
            </div>
        )
    }

    const { data: reviews, error } = await supabase
        .from('product_reviews')
        .select(`
            *,
            products:product_id (name, slug)
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching reviews:', error)
    }

    // Fetch profiles for each review's user_id
    let reviewsWithProfiles = reviews || []
    if (reviews && reviews.length > 0) {
        const userIds = [...new Set(reviews.map(r => r.user_id))]
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, email, full_name')
            .in('id', userIds)

        // Map profiles to reviews
        const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])
        reviewsWithProfiles = reviews.map(review => ({
            ...review,
            profiles: profileMap.get(review.user_id) || null
        }))
    }

    console.log('Reviews fetched:', reviewsWithProfiles.length, 'reviews')

    if (reviewsWithProfiles.length === 0) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Review Management</h1>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-500 font-medium text-lg">No reviews found.</p>
                    <p className="text-gray-400 text-sm mt-2">When customers leave reviews, they will appear here for approval.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Review Management</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reviewsWithProfiles.map((review) => (
                            <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{review.products?.name || 'Unknown Product'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{review.profiles?.full_name || 'Anonymous'}</div>
                                    <div className="text-xs text-gray-500">{review.profiles?.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-900 font-bold mr-1">{review.rating}</span>
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-500 line-clamp-2 max-w-xs">{review.comment}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${review.is_approved
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {review.is_approved ? 'Published' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        {!review.is_approved && (
                                            <form action={async () => {
                                                'use server'
                                                await approveReview(review.id)
                                            }}>
                                                <button type="submit" className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" title="Approve">
                                                    <Check className="w-5 h-5" />
                                                </button>
                                            </form>
                                        )}
                                        <form action={async () => {
                                            'use server'
                                            await deleteReview(review.id)
                                        }}>
                                            <button type="submit" className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Delete">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
