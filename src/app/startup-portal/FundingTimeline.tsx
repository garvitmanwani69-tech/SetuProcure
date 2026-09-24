'use client';
import React from 'react';
import { Wallet, CheckCircle2, Lock } from 'lucide-react';

const timelineEvents = [
  {
    id: 'tl-001',
    event: 'Program Enrollment',
    description: 'Registered in DPIIT Innovation Program FY 2024–25',
    amount: null,
    date: '12 Mar 2024',
    status: 'completed',
    actor: 'Priya Sharma',
  },
  {
    id: 'tl-002',
    event: 'Stage 1 — Seed Disbursement',
    description: 'Initial seed funding released after enrollment verification',
    amount: '₹30L',
    date: '28 Mar 2024',
    status: 'completed',
    actor: 'Priya Sharma',
  },
  {
    id: 'tl-003',
    event: 'Stage 1 — Milestone Achieved',
    description: 'Q4 FY24 revenue target of ₹45L reached and verified',
    amount: null,
    date: '15 Aug 2024',
    status: 'completed',
    actor: 'Priya Sharma',
  },
  {
    id: 'tl-004',
    event: 'Stage 2 — Growth Disbursement',
    description: 'Stage 2 tranche 1 released upon Stage 1 milestone verification',
    amount: '₹55L',
    date: '02 Sep 2024',
    status: 'completed',
    actor: 'Priya Sharma',
  },
  {
    id: 'tl-005',
    event: 'Stage 2 — Q2 Milestones Achieved',
    description: 'Revenue ₹1.31Cr and growth rate 34.2% both verified',
    amount: null,
    date: '18 Sep 2025',
    status: 'completed',
    actor: 'Priya Sharma',
  },
  {
    id: 'tl-006',
    event: 'Stage 3 — Scale Funding Pending',
    description: 'Awaiting government authorization for Stage 3 disbursement of ₹65L',
    amount: '₹65L',
    date: 'Pending approval',
    status: 'pending',
    actor: null,
  },
];

export default function FundingTimeline() {
  return (
    <div className="card-base overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="section-header">Funding Disbursement Timeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complete funding history and upcoming releases
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Wallet size={13} className="text-accent" />
          <span className="font-mono-nums font-semibold text-accent">₹85L received</span>
        </div>
      </div>

      <div className="p-4 space-y-0">
        {timelineEvents?.map((event, i) => (
          <div key={event?.id} className="flex items-start gap-3 relative">
            {/* Connector line */}
            {i < timelineEvents?.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
            )}

            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border ${
                event?.status === 'completed'
                  ? event?.amount
                    ? 'bg-accent/15 border-accent/25'
                    : 'bg-primary/15 border-primary/25'
                  : 'bg-surface border-border'
              }`}
            >
              {event?.status === 'completed' ? (
                event?.amount ? (
                  <Wallet size={13} className="text-accent" />
                ) : (
                  <CheckCircle2 size={13} className="text-primary" />
                )
              ) : (
                <Lock size={13} className="text-muted-foreground/50" />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-4 ${i === timelineEvents?.length - 1 ? 'pb-0' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p
                    className={`text-sm font-medium ${event?.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {event?.event}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {event?.description}
                  </p>
                </div>
                {event?.amount && (
                  <span
                    className={`font-mono-nums text-xs font-bold flex-shrink-0 ${event?.status === 'completed' ? 'text-accent' : 'text-muted-foreground/50'}`}
                  >
                    {event?.amount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className={`text-2xs font-medium ${event?.status === 'pending' ? 'text-warning' : 'text-muted-foreground'}`}
                >
                  {event?.date}
                </span>
                {event?.actor && (
                  <>
                    <span className="text-border">·</span>
                    <span className="text-2xs text-muted-foreground">{event?.actor}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
