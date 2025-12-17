import { createClient } from '@/utils/supabase/server'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function LatestBlogs() {
    const supabase = await createClient()

    // Fetch latest 3 published blogs
    const { data: blogs } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3)

    if (!blogs || blogs.length === 0) {
        return null
    }

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <div className="inline-block mb-4 px-3 py-1 rounded bg-[#d946ef]/10 text-[#d946ef] text-xs uppercase tracking-wider font-bold">
                            Knowledge Hub
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Latest <span className="text-gray-500">Insights</span>
                        </h2>
                    </div>
                    <Link
                        href="/blogs"
                        className="hidden md:flex items-center text-gray-900 hover:text-[#d946ef] font-bold transition-colors mt-6 md:mt-0"
                    >
                        View All Articles <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>

                <Link
                    href="/blogs"
                    className="flex md:hidden items-center justify-center text-gray-900 hover:text-[#d946ef] font-bold transition-colors mt-12 w-full py-4 bg-gray-100 rounded-lg"
                >
                    View All Articles <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </div>
        </section>
    )
}
