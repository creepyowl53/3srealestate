// src/lib/lead-scoring.ts
import { LeadScore } from '@prisma/client'
import { LeadCaptureInput } from './validations'

interface LeadScoreResult {
  score: LeadScore
  points: number
  reasons: string[]
}

export function calculateLeadScore(data: LeadCaptureInput): LeadScoreResult {
  let points = 0
  const reasons: string[] = []

  // Timeline scoring
  if (data.timeline === 'Immediate') {
    points += 40
    reasons.push('Immediate purchase intent')
  } else if (data.timeline === '3 Months') {
    points += 25
    reasons.push('Short-term intent')
  } else if (data.timeline === '6 Months') {
    points += 10
    reasons.push('Medium-term intent')
  } else {
    points += 2
    reasons.push('Exploring')
  }

  // Budget scoring
  if (data.budget) {
    const highBudgets = ['2-5 Cr', '5 Cr+', '1-2 Cr']
    const midBudgets = ['50L-1Cr', '80L-1Cr']
    if (highBudgets.includes(data.budget)) {
      points += 30
      reasons.push('High budget')
    } else if (midBudgets.includes(data.budget)) {
      points += 20
      reasons.push('Medium budget')
    } else {
      points += 10
      reasons.push('Entry budget')
    }
  }

  // Contact completeness
  if (data.email) {
    points += 10
    reasons.push('Email provided')
  }

  // Location specificity
  if (data.preferredLocation) {
    points += 10
    reasons.push('Location specified')
  }

  // Purpose scoring
  if (data.purpose === 'Investment') {
    points += 15
    reasons.push('Investment purpose')
  } else if (data.purpose === 'Self Use') {
    points += 10
    reasons.push('Self-use purpose')
  }

  // Property type scoring
  if (data.propertyType && ['LUXURY', 'VILLA', 'COMMERCIAL'].includes(data.propertyType)) {
    points += 10
    reasons.push('Premium property interest')
  }

  // Determine score category
  let score: LeadScore
  if (points >= 70) {
    score = LeadScore.HOT
  } else if (points >= 40) {
    score = LeadScore.WARM
  } else {
    score = LeadScore.COLD
  }

  return { score, points, reasons }
}

// Format price in Indian format
export function formatPrice(price: number, unit: 'monthly' | 'total' = 'total'): string {
  if (unit === 'monthly') {
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L/mo`
    return `₹${price.toLocaleString('en-IN')}/mo`
  }

  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} Lac`
  return `₹${price.toLocaleString('en-IN')}`
}

// Generate property slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// WhatsApp message generator
export function generateWhatsAppMessage(params: {
  type: 'property' | 'general' | 'inquiry'
  propertyTitle?: string
  propertyUrl?: string
  name?: string
}): string {
  const base = `Hello 3S Real Estate! 👋\n\n`

  if (params.type === 'property' && params.propertyTitle) {
    return encodeURIComponent(
      `${base}I'm interested in the property: *${params.propertyTitle}*\n\nProperty Link: ${params.propertyUrl || ''}\n\nPlease share more details and schedule a site visit.\n\nThank you!`
    )
  }

  if (params.type === 'inquiry') {
    return encodeURIComponent(
      `${base}I would like to inquire about properties in Mohali/Chandigarh area.\n\nPlease contact me at your earliest convenience.\n\nThank you!`
    )
  }

  return encodeURIComponent(
    `${base}I'm interested in your real estate services. Please guide me in finding the right property.\n\nThank you!`
  )
}
