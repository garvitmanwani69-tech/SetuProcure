'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Achieved', value: 33, color: 'var(--accent)' },
  { name: 'In Progress', value: 10, color: 'var(--primary)' },
  { name: 'Below Target', value: 4, color: 'var(--danger)' },
  { name: 'Pending', value: 2, color: 'var(--muted-foreground)' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-modal text-xs">
      <p className="font-medium text-foreground">{d.name}</p>
      <p className="font-mono-nums text-muted-foreground mt-0.5">{d.value} milestones</p>
    </div>
  );
};

export default function MilestoneDistributionChart() {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-milestone-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-bold font-mono-nums text-foreground">{total}</p>
            <p className="text-2xs text-muted-foreground">total</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-2">
        {data.map((item) => (
          <div key={`legend-${item.name}`} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.value / total) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <span className="text-xs font-mono-nums font-medium text-foreground w-6 text-right">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
