'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, FileText, Wallet, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import StatusBadge from '@/Components/UI/StatusBadge';

const startups = [
  {
    id: 'gov-startup-001',
    name: 'FinFlow Pvt Ltd',
    sector: 'Fintech',
    founder: 'Arjun Mehta',
    email: 'arjun@finflow.in',
    city: 'Bengaluru',
    stage: 'Stage 2',
    currentMilestone: 'Revenue Target ₹1.2Cr',
    milestoneStatus: 'achieved' as const,
    fundingStatus: 'under-review' as const,
    submissionsCount: 6,
    lastActive: '18 Sep 2025',
    revenueActual: '₹1.31Cr',
    revenueTarget: '₹1.2Cr',
    growthActual: 34.2,
    growthTarget: 25,
  },
  {
    id: 'gov-startup-002',
    name: 'AgroSense Technologies',
    sector: 'Agritech',
    founder: 'Kavitha Nair',
    email: 'kavitha@agrosense.io',
    city: 'Pune',
    stage: 'Stage 1',
    currentMilestone: 'Q3 Revenue ₹45L',
    milestoneStatus: 'in-progress' as const,
    fundingStatus: 'active' as const,
    submissionsCount: 3,
    lastActive: '20 Sep 2025',
    revenueActual: '₹38L',
    revenueTarget: '₹45L',
    growthActual: 18.6,
    growthTarget: 20,
  },
  {
    id: 'gov-startup-003',
    name: 'MedTrack Solutions',
    sector: 'Healthtech',
    founder: 'Rohan Gupta',
    email: 'rohan@medtrack.co',
    city: 'Mumbai',
    stage: 'Stage 3',
    currentMilestone: 'Scale Revenue ₹3.5Cr',
    milestoneStatus: 'achieved' as const,
    fundingStatus: 'under-review' as const,
    submissionsCount: 9,
    lastActive: '15 Sep 2025',
    revenueActual: '₹3.8Cr',
    revenueTarget: '₹3.5Cr',
    growthActual: 29.1,
    growthTarget: 25,
  },
  {
    id: 'gov-startup-004',
    name: 'GreenHarvest Farms',
    sector: 'Agritech',
    founder: 'Sunita Reddy',
    email: 'sunita@greenharvest.farm',
    city: 'Hyderabad',
    stage: 'Stage 1',
    currentMilestone: 'Q2 Growth 15%',
    milestoneStatus: 'below-target' as const,
    fundingStatus: 'active' as const,
    submissionsCount: 2,
    lastActive: '10 Sep 2025',
    revenueActual: '₹22L',
    revenueTarget: '₹35L',
    growthActual: 8.2,
    growthTarget: 15,
  },
  {
    id: 'gov-startup-005',
    name: 'PayQuick India',
    sector: 'Fintech',
    founder: 'Neha Sharma',
    email: 'neha@payquick.in',
    city: 'Chennai',
    stage: 'Stage 1',
    currentMilestone: 'Initial Traction',
    milestoneStatus: 'pending' as const,
    fundingStatus: 'pending' as const,
    submissionsCount: 0,
    lastActive: 'Not submitted yet',
    revenueActual: '—',
    revenueTarget: '₹20L',
    growthActual: 0,
    growthTarget: 10,
  },
];

const sectorColors: Record<string, string> = {
  Fintech: 'bg-primary/15 text-primary',
  Agritech: 'bg-accent/15 text-accent',
  Healthtech: 'bg-warning/15 text-warning',
  Edtech: 'bg-purple-500/15 text-purple-400',
};

export default function GovStartupList() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = startups.filter((s) => {
    const q = search.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.founder.toLowerCase().includes(q);
  });

  return (
    <div className="card-base overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="section-header">Startup Profiles</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Full milestone & funding details per startup
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 text-sm w-48">
            <Search size={13} className="text-muted-foreground flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm flex-1 min-w-0"
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {filtered.map((startup) => {
          const isExpanded = expanded === startup.id;
          const growthMet = startup.growthActual >= startup.growthTarget;
          return (
            <div key={startup.id}>
              <div
                className={`flex items-center gap-4 px-4 py-4 hover:bg-surface/50 transition-colors cursor-pointer ${
                  startup.milestoneStatus === 'below-target' ? 'border-l-2 border-l-danger' : ''
                }`}
                onClick={() => setExpanded(isExpanded ? null : startup.id)}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">
                    {startup.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                </div>

                <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 items-center">
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-sm font-medium text-foreground truncate">{startup.name}</p>
                    <p className="text-xs text-muted-foreground">{startup.founder}</p>
                  </div>
                  <div className="hidden md:block">
                    <span className={`status-badge text-2xs ${sectorColors[startup.sector] || ''}`}>
                      {startup.sector}
                    </span>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs text-muted-foreground">Current Milestone</p>
                    <p className="text-xs font-medium text-foreground truncate">
                      {startup.currentMilestone}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <StatusBadge status={startup.milestoneStatus} size="sm" />
                  </div>
                  <div className="hidden lg:block">
                    <StatusBadge status={startup.fundingStatus} size="sm" />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href="/startup-portal"
                    onClick={(e) => e.stopPropagation()}
                    title="View startup portal"
                    className="p-1.5 rounded-lg hover:bg-primary/15 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Eye size={14} />
                  </Link>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 pb-4 bg-surface/30 border-t border-border slide-up">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <p className="label-text mb-1">Revenue Actual vs Target</p>
                      <p className="text-lg font-mono-nums font-bold text-foreground">
                        {startup.revenueActual}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Target: {startup.revenueTarget}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg border ${growthMet ? 'bg-accent/5 border-accent/20' : 'bg-danger/5 border-danger/20'}`}
                    >
                      <p className="label-text mb-1">Growth vs Target</p>
                      <div className="flex items-center gap-1.5">
                        {growthMet ? (
                          <TrendingUp size={16} className="text-accent" />
                        ) : (
                          <TrendingDown size={16} className="text-danger" />
                        )}
                        <p
                          className={`text-lg font-mono-nums font-bold ${growthMet ? 'text-accent' : 'text-danger'}`}
                        >
                          {startup.growthActual}%
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Target: {startup.growthTarget}%
                      </p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <p className="label-text mb-1">Submissions</p>
                      <p className="text-lg font-mono-nums font-bold text-foreground">
                        {startup.submissionsCount}
                      </p>
                      <p className="text-xs text-muted-foreground">Last: {startup.lastActive}</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <p className="label-text mb-1">Contact</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {startup.founder}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{startup.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Link href="/startup-portal" className="btn-primary text-xs py-1.5">
                      <Eye size={13} />
                      View Full Portal
                    </Link>
                    <button className="btn-secondary text-xs py-1.5">
                      <FileText size={13} />
                      View Documents
                    </button>
                    <button className="btn-success text-xs py-1.5">
                      <Wallet size={13} />
                      Trigger Funding
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
