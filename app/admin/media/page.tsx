'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Trash2, Upload, Copy, Image as ImageIcon, Check } from 'lucide-react'

interface MediaFile {
    name: string
    id: string | null
    updated_at: string
    created_at: string
    last_accessed_at: string
    metadata: Record<string, any>
}

export default function MediaGalleryPage() {
    const [files, setFiles] = useState<MediaFile[]>([])
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        fetchFiles()
    }, [])

    const fetchFiles = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .storage
            .from('media')
            .list(undefined, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            })

        if (error) {
            console.error('Error fetching files:', error)
            setMessage({ type: 'error', text: 'Failed to load images.' })
        } else {
            setFiles(data || [])
        }
        setLoading(false)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        setUploading(true)
        setMessage(null)
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error } = await supabase.storage
            .from('media')
            .upload(filePath, file)

        if (error) {
            setMessage({ type: 'error', text: 'Error uploading file: ' + error.message })
        } else {
            setMessage({ type: 'success', text: 'File uploaded successfully!' })
            fetchFiles()
        }
        setUploading(false)
        // Reset input
        e.target.value = ''
    }

    const handleDelete = async (fileName: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return

        const { error } = await supabase.storage
            .from('media')
            .remove([fileName])

        if (error) {
            setMessage({ type: 'error', text: 'Error deleting file: ' + error.message })
        } else {
            setMessage({ type: 'success', text: 'File deleted successfully!' })
            setFiles(files.filter(f => f.name !== fileName))
        }
    }

    const getPublicUrl = (fileName: string) => {
        const { data } = supabase.storage.from('media').getPublicUrl(fileName)
        return data.publicUrl
    }

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
        setCopiedUrl(url)
        setTimeout(() => setCopiedUrl(null), 2000)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="hidden"
                        id="media-upload"
                        disabled={uploading}
                    />
                    <label
                        htmlFor="media-upload"
                        className={`btn-primary flex items-center cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? (
                            <span className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></span>
                        ) : (
                            <Upload className="w-5 h-5 mr-2" />
                        )}
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : files.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by uploading a new image.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {files.map((file) => {
                        const url = getPublicUrl(file.name)
                        return (
                            <div key={file.id} className="group relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                                    <img
                                        src={url}
                                        alt={file.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                                        <button
                                            onClick={() => copyToClipboard(url)}
                                            className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
                                            title="Copy URL"
                                        >
                                            {copiedUrl === url ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(file.name)}
                                            className="p-2 bg-white rounded-full hover:bg-red-50 text-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-xs text-gray-500 truncate font-mono" title={file.name}>
                                        {file.name}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
