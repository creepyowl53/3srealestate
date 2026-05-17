import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | 3S Real Estate',
  description: 'Privacy policy for 3S Real Estate. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-charcoal-950 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Privacy Policy</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto" />
          <p className="text-white/50 mt-4 text-sm">Last updated: January 2025</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          {[
            {
              title: '1. Information We Collect',
              content: `We collect information you provide directly to us, including your name, phone number, email address, property preferences, budget range, and any other information you choose to provide when filling out our lead capture forms, inquiry forms, or contact forms.\n\nWe also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.`,
            },
            {
              title: '2. How We Use Your Information',
              content: `We use the information we collect to:\n• Contact you about properties matching your preferences\n• Send you relevant property listings and market updates\n• Respond to your inquiries and provide customer support\n• Improve our website and services\n• Comply with legal obligations\n\nWe do NOT sell your personal information to third parties.`,
            },
            {
              title: '3. Information Sharing',
              content: `We may share your information with our internal agents and consultants who assist in serving you. We may also share information with trusted service providers who assist in our operations, subject to confidentiality agreements.\n\nWe will not share your information with any third-party marketers or advertisers without your explicit consent.`,
            },
            {
              title: '4. Data Security',
              content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is stored on secure servers with encryption.`,
            },
            {
              title: '5. Cookies',
              content: `We use cookies to remember your preferences, understand how you use our site, and improve your experience. You can control cookie settings through your browser. We use cookies to prevent repeated display of our property matching popup.`,
            },
            {
              title: '6. WhatsApp Communication',
              content: `When you contact us via WhatsApp, your messages are subject to WhatsApp's privacy policy. We use WhatsApp only for property-related communication and will not send unsolicited messages.`,
            },
            {
              title: '7. Your Rights',
              content: `You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@3srealestate.com. We will respond within 30 days.`,
            },
            {
              title: '8. Contact Us',
              content: `For privacy-related questions, contact:\n3S Real Estate\nSCO 123, Sector 17-C, Chandigarh – 160017\nEmail: info@3srealestate.com\nPhone: +91-98765-43210`,
            },
          ].map(({ title, content }) => (
            <section key={title}>
              <h2 className="text-xl font-heading font-bold text-charcoal-900 mb-3">{title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
