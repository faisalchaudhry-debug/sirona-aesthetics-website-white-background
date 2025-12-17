import { createClient } from '@/utils/supabase/server'
import { updateBlog } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: blog } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

    if (!blog) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link href="/admin/blogs" className="text-gray-500 hover:text-gray-700 mr-4">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Article</h1>
                </div>
                <Link
                    href={`/blogs/${blog.slug}`}
                    target="_blank"
                    className="text-primary hover:text-blue-700 flex items-center text-sm font-bold"
                >
                    View Live <Eye className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <form action={updateBlog} className="space-y-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <input type="hidden" name="blogId" value={blog.id} />
                <input type="hidden" name="current_cover_image" value={blog.cover_image || ''} />

                {/* Main Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                        <input name="title" type="text" required defaultValue={blog.title} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                        <input name="slug" type="text" required defaultValue={blog.slug} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" defaultValue={blog.category || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900">
                            <option value="Regulation">Regulation</option>
                            <option value="Science">Science</option>
                            <option value="Practice">Practice</option>
                            <option value="News">News</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                        <textarea name="excerpt" rows={3} defaultValue={blog.excerpt || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"></textarea>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML Support)</label>
                    <textarea name="content" rows={15} defaultValue={blog.content || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm text-gray-900"></textarea>
                </div>

                <div className="border-t border-gray-100 pt-6"></div>

                {/* Author & Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                        <input name="author_name" type="text" defaultValue={blog.author_name || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author Role</label>
                        <input name="author_role" type="text" defaultValue={blog.author_role || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                        <input name="read_time" type="text" defaultValue={blog.read_time || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                        <input name="published_at" type="date" defaultValue={blog.published_at ? new Date(blog.published_at).toISOString().split('T')[0] : ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6"></div>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Cover Image</label>
                        <input name="imageFile" type="file" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Or Text URL</label>
                        <input name="cover_image_url" type="text" defaultValue={blog.cover_image || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                        {blog.cover_image && (
                            <div className="mt-2 text-xs text-gray-500 truncate">Current: {blog.cover_image}</div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                    <input name="is_published" type="checkbox" id="is_published" defaultChecked={blog.is_published} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <label htmlFor="is_published" className="text-sm font-medium text-gray-900">Published</label>
                </div>

                <div className="flex justify-end pt-6">
                    <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center">
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
