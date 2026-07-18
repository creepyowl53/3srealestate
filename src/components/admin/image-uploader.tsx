'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, ImagePlus } from 'lucide-react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUploader({ value, onChange, label = 'Cover Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB')
      return
    }

    setError('')
    setUploading(true)
    setProgress('Preparing upload...')

    try {
      const formData = new FormData()
      formData.append('file', file)

      setProgress('Uploading to server...')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok && data.url) {
        onChange(data.url)
        setProgress('')
      } else {
        setError(data.error || 'Upload failed. Please try again.')
        setProgress('')
      }
    } catch (e) {
      setError('Upload failed. Check your internet connection.')
      setProgress('')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // Reset input so same file can be selected again
    e.target.value = ''
  }

  return (
    <div>
      <label className="block text-white/60 text-xs mb-1.5 font-medium uppercase tracking-wide">
        {label}
      </label>

      {/* Image preview */}
      {value && !uploading && (
        <div className="relative w-full h-52 rounded-xl overflow-hidden mb-3 border border-white/10 group">
          <Image
            src={value}
            alt="Property image preview"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 bg-white text-charcoal-900 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex items-center gap-2 bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Upload area — shown when no image or uploading */}
      {(!value || uploading) && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`w-full h-52 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${
            uploading
              ? 'border-gold-500/50 bg-gold-500/5 cursor-wait'
              : 'border-white/20 hover:border-gold-500 hover:bg-white/5 cursor-pointer'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-9 h-9 text-gold-400 animate-spin" />
              <p className="text-white/60 text-sm">{progress}</p>
              <p className="text-white/30 text-xs">Please wait...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                <ImagePlus className="w-7 h-7 text-white/30" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">
                  Click to upload or drag & drop
                </p>
                <p className="text-white/30 text-xs mt-1">
                  PNG, JPG, WEBP — max 10MB
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-lg px-4 py-2">
                <Upload className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-xs font-medium">
                  📱 Phone gallery or 💻 Computer files
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input — accepts images, opens gallery on mobile */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* URL fallback input */}
      <div className="mt-3">
        <p className="text-white/30 text-xs mb-1.5">Or paste an image URL:</p>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-charcoal-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 transition-colors"
        />
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-400 text-xs">
          <X className="w-3.5 h-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}