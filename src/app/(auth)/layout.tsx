import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col">
      <div className="flex justify-center pt-10 pb-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold-gradient rounded-sm flex items-center justify-center shadow-gold">
            <span className="text-white font-heading font-bold text-lg">3S</span>
          </div>
          <div>
            <div className="font-heading font-bold text-xl text-white">3S Real Estate</div>
            <div className="text-gold-400 text-xs tracking-widest">SMART • SECURE • SOPHISTICATED</div>
          </div>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </div>
    </div>
  )
}
