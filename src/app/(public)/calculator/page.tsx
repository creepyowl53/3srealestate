'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingDown, Banknote, Percent } from 'lucide-react'

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [emi, setEmi] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    const r = interestRate / 12 / 100
    const n = tenure * 12
    if (r === 0) { setEmi(loanAmount / n); return }
    const emiVal = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = emiVal * n
    setEmi(Math.round(emiVal))
    setTotalPayment(Math.round(total))
    setTotalInterest(Math.round(total - loanAmount))
  }, [loanAmount, interestRate, tenure])

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n)
  const fmtL = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : `₹${(n / 100000).toFixed(0)} Lac`

  const principalPct = Math.round((loanAmount / totalPayment) * 100) || 0
  const interestPct = 100 - principalPct

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-charcoal-950 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">Planning Tool</p>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">EMI Calculator</h1>
          <div className="h-1 w-16 bg-gold-gradient rounded mx-auto mb-4" />
          <p className="text-white/60 max-w-lg mx-auto">Plan your home loan repayment easily. Adjust sliders to get instant EMI calculations.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="font-heading font-semibold text-xl text-charcoal-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-gold-500" /> Loan Details
            </h2>

            <div className="space-y-7">
              {/* Loan amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                  <span className="text-gold-600 font-bold">{fmtL(loanAmount)}</span>
                </div>
                <input type="range" min={500000} max={50000000} step={100000} value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gold-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>5 Lac</span><span>5 Cr</span></div>
              </div>

              {/* Interest rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Interest Rate (p.a.)</label>
                  <span className="text-gold-600 font-bold">{interestRate}%</span>
                </div>
                <input type="range" min={6} max={18} step={0.1} value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gold-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>6%</span><span>18%</span></div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
                  <span className="text-gold-600 font-bold">{tenure} Years</span>
                </div>
                <input type="range" min={1} max={30} step={1} value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gold-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 Yr</span><span>30 Yrs</span></div>
              </div>
            </div>

            {/* Bank rate comparison */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Current Bank Rates</p>
              <div className="space-y-2">
                {[['SBI', '8.40%'], ['HDFC', '8.50%'], ['ICICI', '8.75%'], ['Axis Bank', '8.90%']].map(([bank, rate]) => (
                  <div key={bank} className="flex justify-between text-sm">
                    <span className="text-gray-600">{bank}</span>
                    <span className="font-medium text-charcoal-800">{rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="space-y-4">
            {/* EMI result */}
            <div className="bg-gold-gradient rounded-2xl p-8 text-white text-center shadow-gold-lg">
              <p className="text-white/80 text-sm mb-2 uppercase tracking-widest">Monthly EMI</p>
              <p className="text-5xl font-heading font-bold mb-1">₹{fmt(emi)}</p>
              <p className="text-white/70 text-sm">for {tenure} years</p>
            </div>

            {/* Breakdown cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Banknote, label: 'Principal', value: fmtL(loanAmount), color: 'text-blue-600', bg: 'bg-blue-50' },
                { icon: Percent, label: 'Total Interest', value: fmtL(totalInterest), color: 'text-red-500', bg: 'bg-red-50' },
                { icon: TrendingDown, label: 'Total Payment', value: fmtL(totalPayment), color: 'text-green-600', bg: 'bg-green-50' },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className={`${bg} rounded-xl p-4 text-center`}>
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1.5`} />
                  <p className={`font-bold text-sm ${color}`}>{value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Visual breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-charcoal-800 mb-4">Payment Breakdown</p>
              <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${principalPct}%` }} />
                <div className="absolute top-0 h-full bg-red-400 rounded-full transition-all duration-500" style={{ left: `${principalPct}%`, right: 0 }} />
              </div>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /><span className="text-gray-600">Principal {principalPct}%</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /><span className="text-gray-600">Interest {interestPct}%</span></div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-charcoal-950 rounded-2xl p-6 text-white">
              <p className="font-semibold mb-1">Need help with home loan?</p>
              <p className="text-white/60 text-sm mb-4">We help arrange loans at the best rates from top banks.</p>
              <a href="https://wa.me/919876543210?text=Hi! I need help with home loan for my property purchase."
                target="_blank" rel="noopener noreferrer"
                className="block text-center btn-luxury py-3 rounded-lg text-sm">
                Get Loan Assistance
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
