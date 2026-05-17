import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/shared/providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: '3S Real Estate | Smart • Secure • Sophisticated | Mohali, Chandigarh, Zirakpur',
    template: '%s | 3S Real Estate',
  },
  description:
    'Discover premium properties in Mohali, Chandigarh, Zirakpur, Kharar & New Chandigarh. Luxury villas, flats, commercial spaces & investment plots. India\'s most trusted real estate platform.',
  keywords: [
    'real estate mohali',
    'property in chandigarh',
    'flats in mohali',
    'commercial property zirakpur',
    'luxury villas new chandigarh',
    'property dealer mohali',
    '3s real estate',
    'buy property tricity',
    'investment property punjab',
  ],
  authors: [{ name: '3S Real Estate', url: 'https://3srealestate.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://3srealestate.com',
    siteName: '3S Real Estate',
    title: '3S Real Estate | Smart • Secure • Sophisticated',
    description: 'Premium properties in Mohali, Chandigarh & Zirakpur. Buy, sell, rent & invest.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3S Real Estate - Premium Properties in Tricity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3S Real Estate | Smart • Secure • Sophisticated',
    description: 'Premium properties in Mohali, Chandigarh & Zirakpur.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-body antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
