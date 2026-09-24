'use client';
import React from 'react';
import { Wallet, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

const stages = [
  {
    id: 'pipeline-stage1',
    label: 'Stage 1',
    description: 'Seed Funding',
    count: 5,
    totalAmount: '₹3.3Cr',
    disbursed: '₹1.1Cr',
    status: 'active',
    pct: 33,
  },
  {
    id: 'pipeline-stage2',
    label: 'Stage 2',
    description: 'Growth Funding',
    count: 4,
    totalAmount: '₹4.8Cr',
    disbursed: '₹2.1Cr',
    status: 'active',
    pct: 44,
  },
  {
    id: 'pipeline-stage3',
    label: 'Stage 3',
    description: 'Scale Funding',
    count: 2,
    totalAmount: '₹5.2Cr',
    disbursed: '₹4.2Cr',
    status: 'active',
    pct: 81,
  },
  {
    id: 'pipeline-completed',
    label: 'Completed',
    description: 'Program Graduates',
    count: 1,
    totalAmount: '₹3.0Cr',
    disbursed: '₹3.0Cr',
    status: 'disbursed',
    pct: 100,
  },
];

export default function FundingPipeline() {
  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-header">Funding Pipeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Stage-wise disbursement overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Wallet size={14} />
          <span>
            Total Committed:{' '}
            <span className="text-foreground font-mono-nums font-semibold">₹16.3Cr</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages?.map((stage, i) => (
          <div key={stage?.id} className="relative">
            <div
              className={`p-4 rounded-xl border transition-all hover:shadow-card-hover ${
                stage?.status === 'disbursed'
                  ? 'bg-accent/5 border-accent/20'
                  : 'bg-surface border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      stage?.status === 'disbursed' ? 'bg-accent/20' : 'bg-primary/15'
                    }`}
                  >
                    {stage?.status === 'disbursed' ? (
                      <CheckCircle2 size={14} className="text-accent" />
                    ) : (
                      <Layers size={14} className="text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{stage?.label}</p>
                    <p className="text-2xs text-muted-foreground">{stage?.description}</p>
                  </div>
                </div>
                <span className="font-mono-nums text-xs bg-background px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                  {stage?.count} startups
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Disbursed</span>
                  <span className="font-mono-nums font-semibold text-foreground">
                    {stage?.disbursed}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Committed</span>
                  <span className="font-mono-nums text-muted-foreground">{stage?.totalAmount}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-2xs mb-1">
                    <span className="text-muted-foreground">Disbursement rate</span>
                    <span
                      className={`font-mono-nums font-medium ${stage?.pct >= 75 ? 'text-accent' : stage?.pct >= 40 ? 'text-primary' : 'text-warning'}`}
                    >
                      {stage?.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${stage?.pct >= 75 ? 'bg-accent' : stage?.pct >= 40 ? 'bg-primary' : 'bg-warning'}`}
                      style={{ width: `${stage?.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow connector */}
            {i < stages?.length - 1 && (
              <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight size={16} className="text-muted-foreground/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
