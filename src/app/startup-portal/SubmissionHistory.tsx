'use client';
import React, { useState } from 'react';
import { FileText, Eye, Download, ChevronDown } from 'lucide-react';
import StatusBadge from '@/Components/UI/StatusBadge';

const submissions = [
  {
    id: 'sub-006',
    period: 'Q2 FY 2025–26',
    submittedOn: '18 Sep 2025',
    revenueActual: '₹131L',
    growthRate: '34.2%',
    status: 'verified' as const,
    reviewedBy: 'Priya Sharma',
    reviewedOn: '20 Sep 2025',
    documents: 3,
    notes: 'All milestones verified. Stage 3 funding triggered.',
  },
  {
    id: 'sub-005',
    period: 'Q1 FY 2025–26',
    submittedOn: '02 Jul 2025',
    revenueActual: '₹96L',
    growthRate: '28.6%',
    status: 'verified' as const,
    reviewedBy: 'Priya Sharma',
    reviewedOn: '05 Jul 2025',
    documents: 2,
    notes: 'On track. Growth above target.',
  },
  {
    id: 'sub-004',
    period: 'Q4 FY 2024–25',
    submittedOn: '05 Apr 2025',
    revenueActual: '₹79L',
    growthRate: '15.8%',
    status: 'verified' as const,
    reviewedBy: 'Rahul Verma',
    reviewedOn: '08 Apr 2025',
    documents: 2,
    notes: 'Growth below 25% target — flagged for monitoring.',
  },
  {
    id: 'sub-003',
    period: 'Q3 FY 2024–25',
    submittedOn: '08 Jan 2025',
    revenueActual: '₹85L',
    growthRate: '22.4%',
    status: 'verified' as const,
    reviewedBy: 'Priya Sharma',
    reviewedOn: '12 Jan 2025',
    documents: 3,
    notes: 'Satisfactory progress.',
  },
  {
    id: 'sub-002',
    period: 'Q2 FY 2024–25',
    submittedOn: '04 Oct 2024',
    revenueActual: '₹78L',
    growthRate: '18.2%',
    status: 'verified' as const,
    reviewedBy: 'Priya Sharma',
    reviewedOn: '09 Oct 2024',
    documents: 2,
    notes: null,
  },
  {
    id: 'sub-001',
    period: 'Q1 FY 2024–25',
    submittedOn: '12 Jul 2024',
    revenueActual: '₹52L',
    growthRate: '—',
    status: 'verified' as const,
    reviewedBy: 'Priya Sharma',
    reviewedOn: '16 Jul 2024',
    documents: 1,
    notes: 'First submission — baseline established.',
  },
];

export default function SubmissionHistory() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="card-base overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="section-header">Submission History</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {submissions.length} reports submitted · All verified
          </p>
        </div>
        <button className="btn-secondary text-xs py-1.5">
          <Download size={13} />
          Export All
        </button>
      </div>

      <div className="divide-y divide-border">
        {submissions.map((sub) => {
          const isExpanded = expanded === sub.id;
          return (
            <div key={sub.id}>
              <div
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface/50 transition-colors cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : sub.id)}
              >
                <div className="w-8 h-8 bg-primary/15 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={13} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">{sub.period}</p>
                    <p className="text-2xs text-muted-foreground">{sub.submittedOn}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-2xs text-muted-foreground">Revenue</p>
                    <p className="text-xs font-mono-nums font-medium text-foreground">
                      {sub.revenueActual}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-2xs text-muted-foreground">Growth</p>
                    <p className="text-xs font-mono-nums font-medium text-foreground">
                      {sub.growthRate}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <StatusBadge status={sub.status} size="sm" />
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-3 bg-surface/30 border-t border-border slide-up">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 mb-3">
                    <div>
                      <p className="text-2xs text-muted-foreground">Reviewed by</p>
                      <p className="text-xs font-medium text-foreground">{sub.reviewedBy}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-muted-foreground">Review date</p>
                      <p className="text-xs font-medium text-foreground">{sub.reviewedOn}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-muted-foreground">Documents</p>
                      <p className="text-xs font-medium text-foreground">{sub.documents} files</p>
                    </div>
                    <div>
                      <p className="text-2xs text-muted-foreground">Ref ID</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {sub.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {sub.notes && (
                    <div className="p-2.5 bg-card border border-border rounded-lg mb-3">
                      <p className="text-2xs text-muted-foreground mb-0.5">Reviewer notes</p>
                      <p className="text-xs text-foreground">{sub.notes}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button className="btn-secondary text-xs py-1.5">
                      <Eye size={12} />
                      View Report
                    </button>
                    <button className="btn-secondary text-xs py-1.5">
                      <Download size={12} />
                      Download Documents
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
