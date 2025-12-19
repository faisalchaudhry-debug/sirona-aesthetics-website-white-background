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
            <div className="bg-white min-h-screen py-32 text-center text-sirona-navy">
                <h2 className="text-2xl font-bold mb-4">Unavailable</h2>
                <p className="text-gray-500">Unable to load insights at this time.</p>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-accent selection:text-white">

            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-brand opacity-[0.03] rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-[0.03] rounded-full blur-[150px]"></div>
            </div>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden text-center z-10 bg-[#2D2654]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container-custom relative z-10">
                    <span className="inline-block py-2 px-4 rounded-full bg-white/10 border border-white/10 text-accent text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                        Knowledge Hub
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Latest <span className="text-gradient-ocean">Insights</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Expert articles, treatment protocols, and industry news for aesthetic professionals.
                    </p>
                </div>
            </div>

            <div className="container-custom py-20 relative z-10">
                {blogs && blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center rounded-[3rem] border border-dashed border-gray-200 bg-gray-50">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-sirona-navy mb-2">No articles found</h3>
                        <p className="text-gray-500">Check back soon for new content.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
