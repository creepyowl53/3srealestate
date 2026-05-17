import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | 3S Real Estate',
  description: 'Terms and conditions for using 3S Real Estate services and website.',
}

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-charcoal-950 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Terms & Conditions</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto" />
          <p className="text-white/50 mt-4 text-sm">Last updated: January 2025</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8 text-gray-700">
          {[
            {
              title: '1. Acceptance of Terms',
              content: 'By accessing and using the 3S Real Estate website (3srealestate.com), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.',
            },
            {
              title: '2. Services',
              content: '3S Real Estate provides real estate consultancy, property listing, lead generation, and advisory services in the Tricity region (Mohali, Chandigarh, Zirakpur, and surrounding areas). We act as intermediaries between buyers, sellers, and renters.',
            },
            {
              title: '3. Property Listings',
              content: 'All property listings on our website are for informational purposes only. While we strive for accuracy, we do not guarantee the completeness or accuracy of listing information. Prices, availability, and property details are subject to change without notice. Always verify details before making any financial commitment.',
            },
            {
              title: '4. No Legal or Financial Advice',
              content: 'Information on this website does not constitute legal, financial, or investment advice. Always consult qualified professionals before making real estate investment decisions. Return on investment figures mentioned are estimates based on market analysis and not guarantees.',
            },
            {
              title: '5. User Responsibilities',
              content: 'By submitting your contact information, you consent to being contacted by our agents via phone, WhatsApp, email, or SMS regarding properties and services. You agree to provide accurate information in all forms and inquiries.',
            },
            {
              title: '6. Brokerage & Fees',
              content: 'Our brokerage charges are transparent and disclosed upfront before any transaction. Standard brokerage is 1-2% of transaction value for buyers. Sellers may have separate arrangements. Some builder properties are available at zero brokerage.',
            },
            {
              title: '7. Intellectual Property',
              content: 'All content on this website including text, images, logos, and design is the property of 3S Real Estate and protected by copyright law. Unauthorized use, reproduction, or distribution is prohibited.',
            },
            {
              title: '8. Limitation of Liability',
              content: '3S Real Estate shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our liability is limited to the brokerage fees paid for the specific transaction in dispute.',
            },
            {
              title: '9. RERA Compliance',
              content: '3S Real Estate operates in compliance with the Real Estate (Regulation and Development) Act, 2016 (RERA). We only list RERA-registered projects where applicable. The RERA registration number is displayed on applicable listings.',
            },
            {
              title: '10. Governing Law',
              content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chandigarh, Punjab, India.',
            },
            {
              title: '11. Changes to Terms',
              content: 'We reserve the right to modify these terms at any time. Continued use of our website after changes constitutes acceptance of the new terms.',
            },
            {
              title: '12. Contact',
              content: 'For questions about these terms:\n3S Real Estate, SCO 123, Sector 17-C, Chandigarh – 160017\nEmail: info@3srealestate.com | Phone: +91-98765-43210',
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
