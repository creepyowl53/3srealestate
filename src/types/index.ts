import type { Property, PropertyImage, PropertyAmenity, NearbyFacility, Lead, User, Blog, BlogCategory, Inquiry, Appointment, Testimonial } from '@prisma/client'

// Extended property with relations
export type PropertyWithRelations = Property & {
  images: PropertyImage[]
  amenities: PropertyAmenity[]
  nearbyFacility: NearbyFacility[]
  _count?: { inquiries: number; savedBy: number }
}

// Lead with relations
export type LeadWithRelations = Lead & {
  assignedTo?: Pick<User, 'id' | 'name' | 'email'> | null
}

// Blog with category
export type BlogWithCategory = Blog & {
  category?: BlogCategory | null
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  pages: number
}

// Filter types
export interface PropertyFilters {
  type?: string
  purpose?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  featured?: boolean
  luxury?: boolean
  search?: string
  sort?: string
  page?: number
  limit?: number
}

// Analytics overview
export interface AnalyticsOverview {
  totalLeads: number
  hotLeads: number
  warmLeads: number
  coldLeads: number
  newLeadsThisWeek: number
  totalProperties: number
  availableProperties: number
  featuredProperties: number
  totalUsers: number
  totalInquiries: number
  unreadInquiries: number
  pendingAppointments: number
  conversionRate: string
}

// Session user with role
export interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: string
}

// Nav item
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// SEO meta
export interface SEOMeta {
  title: string
  description: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
}
