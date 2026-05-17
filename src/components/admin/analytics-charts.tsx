'use client'

import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#f5b812', '#ef4444', '#3b82f6', '#8b5cf6', '#10b981', '#f97316']

interface Props {
  data: {
    leadsByScore: { name: string; value: number }[]
    leadsByStatus: { name: string; value: number }[]
    propertiesByType: { name: string; value: number }[]
    monthlyTrend: { month: string; hot: number; warm: number; cold: number; total: number }[]
  }
}

export function AnalyticsCharts({ data }: Props) {
  const chartTextStyle = { fill: 'rgba(255,255,255,0.5)', fontSize: 11 }
  const gridStyle = { stroke: 'rgba(255,255,255,0.05)' }

  return (
    <div className="space-y-6">
      {/* Monthly trend */}
      <div className="bg-charcoal-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-6">Monthly Lead Trend</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.monthlyTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
            <XAxis dataKey="month" tick={chartTextStyle} />
            <YAxis tick={chartTextStyle} />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
            <Bar dataKey="hot" fill="#ef4444" name="Hot" radius={[4, 4, 0, 0]} />
            <Bar dataKey="warm" fill="#f97316" name="Warm" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cold" fill="#3b82f6" name="Cold" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leads by score */}
        <div className="bg-charcoal-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Leads by Score</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data.leadsByScore} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {data.leadsByScore.map((_, i) => <Cell key={i} fill={['#ef4444', '#f97316', '#3b82f6'][i]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Properties by type */}
        <div className="bg-charcoal-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Properties by Type</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data.propertiesByType} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                {data.propertiesByType.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lead funnel */}
        <div className="bg-charcoal-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Lead Funnel</h2>
          <div className="space-y-2">
            {data.leadsByStatus.map(({ name, value }, i) => {
              const max = Math.max(...data.leadsByStatus.map((d) => d.value))
              const pct = max > 0 ? (value / max) * 100 : 0
              return (
                <div key={name}>
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>{name}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-gradient rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
