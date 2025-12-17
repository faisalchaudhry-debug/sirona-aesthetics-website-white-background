import { createClient } from '@/utils/supabase/server'
import BlogCard from '@/components/BlogCard'
import { Search } from 'lucide-react'

export const revalidate = 60 // Revalidate every minute

export default async function BlogsPage() {
    const supabase = await createClient()

    // Fetch published blogs
    const { data: blogs, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Error fetching blogs:', error)
        return (
            <div className="bg-[#0B1121] min-h-screen py-32 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Unavailable</h2>
                <p className="text-gray-400">Unable to load insights at this time.</p>
            </div>
        )
    }

    return (
        <div className="bg-[#0B1121] min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#131B3A] to-transparent opacity-50"></div>
                <div className="absolute -top-32 left-1/2 w-96 h-96 bg-[#d946ef] rounded-full filter blur-[128px] opacity-10"></div>

                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#d946ef]/10 text-[#d946ef] text-xs font-bold uppercase tracking-wider mb-6 border border-[#d946ef]/20">
                        Knowledge Hub
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Latest <span className="text-[#d946ef]">Insights</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Expert articles, treatment protocols, and industry news for aesthetic professionals.
                    </p>
                </div>
            </div>

            <div className="container-custom pb-32">
                {blogs && blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center rounded-3xl border border-dashed border-white/10 bg-white/5">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                        <p className="text-gray-400">Check back soon for new content.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
