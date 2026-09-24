'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data12m = [
  { month: 'Oct', fintech: 42, agritech: 18, healthtech: 28, total: 88 },
  { month: 'Nov', fintech: 48, agritech: 22, healthtech: 31, total: 101 },
  { month: 'Dec', fintech: 39, agritech: 19, healthtech: 29, total: 87 },
  { month: 'Jan', fintech: 53, agritech: 25, healthtech: 35, total: 113 },
  { month: 'Feb', fintech: 61, agritech: 28, healthtech: 38, total: 127 },
  { month: 'Mar', fintech: 58, agritech: 31, healthtech: 42, total: 131 },
  { month: 'Apr', fintech: 67, agritech: 27, healthtech: 39, total: 133 },
  { month: 'May', fintech: 74, agritech: 35, healthtech: 44, total: 153 },
  { month: 'Jun', fintech: 69, agritech: 33, healthtech: 47, total: 149 },
  { month: 'Jul', fintech: 82, agritech: 38, healthtech: 51, total: 171 },
  { month: 'Aug', fintech: 78, agritech: 41, healthtech: 49, total: 168 },
  { month: 'Sep', fintech: 91, agritech: 44, healthtech: 55, total: 190 },
];

const data6m = data12m.slice(6);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-modal text-xs space-y-1.5">
      <p className="font-semibold text-foreground mb-2">{label} 2025</p>
      {payload.map((entry: any) => (
        <div key={`tip-${entry.dataKey}`} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.dataKey}</span>
          </div>
          <span className="font-mono-nums font-medium text-foreground">₹{entry.value}L</span>
        </div>
      ))}
      <div className="border-t border-border pt-1.5 flex items-center justify-between">
        <span className="text-muted-foreground">Total</span>
        <span className="font-mono-nums font-semibold text-accent">
          ₹{payload.reduce((sum: number, e: any) => sum + (e.dataKey !== 'total' ? e.value : 0), 0)}
          L
        </span>
      </div>
    </div>
  );
};

export default function PortfolioRevenueChart({ range }: { range: '6m' | '12m' | 'all' }) {
  const data = range === '6m' ? data6m : data12m;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="gradFintech" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradAgritech" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradHealthtech" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--warning)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${v}L`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => (
            <span
              style={{
                fontSize: 11,
                color: 'var(--muted-foreground)',
                textTransform: 'capitalize',
              }}
            >
              {value}
            </span>
          )}
        />
        <Area
          type="monotone"
          dataKey="fintech"
          stroke="var(--primary)"
          strokeWidth={2}
          fill="url(#gradFintech)"
        />
        <Area
          type="monotone"
          dataKey="agritech"
          stroke="var(--accent)"
          strokeWidth={2}
          fill="url(#gradAgritech)"
        />
        <Area
          type="monotone"
          dataKey="healthtech"
          stroke="var(--warning)"
          strokeWidth={2}
          fill="url(#gradHealthtech)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
