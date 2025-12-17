import { createBlog } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewBlogPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <Link href="/admin/blogs" className="text-gray-500 hover:text-gray-700 mr-4">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">New Article</h1>
            </div>

            <form action={async (formData) => {
                'use server'
                await createBlog(formData)
            }} className="space-y-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">

                {/* Main Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                        <input name="title" type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" placeholder="e.g. Understanding UKRP" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                        <input name="slug" type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" placeholder="e.g. understanding-ukrp" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900">
                            <option value="Regulation">Regulation</option>
                            <option value="Science">Science</option>
                            <option value="Practice">Practice</option>
                            <option value="News">News</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                        <textarea name="excerpt" rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" placeholder="Brief description for cards..."></textarea>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML Support)</label>
                    <textarea name="content" rows={15} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm text-gray-900" placeholder="<p>Write your article content here...</p>"></textarea>
                    <p className="text-xs text-gray-500 mt-2">Use HTML tags for formatting (e.g. &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;)</p>
                </div>

                <div className="border-t border-gray-100 pt-6"></div>

                {/* Author & Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                        <input name="author_name" type="text" defaultValue="Edward Odofin" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author Role</label>
                        <input name="author_role" type="text" defaultValue="Head of Science" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                        <input name="read_time" type="text" defaultValue="5 min read" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                        <input name="published_at" type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6"></div>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image Upload</label>
                        <input name="imageFile" type="file" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Or Cover Image URL</label>
                        <input name="cover_image_url" type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900" placeholder="https://..." />
                    </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                    <input name="is_published" type="checkbox" id="is_published" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <label htmlFor="is_published" className="text-sm font-medium text-gray-900">Publish immediately</label>
                </div>

                <div className="flex justify-end pt-6">
                    <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center">
                        <Save className="w-5 h-5 mr-2" />
                        Create Article
                    </button>
                </div>
            </form>
        </div>
    )
}
