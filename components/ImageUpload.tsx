'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void
  onError?: (error: string) => void
  className?: string
}

export default function ImageUpload({ onUpload, onError, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleUpload = useCallback(async (file: File) => {
    try {
      setIsUploading(true)

      // Create form data
      const formData = new FormData()
      formData.append('file', file)

      // Upload to our API
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const data = await response.json()
      
      // Update preview
      setPreview(data.url)
      
      // Call the onUpload callback with the image URL
      onUpload(data.url)
    } catch (error) {
      console.error('Upload error:', error)
      onError?.(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }, [onUpload, onError])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    }
  }, [handleUpload])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }, [handleUpload])

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          ${isUploading ? 'bg-gray-100' : 'hover:bg-gray-50'}
          transition-colors duration-200
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {isUploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Uploading...</span>
          </div>
        ) : preview ? (
          <div className="relative w-full aspect-video">
            <Image
              src={preview}
              alt="Uploaded preview"
              fill
              className="object-cover rounded"
            />
          </div>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag and drop an image here, or click to select
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF, WebP (max 5MB)
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </div>
  )
} 