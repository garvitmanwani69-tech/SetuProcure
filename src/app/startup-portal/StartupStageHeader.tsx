'use client';
import React from 'react';
import { CheckCircle2, Clock, ArrowRight, Wallet } from 'lucide-react';

const stages = [
  {
    id: 'stage-1',
    label: 'Stage 1',
    name: 'Seed Funding',
    amount: '₹30L',
    status: 'completed',
    date: 'Mar 2024',
  },
  {
    id: 'stage-2',
    label: 'Stage 2',
    name: 'Growth Funding',
    amount: '₹55L',
    status: 'active',
    date: 'Sep 2024',
  },
  {
    id: 'stage-3',
    label: 'Stage 3',
    name: 'Scale Funding',
    amount: '₹65L',
    status: 'locked',
    date: 'Pending',
  },
];

export default function StartupStageHeader() {
  const totalDisbursed = 85; // lakhs
  const totalCommitted = 150;
  const pct = Math.round((totalDisbursed / totalCommitted) * 100);

  return (
    <div className="card-base p-5 gradient-border">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Stage pipeline */}
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-4">
            <p className="label-text">Funding Stage Progress</p>
          </div>
          <div className="flex items-center gap-2">
            {stages?.map((stage, i) => (
              <React.Fragment key={stage?.id}>
                <div
                  className={`flex-1 p-3 rounded-xl border transition-all ${
                    stage?.status === 'completed'
                      ? 'bg-accent/10 border-accent/25'
                      : stage?.status === 'active'
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-surface border-border opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xs font-medium text-muted-foreground">
                      {stage?.label}
                    </span>
                    {stage?.status === 'completed' ? (
                      <CheckCircle2 size={13} className="text-accent" />
                    ) : stage?.status === 'active' ? (
                      <div className="w-2 h-2 bg-primary rounded-full pulse-dot" />
                    ) : (
                      <Clock size={13} className="text-muted-foreground/40" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{stage?.name}</p>
                  <p className="text-xs font-mono-nums text-accent font-medium mt-0.5">
                    {stage?.amount}
                  </p>
                  <p className="text-2xs text-muted-foreground mt-1">{stage?.date}</p>
                </div>
                {i < stages?.length - 1 && (
                  <ArrowRight size={14} className="text-muted-foreground/30 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Overall progress */}
        <div className="lg:w-56 xl:w-64 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={14} className="text-accent" />
            <p className="label-text">Total Funding Received</p>
          </div>
          <p className="text-3xl font-bold font-mono-nums text-accent mb-1">₹85L</p>
          <p className="text-xs text-muted-foreground mb-3">of ₹1.5Cr committed · {pct}%</p>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xs text-muted-foreground">Stage 1 + Stage 2</span>
            <span className="text-2xs font-mono-nums text-muted-foreground">{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
