'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const propertyTypes = ['FLAT', 'VILLA', 'PLOT', 'COMMERCIAL', 'LUXURY', 'RENTAL', 'AGRICULTURAL', 'RESIDENTIAL']
const cities = ['Mohali', 'Chandigarh', 'Zirakpur', 'Kharar', 'New Chandigarh']
const budgets = [
  { label: 'Under 30L', min: 0, max: 3000000 },
  { label: '30–50L', min: 3000000, max: 5000000 },
  { label: '50L–1Cr', min: 5000000, max: 10000000 },
  { label: '1–2Cr', min: 10000000, max: 20000000 },
  { label: '2Cr+', min: 20000000, max: 999999999 },
]
const sortOptions = [
  { label: 'Newest First', value: 'createdAt_desc' },
  { label: 'Price: Low–High', value: 'price_asc' },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Most Viewed', value: 'viewCount_desc' },
]

export function PropertyFilter({ currentParams }: { currentParams: Record<string, string | undefined> }) {
  const router = useRouter()
  const [search, setSearch] = useState(currentParams.search || '')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateParam = (key: string, value: string | undefined) => {
    const params = new URLSearchParams()
    const merged = { ...currentParams, [key]: value, page: '1' }
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v) })
    if (!value) params.delete(key)
    router.push(`/properties?${params.toString()}`)
  }

  const clearAll = () => router.push('/properties')

  const hasFilters = Object.values(currentParams).some(Boolean)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {/* Search row */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && updateParam('search', search || undefined)}
            placeholder="Search by locality, project, city..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200"
          />
        </div>
        <select
          value={currentParams.city || ''}
          onChange={(e) => updateParam('city', e.target.value || undefined)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 bg-white min-w-[130px]"
        >
          <option value="">All Cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={currentParams.type || ''}
          onChange={(e) => updateParam('type', e.target.value || undefined)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold-400 bg-white min-w-[130px]"
        >
          <option value="">All Types</option>
          {propertyTypes.map((t) => <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>)}
        </select>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${showAdvanced ? 'border-gold-400 bg-gold-50 text-gold-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        {hasFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 px-3 py-2.5 text-sm text-red-500 hover:text-red-700 transition-colors">
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">Purpose</label>
            <select
              value={currentParams.purpose || ''}
              onChange={(e) => updateParam('purpose', e.target.value || undefined)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 bg-white"
            >
              <option value="">Any</option>
              <option value="SALE">For Sale</option>
              <option value="RENT">For Rent</option>
              <option value="INVESTMENT">Investment</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">Bedrooms</label>
            <select
              value={currentParams.bedrooms || ''}
              onChange={(e) => updateParam('bedrooms', e.target.value || undefined)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 bg-white"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} BHK</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">Budget</label>
            <select
              onChange={(e) => {
                const b = budgets.find((x) => x.label === e.target.value)
                if (b) { updateParam('minPrice', String(b.min)); updateParam('maxPrice', String(b.max)) }
                else { updateParam('minPrice', undefined); updateParam('maxPrice', undefined) }
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 bg-white"
            >
              <option value="">Any Budget</option>
              {budgets.map((b) => <option key={b.label} value={b.label}>{b.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">Sort By</label>
            <select
              value={currentParams.sort || 'createdAt_desc'}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 bg-white"
            >
              {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {/* Toggles */}
          <div className="col-span-2 md:col-span-4 flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentParams.featured === 'true'}
                onChange={(e) => updateParam('featured', e.target.checked ? 'true' : undefined)}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-sm text-gray-600">Featured Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentParams.luxury === 'true'}
                onChange={(e) => updateParam('luxury', e.target.checked ? 'true' : undefined)}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-sm text-gray-600">Luxury Only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
