// src/lib/validations.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const leadCaptureSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  budget: z.string().optional(),
  preferredLocation: z.string().optional(),
  propertyType: z.string().optional(),
  purpose: z.string().optional(),
  timeline: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().optional(),
  propertyId: z.string().optional(),
})

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email().optional().or(z.literal('')),
  date: z.string(),
  message: z.string().optional(),
  propertyId: z.string().optional(),
})

export const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'PLOT', 'FLAT', 'RENTAL', 'AGRICULTURAL', 'VILLA', 'LUXURY']),
  purpose: z.enum(['SALE', 'RENT', 'INVESTMENT']),
  status: z.enum(['AVAILABLE', 'SOLD', 'UNDER_NEGOTIATION', 'COMING_SOON']).default('AVAILABLE'),
  price: z.number().positive('Price must be positive'),
  priceLabel: z.string().optional(),
  area: z.number().positive('Area must be positive'),
  areaUnit: z.string().default('sqft'),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().int().optional(),
  parking: z.number().int().optional(),
  furnishing: z.enum(['UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED']).optional(),
  possession: z.enum(['READY_TO_MOVE', 'UNDER_CONSTRUCTION', 'NEW_LAUNCH']).optional(),
  city: z.string().min(2, 'City is required'),
  locality: z.string().min(2, 'Locality is required'),
  address: z.string().min(10, 'Full address required'),
  coverImage: z.string().url('Valid image URL required'),
  isFeatured: z.boolean().default(false),
  isLuxury: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type InquiryInput = z.infer<typeof inquirySchema>
export type PropertyInput = z.infer<typeof propertySchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
