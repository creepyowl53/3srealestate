import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`
}

export function formatPriceINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} Lac`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`
  return `₹${amount}`
}

export function getLeadScoreColor(score: string): string {
  switch (score) {
    case 'HOT': return 'text-red-500 bg-red-50 border-red-200'
    case 'WARM': return 'text-orange-500 bg-orange-50 border-orange-200'
    case 'COLD': return 'text-blue-500 bg-blue-50 border-blue-200'
    default: return 'text-gray-500 bg-gray-50 border-gray-200'
  }
}

export function getLeadStatusColor(status: string): string {
  const map: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-700',
    CONTACTED: 'bg-yellow-100 text-yellow-700',
    INTERESTED: 'bg-purple-100 text-purple-700',
    SITE_VISIT: 'bg-orange-100 text-orange-700',
    NEGOTIATION: 'bg-amber-100 text-amber-700',
    CLOSED: 'bg-green-100 text-green-700',
    LOST: 'bg-red-100 text-red-700',
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}
