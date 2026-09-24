import React from 'react';

type StatusType =
  | 'achieved'
  | 'in-progress'
  | 'below-target'
  | 'pending'
  | 'active'
  | 'disbursed'
  | 'under-review'
  | 'submitted'
  | 'verified'
  | 'rejected'
  | 'draft';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

const statusConfig: Record<StatusType, { label: string; className: string; dot: string }> = {
  achieved: {
    label: 'Achieved',
    className: 'bg-accent/15 text-accent border border-accent/25',
    dot: 'bg-accent',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-primary/15 text-primary border border-primary/25',
    dot: 'bg-primary',
  },
  'below-target': {
    label: 'Below Target',
    className: 'bg-danger/15 text-danger border border-danger/25',
    dot: 'bg-danger',
  },
  pending: {
    label: 'Pending',
    className: 'bg-muted text-muted-foreground border border-border',
    dot: 'bg-muted-foreground',
  },
  active: {
    label: 'Active',
    className: 'bg-primary/15 text-primary border border-primary/25',
    dot: 'bg-primary pulse-dot',
  },
  disbursed: {
    label: 'Disbursed',
    className: 'bg-accent/15 text-accent border border-accent/25',
    dot: 'bg-accent',
  },
  'under-review': {
    label: 'Under Review',
    className: 'bg-warning/15 text-warning border border-warning/25',
    dot: 'bg-warning',
  },
  submitted: {
    label: 'Submitted',
    className: 'bg-primary/15 text-primary border border-primary/25',
    dot: 'bg-primary',
  },
  verified: {
    label: 'Verified',
    className: 'bg-accent/15 text-accent border border-accent/25',
    dot: 'bg-accent',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-danger/15 text-danger border border-danger/25',
    dot: 'bg-danger',
  },
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground border border-border',
    dot: 'bg-muted-foreground',
  },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`status-badge ${config.className} ${size === 'sm' ? 'text-2xs px-2 py-0.5' : ''}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}
