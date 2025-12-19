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
        <section className="py-24 bg-white relative">
            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">Knowledge Hub</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Insights</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center px-8 py-3 rounded-full border border-primary/20 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                    >
                        View All Articles <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

