'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inquirySchema, InquiryInput } from '@/lib/validations'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface Props {
  propertyId?: string
  propertyTitle?: string
}

export function InquiryForm({ propertyId, propertyTitle }: Props) {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { propertyId },
  })

  const onSubmit = async (data: InquiryInput) => {
    setLoading(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 5000)
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
        <p className="font-semibold text-charcoal-800">Inquiry Sent!</p>
        <p className="text-gray-500 text-sm">We'll call you within 30 minutes.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <p className="text-sm font-semibold text-charcoal-800">Send Inquiry</p>
      <input
        {...register('name')}
        placeholder="Your Name *"
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400"
      />
      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

      <input
        {...register('phone')}
        placeholder="Phone Number *"
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400"
      />
      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}

      <input
        {...register('email')}
        type="email"
        placeholder="Email (optional)"
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400"
      />

      <textarea
        {...register('message')}
        placeholder={`I'm interested in ${propertyTitle || 'this property'}. Please share more details.`}
        rows={3}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 resize-none"
      />

      <input type="hidden" {...register('propertyId')} />

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-luxury py-3 rounded-lg text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  )
}
