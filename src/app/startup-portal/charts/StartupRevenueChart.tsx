'use client';

import React from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Oct', revenue: 24, growth: 18, target: 22 },
  { month: 'Nov', revenue: 27, growth: 20, target: 25 },
  { month: 'Dec', revenue: 31, growth: 21, target: 28 },
  { month: 'Jan', revenue: 35, growth: 23, target: 31 },
  { month: 'Feb', revenue: 39, growth: 25, target: 34 },
  { month: 'Mar', revenue: 43, growth: 26, target: 37 },
  { month: 'Apr', revenue: 48, growth: 28, target: 40 },
  { month: 'May', revenue: 52, growth: 30, target: 43 },
  { month: 'Jun', revenue: 57, growth: 31, target: 46 },
  { month: 'Jul', revenue: 61, growth: 32, target: 49 },
  { month: 'Aug', revenue: 66, growth: 33, target: 52 },
  { month: 'Sep', revenue: 72, growth: 34, target: 55 },
];

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-modal">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      <p className="text-primary">Revenue: ₹{payload[0]?.payload.revenue}L</p>
      <p className="text-accent">Growth: {payload[0]?.payload.growth}%</p>
      <p className="text-warning">Target: ₹{payload[0]?.payload.target}L</p>
    </div>
  );
}

export default function StartupRevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
        />
        <YAxis
          yAxisId="revenue"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          tickFormatter={(value) => `₹${value}L`}
        />
        <YAxis yAxisId="growth" orientation="right" hide domain={[0, 100]} />
        <Tooltip content={<ChartTooltip />} />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          stroke="var(--primary)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="growth"
          type="monotone"
          dataKey="growth"
          stroke="var(--accent)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="target"
          stroke="var(--warning)"
          strokeDasharray="5 5"
          strokeWidth={1.5}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
