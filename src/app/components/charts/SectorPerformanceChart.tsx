'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { sector: 'Fintech', rate: 78, count: 4 },
  { sector: 'Agritech', rate: 61, count: 3 },
  { sector: 'Healthtech', rate: 72, count: 3 },
  { sector: 'Edtech', rate: 45, count: 2 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-modal text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="font-mono-nums text-accent mt-0.5">{payload[0].value}% achieved</p>
      <p className="text-muted-foreground">{payload[0].payload.count} startups</p>
    </div>
  );
};

export default function SectorPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="sector"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={18}>
          {data.map((entry, index) => (
            <Cell
              key={`sector-bar-${index}`}
              fill={
                entry.rate >= 70
                  ? 'var(--accent)'
                  : entry.rate >= 55
                    ? 'var(--primary)'
                    : 'var(--warning)'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
