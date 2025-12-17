import { createClient } from '@/utils/supabase/server'
import BlogSidebar from '@/components/BlogSidebar'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, User, Edit } from 'lucide-react'
import { notFound } from 'next/navigation'
import AdminEditButton from '@/components/AdminEditButton'

export const revalidate = 60

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    // Fetch blog post
    const { data: blog, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

    if (error || !blog) {
        notFound()
    }

    // Format date
    const date = new Date(blog.published_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className="bg-[#0B1121] min-h-screen font-sans">
            {/* Hero Section with Background Image */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0">
                    {blog.cover_image && (
                        <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/80 to-[#131B3A]/60"></div>
                </div>

                <div className="container-custom relative z-10 w-full">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors text-sm font-bold tracking-wide"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO BLOGS
                    </Link>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                        {blog.category && (
                            <span className="px-3 py-1 rounded-full bg-[#d946ef] text-white font-bold uppercase text-xs tracking-wider">
                                {blog.category}
                            </span>
                        )}
                        <div className="flex items-center text-gray-300">
                            <Calendar className="w-4 h-4 mr-2 text-[#d946ef]" />
                            {date}
                        </div>
                        {blog.read_time && (
                            <div className="flex items-center text-gray-300">
                                <Clock className="w-4 h-4 mr-2 text-[#d946ef]" />
                                {blog.read_time}
                            </div>
                        )}
                        <AdminEditButton editUrl={`/admin/blogs/${blog.id}`} />
                        {/* Edit Button (Visible only to admins theoretically, but added here for completeness if needed later) */}
                        {/* <Link href={`/admin/blogs/${blog.id}`} className="flex items-center px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 ml-auto">
                            <Edit className="w-3 h-3 mr-1" /> Edit Blog
                        </Link> */}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl leading-relaxed border-l-4 border-[#d946ef] pl-6">
                        {blog.excerpt}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container-custom -mt-20 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Article Content */}
                    <div className="lg:col-span-8">
                        {/* Author Card */}
                        <div className="bg-[#131B3A]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 mb-12 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#2A3454] flex items-center justify-center border border-white/10">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-lg">{blog.author_name || 'Sirona Team'}</div>
                                <div className="text-gray-400 text-sm">{blog.author_role || 'Contributor'}</div>
                            </div>
                        </div>

                        {/* HTML Content */}
                        <article
                            className="
                                text-gray-300 text-lg leading-relaxed space-y-6 
                                prose prose-invert prose-lg max-w-none
                                prose-headings:text-white prose-headings:font-bold prose-headings:mb-4
                                prose-p:mb-6 prose-p:text-gray-300
                                prose-strong:text-white
                                prose-a:text-[#d946ef] prose-a:no-underline hover:prose-a:underline
                                prose-ul:list-disc prose-ul:pl-4 prose-ul:space-y-2
                            "
                            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}
