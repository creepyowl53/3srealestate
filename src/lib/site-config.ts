// src/lib/site-config.ts

export const siteConfig = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918847554785',
  phonePrimary: process.env.NEXT_PUBLIC_PHONE_PRIMARY || '+91 8847554785',
  phoneSecondary: process.env.NEXT_PUBLIC_PHONE_SECONDARY || '+91 8847554785',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@3srealestate.com',
}

// Returns digits-only number for wa.me links, e.g. "919876543210"
export function getWhatsAppDigits(): string {
  return siteConfig.whatsappNumber.replace(/[^0-9]/g, '')
}

// Builds a full WhatsApp link with a prefilled message
export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${getWhatsAppDigits()}?text=${encodeURIComponent(message)}`
}

// Returns tel: link for the primary phone number (digits only, with +)
export function getPhoneLink(): string {
  return `tel:${siteConfig.phonePrimary.replace(/\s/g, '')}`
}