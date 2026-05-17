'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterInput } from '@/lib/validations'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Registration failed')
      } else {
        router.push('/login?registered=1')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-charcoal-900 border border-white/10 rounded-2xl p-8 shadow-luxury">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold text-white mb-1">Create Account</h1>
          <p className="text-white/50 text-sm">Join 3S Real Estate today</p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { name: 'name' as const, label: 'Full Name', placeholder: 'Rahul Sharma', type: 'text' },
            { name: 'email' as const, label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
            { name: 'phone' as const, label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
            { name: 'password' as const, label: 'Password', placeholder: '••••••••', type: 'password' },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name}>
              <label className="block text-white/70 text-sm mb-1.5">{label}</label>
              <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
              {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]?.message}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-luxury py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-white/40 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-gold-400 hover:text-gold-300 transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
