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
            className="group block bg-[#1A1433] border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,38,84,0.6)] flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
                {blog.cover_image ? (
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1433] to-transparent opacity-60"></div>

                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs text-white uppercase tracking-wider font-bold">{date}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-accent transition-colors leading-tight">
                    {blog.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {blog.excerpt || 'Read this article to learn more about the latest developments in aesthetic medicine.'}
                </p>

                <div className="mt-auto flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 text-accent" />
                </div>
            </div>
        </Link>
    )
}
