'use client';
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import StatusBadge from '@/Components/UI/StatusBadge';

type Milestone = {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'achieved' | 'in-progress' | 'below-target' | 'pending';
  target: string;
  actual: string;
  targetNum: number;
  actualNum: number;
  unit: string;
  deadline: string;
  daysLeft: number | null;
  completedOn: string | null;
  verifiedBy: string | null;
  weight: number;
};

const milestones: Milestone[] = [
  {
    id: 'ms-001',
    title: 'Revenue Target — Q2 FY26',
    description: 'Achieve cumulative revenue of ₹1.2Cr by end of Q2',
    type: 'revenue',
    status: 'achieved' as const,
    target: '₹1.2Cr',
    actual: '₹1.31Cr',
    targetNum: 120,
    actualNum: 131,
    unit: '₹L',
    deadline: '30 Sep 2025',
    daysLeft: null,
    completedOn: '18 Sep 2025',
    verifiedBy: 'Priya Sharma',
    weight: 40,
  },
  {
    id: 'ms-002',
    title: 'Growth Rate — Q2 FY26',
    description: 'Maintain minimum 25% YoY revenue growth rate',
    type: 'growth',
    status: 'achieved' as const,
    target: '25%',
    actual: '34.2%',
    targetNum: 25,
    actualNum: 34.2,
    unit: '%',
    deadline: '30 Sep 2025',
    daysLeft: null,
    completedOn: '18 Sep 2025',
    verifiedBy: 'Priya Sharma',
    weight: 30,
  },
  {
    id: 'ms-003',
    title: 'Customer Acquisition — Q3 FY26',
    description: 'Onboard minimum 500 paying customers by Dec 2025',
    type: 'customers',
    status: 'in-progress' as const,
    target: '500',
    actual: '312',
    targetNum: 500,
    actualNum: 312,
    unit: 'customers',
    deadline: '31 Dec 2025',
    daysLeft: 99,
    completedOn: null,
    verifiedBy: null,
    weight: 20,
  },
  {
    id: 'ms-004',
    title: 'Profitability Milestone — Q4 FY26',
    description: 'Achieve positive EBITDA margin of at least 8%',
    type: 'profitability',
    status: 'pending' as const,
    target: '8% EBITDA',
    actual: '—',
    targetNum: 8,
    actualNum: 0,
    unit: '%',
    deadline: '31 Mar 2026',
    daysLeft: 189,
    completedOn: null,
    verifiedBy: null,
    weight: 10,
  },
];

const typeColors: Record<string, string> = {
  revenue: 'text-accent bg-accent/15',
  growth: 'text-primary bg-primary/15',
  customers: 'text-warning bg-warning/15',
  profitability: 'text-purple-400 bg-purple-500/15',
};

export default function MilestoneCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-header">Stage 2 Milestones</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            2 of 4 milestones achieved · Next stage unlocks on full achievement
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {milestones.map((ms) => {
          const isExpanded = expanded === ms.id;
          const pct =
            ms.status === 'pending'
              ? 0
              : Math.min(100, Math.round((ms.actualNum / ms.targetNum) * 100));

          return (
            <div
              key={ms.id}
              className={`card-base overflow-hidden cursor-pointer hover:shadow-card-hover transition-all duration-200 ${
                ms.status === 'achieved'
                  ? 'border-accent/20'
                  : ms.status === 'below-target'
                    ? 'border-danger/30'
                    : ''
              }`}
              onClick={() => setExpanded(isExpanded ? null : ms.id)}
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className={`px-2 py-0.5 rounded-full text-2xs font-medium ${typeColors[ms.type] || ''}`}
                  >
                    {ms.type.charAt(0).toUpperCase() + ms.type.slice(1)}
                  </div>
                  <StatusBadge status={ms.status} size="sm" />
                </div>

                <h3 className="text-sm font-semibold text-foreground leading-snug mb-1">
                  {ms.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                  {ms.description}
                </p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span
                      className={`font-mono-nums font-semibold ${pct >= 100 ? 'text-accent' : pct >= 60 ? 'text-primary' : pct > 0 ? 'text-warning' : 'text-muted-foreground'}`}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 100
                          ? 'bg-accent'
                          : pct >= 60
                            ? 'bg-primary'
                            : pct > 0
                              ? 'bg-warning'
                              : 'bg-muted'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Target vs Actual */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-surface rounded-lg">
                    <p className="text-2xs text-muted-foreground">Target</p>
                    <p className="text-sm font-mono-nums font-semibold text-foreground">
                      {ms.target}
                    </p>
                  </div>
                  <div
                    className={`p-2 rounded-lg ${ms.status === 'achieved' ? 'bg-accent/10' : 'bg-surface'}`}
                  >
                    <p className="text-2xs text-muted-foreground">Actual</p>
                    <p
                      className={`text-sm font-mono-nums font-semibold ${ms.status === 'achieved' ? 'text-accent' : 'text-foreground'}`}
                    >
                      {ms.actual}
                    </p>
                  </div>
                </div>

                {/* Deadline / completion */}
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
                  {ms.status === 'achieved' ? (
                    <>
                      <CheckCircle2 size={12} className="text-accent" />
                      <span className="text-2xs text-accent">Verified {ms.completedOn}</span>
                    </>
                  ) : ms.daysLeft !== null ? (
                    <>
                      <Clock
                        size={12}
                        className={ms.daysLeft < 30 ? 'text-warning' : 'text-muted-foreground'}
                      />
                      <span
                        className={`text-2xs ${ms.daysLeft < 30 ? 'text-warning' : 'text-muted-foreground'}`}
                      >
                        {ms.daysLeft} days left · {ms.deadline}
                      </span>
                    </>
                  ) : (
                    <>
                      <Calendar size={12} className="text-muted-foreground/50" />
                      <span className="text-2xs text-muted-foreground/50">Due {ms.deadline}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-border bg-surface/30 px-4 py-3 slide-up">
                  <p className="text-xs text-muted-foreground leading-relaxed">{ms.description}</p>
                  {ms.verifiedBy && (
                    <p className="text-2xs text-muted-foreground mt-2">
                      Verified by:{' '}
                      <span className="text-foreground font-medium">{ms.verifiedBy}</span>
                    </p>
                  )}
                  <p className="text-2xs text-muted-foreground mt-0.5">
                    Milestone weight:{' '}
                    <span className="font-mono-nums text-foreground">{ms.weight}%</span> of stage
                    score
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
