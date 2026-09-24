'use client';
import React, { useState } from 'react';
import {
  Shield,
  ChevronDown,
  Wallet,
  CheckCircle2,
  FileText,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';

const auditLogs = [
  {
    id: 'audit-001',
    action: 'Funding Released',
    startup: 'MedTrack Solutions',
    amount: '₹45L',
    stage: 'Stage 3 — Tranche 2',
    actor: 'Priya Sharma',
    actorRole: 'Program Officer',
    timestamp: '22 Sep 2025 · 14:32 IST',
    type: 'funding',
    hash: 'TXN-2025-0922-MED-003',
  },
  {
    id: 'audit-002',
    action: 'Milestone Verified',
    startup: 'FinFlow Pvt Ltd',
    amount: null,
    stage: 'Revenue Target — Stage 2',
    actor: 'Priya Sharma',
    actorRole: 'Program Officer',
    timestamp: '21 Sep 2025 · 11:15 IST',
    type: 'verification',
    hash: 'VRF-2025-0921-FIN-012',
  },
  {
    id: 'audit-003',
    action: 'Submission Reviewed',
    startup: 'AgroSense Technologies',
    amount: null,
    stage: 'Q3 Progress Report',
    actor: 'Rahul Verma',
    actorRole: 'Analyst',
    timestamp: '20 Sep 2025 · 16:48 IST',
    type: 'review',
    hash: 'REV-2025-0920-AGR-008',
  },
  {
    id: 'audit-004',
    action: 'Below Target Flagged',
    startup: 'GreenHarvest Farms',
    amount: null,
    stage: 'Q2 Growth Milestone',
    actor: 'System (Auto)',
    actorRole: 'Automated Rule Engine',
    timestamp: '10 Sep 2025 · 09:22 IST',
    type: 'alert',
    hash: 'SYS-2025-0910-GRN-004',
  },
  {
    id: 'audit-005',
    action: 'Startup Registered',
    startup: 'PayQuick India',
    amount: null,
    stage: 'Program Enrollment',
    actor: 'Priya Sharma',
    actorRole: 'Program Officer',
    timestamp: '03 Sep 2025 · 10:05 IST',
    type: 'registration',
    hash: 'REG-2025-0903-PAY-001',
  },
  {
    id: 'audit-006',
    action: 'Funding Released',
    startup: 'CropShield AI',
    amount: '₹35L',
    stage: 'Stage 1 — Initial Disbursement',
    actor: 'Priya Sharma',
    actorRole: 'Program Officer',
    timestamp: '28 Aug 2025 · 15:00 IST',
    type: 'funding',
    hash: 'TXN-2025-0828-CRP-002',
  },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  funding: { icon: Wallet, color: 'text-accent', bg: 'bg-accent/15' },
  verification: { icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/15' },
  review: { icon: FileText, color: 'text-warning', bg: 'bg-warning/15' },
  alert: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/15' },
  registration: { icon: UserCheck, color: 'text-purple-400', bg: 'bg-purple-500/15' },
};

export default function AuditTrail() {
  const [filter, setFilter] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  const filtered = auditLogs.filter((l) => filter === 'all' || l.type === filter);
  const visible = showAll ? filtered : filtered.slice(0, 4);

  return (
    <div className="card-base overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary/15 border border-primary/20 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="section-header">Funding Audit Trail</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Immutable log of all funding actions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xstext-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer"
          >
            <option value="all">All Actions</option>
            <option value="funding">Funding Releases</option>
            <option value="verification">Verifications</option>
            <option value="review">Reviews</option>
            <option value="alert">Alerts</option>
            <option value="registration">Registrations</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-border">
        {visible.map((log) => {
          const cfg = typeConfig[log.type];
          const Icon = cfg.icon;
          return (
            <div
              key={log.id}
              className="flex items-start gap-4 px-4 py-3.5 hover:bg-surface/40 transition-colors group"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}
              >
                <Icon size={14} className={cfg.color} />
              </div>
              <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
                <div className="md:col-span-1">
                  <p className="text-sm font-medium text-foreground">{log.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{log.startup}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs text-muted-foreground">{log.stage}</p>
                  {log.amount && (
                    <p className="text-xs font-mono-nums font-semibold text-accent mt-0.5">
                      {log.amount}
                    </p>
                  )}
                </div>
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-xs text-muted-foreground">{log.actor}</p>
                  <p className="text-2xs text-muted-foreground/60 mt-0.5">{log.timestamp}</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center flex-shrink-0">
                <span className="font-mono text-2xs text-muted-foreground/50 bg-surface px-2 py-1 rounded border border-border">
                  {log.hash}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length > 4 && (
        <div className="px-4 py-3 border-t border-border">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-blue-400 transition-colors"
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
            />
            {showAll ? 'Show less' : `Show ${filtered.length - 4} more entries`}
          </button>
        </div>
      )}
    </div>
  );
}
