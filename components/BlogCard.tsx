import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'

interface Blog {
    id: string
    title: string
    excerpt: string
    cover_image: string | null
    slug: string
    published_at: string
}

export default function BlogCard({ blog }: { blog: Blog }) {
    // Format date
    const date = new Date(blog.published_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <Link
            href={`/blogs/${blog.slug}`}
            className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#d946ef]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#d946ef]/10"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
                {blog.cover_image ? (
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center space-x-2 text-xs text-[#d946ef] font-bold uppercase tracking-wider mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{date}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#d946ef] transition-colors">
                    {blog.title}
                </h3>

                <div className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt || 'Read this article to learn more about the latest developments in aesthetic medicine.'}
                </div>

                <div className="flex items-center text-sm font-bold text-gray-900 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 text-[#d946ef]" />
                </div>
            </div>
        </Link>
    )
}
