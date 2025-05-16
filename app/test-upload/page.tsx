'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      toast.success('Upload successful!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed'
      setError(message)
      toast.error(message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Test Image Upload</h1>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          Choose a file
        </label>

        {preview && (
          <div className="mt-4">
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={300}
              className="mx-auto rounded-lg"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full"
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
} 