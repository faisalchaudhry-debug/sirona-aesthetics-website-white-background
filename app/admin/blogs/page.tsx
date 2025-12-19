import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2, FileText, ExternalLink, RotateCcw } from 'lucide-react'
import { deleteBlog, restoreBlog, permanentDeleteBlog } from './actions'

export const revalidate = 0

export default async function AdminBlogsPage({
    searchParams,
}: {
    searchParams: Promise<{ view?: string }>
}) {
    const supabase = await createClient()
    const { view } = await searchParams
    const isTrashView = view === 'trash'

    let query = supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false })

    if (isTrashView) {
        query = query.not('deleted_at', 'is', null)
    } else {
        query = query.is('deleted_at', null)
    }

    const { data: blogs } = await query

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
                <div className="flex items-center space-x-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <Link
                            href="/admin/blogs"
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${!isTrashView ? 'bg-white text-sirona-navy shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Active
                        </Link>
                        <Link
                            href="/admin/blogs?view=trash"
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${isTrashView ? 'bg-white text-sirona-navy shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Trash
                        </Link>
                    </div>
                    {!isTrashView && (
                        <Link
                            href="/admin/blogs/new"
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-blue-900 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Write Article
                        </Link>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 font-medium">Article</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Author</th>
                                <th className="px-6 py-3 font-medium">Published</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {blogs?.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 text-gray-300 bg-gray-100 rounded-lg flex items-center justify-center mr-3 overflow-hidden shrink-0">
                                                {blog.cover_image ? (
                                                    <img src={blog.cover_image} alt={blog.title} className="h-full w-full object-cover" />
                                                ) : (
                                                    <FileText className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 line-clamp-1">{blog.title}</div>
                                                <div className="text-xs text-gray-500 font-mono">{blog.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                            {blog.category || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{blog.author_name}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {isTrashView ? (
                                            <span className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">Deleted</span>
                                        ) : blog.is_published ? (
                                            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">Published</span>
                                        ) : (
                                            <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">Draft</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {isTrashView ? (
                                            <>
                                                <form action={async () => {
                                                    'use server'
                                                    await restoreBlog(blog.id)
                                                }} className="inline-block">
                                                    <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Restore">
                                                        <RotateCcw className="w-4 h-4" />
                                                    </button>
                                                </form>
                                                <form action={async () => {
                                                    'use server'
                                                    if (blog.deleted_at) {
                                                        await permanentDeleteBlog(blog.id)
                                                    }
                                                }} className="inline-block">
                                                    <button className="text-red-500 hover:text-red-700 transition-colors" title="Delete Permanently">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={`/blogs/${blog.slug}`}
                                                    target="_blank"
                                                    className="text-gray-400 hover:text-gray-600 transition-colors inline-block"
                                                    title="View Live"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/blogs/${blog.id}`}
                                                    className="text-gray-400 hover:text-primary transition-colors inline-block"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <form action={async () => {
                                                    'use server'
                                                    await deleteBlog(blog.id)
                                                }} className="inline-block">
                                                    <button className="text-gray-400 hover:text-red-600 transition-colors" title="Move to Trash">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {(!blogs || blogs.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        {isTrashView ? 'Trash is empty.' : 'No blogs found. Start by writing one.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
