'use client';
import React from 'react';
import {
  Building2,
  Wallet,
  Target,
  AlertTriangle,
  Clock,
  FileSearch,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

// Grid plan: 7 KPI cards
// Row 1: hero card (spans 2 cols) + 2 regular = 4 cols
// Row 2: 3 regular cards
// grid-cols-2 md:grid-cols-4

const kpiData = [
  {
    id: 'kpi-total-startups',
    label: 'Active Startups',
    value: '12',
    unit: '',
    subtext: '4 sectors · 3 stages',
    trend: 'up',
    trendValue: '+2 this quarter',
    icon: Building2,
    color: 'primary',
    hero: false,
    alert: false,
  },
  {
    id: 'kpi-funds-disbursed',
    label: 'Total Funds Disbursed',
    value: '₹4.2Cr',
    unit: '',
    subtext: 'of ₹8.5Cr committed · 49.4%',
    trend: 'up',
    trendValue: '+₹85L this month',
    icon: Wallet,
    color: 'accent',
    hero: true,
    alert: false,
  },
  {
    id: 'kpi-milestone-rate',
    label: 'Milestone Achievement',
    value: '67.3%',
    unit: '',
    subtext: '33 of 49 milestones achieved',
    trend: 'up',
    trendValue: '+4.1% vs last quarter',
    icon: Target,
    color: 'accent',
    hero: false,
    alert: false,
  },
  {
    id: 'kpi-at-risk',
    label: 'Startups At Risk',
    value: '3',
    unit: '',
    subtext: 'Below target on ≥1 milestone',
    trend: 'up',
    trendValue: '+1 since last review',
    icon: AlertTriangle,
    color: 'danger',
    hero: false,
    alert: true,
  },
  {
    id: 'kpi-pending-approvals',
    label: 'Pending Approvals',
    value: '5',
    unit: '',
    subtext: '2 funding releases · 3 verifications',
    trend: 'neutral',
    trendValue: 'Oldest: 4 days ago',
    icon: Clock,
    color: 'warning',
    hero: false,
    alert: true,
  },
  {
    id: 'kpi-submissions',
    label: 'Submissions Awaiting Review',
    value: '8',
    unit: '',
    subtext: '3 with documents uploaded',
    trend: 'down',
    trendValue: '-2 from last week',
    icon: FileSearch,
    color: 'primary',
    hero: false,
    alert: false,
  },
  {
    id: 'kpi-avg-growth',
    label: 'Avg. Revenue Growth',
    value: '23.7%',
    unit: '',
    subtext: 'Across active portfolio · Q3 FY26',
    trend: 'down',
    trendValue: '-2.3% vs Q2',
    icon: TrendingUp,
    color: 'primary',
    hero: false,
    alert: false,
  },
];

const iconBgMap: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  accent: 'bg-accent/15 text-accent',
  danger: 'bg-danger/15 text-danger',
  warning: 'bg-warning/15 text-warning',
};

export default function KPIBentoGrid() {
  return (
    // 7 cards: hero spans 2 cols in row 1 (3+2 layout across 4 cols)
    // Row 1: hero(2col) + 2 regular = 4 cols
    // Row 2: 3 regular cards
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Row 1 */}
      {/* Hero card — spans 2 cols */}
      <KPICard card={kpiData[1]} className="col-span-2 md:col-span-2" />
      {/* 2 regular cards */}
      <KPICard card={kpiData[0]} className="col-span-1" />
      <KPICard card={kpiData[2]} className="col-span-1" />
      {/* Row 2: 4 cards across 4 cols */}
      <KPICard card={kpiData[3]} className="col-span-1" />
      <KPICard card={kpiData[4]} className="col-span-1" />
      <KPICard card={kpiData[5]} className="col-span-1" />
      <KPICard card={kpiData[6]} className="col-span-1" />
    </div>
  );
}

function KPICard({ card, className = '' }: { card: (typeof kpiData)[0]; className?: string }) {
  const Icon = card.icon;
  const isHero = card.hero;

  return (
    <div
      className={`card-base p-5 relative overflow-hidden group hover:shadow-card-hover transition-all duration-200 ${
        card.alert ? 'border-danger/30 bg-danger/5' : ''
      } ${isHero ? 'bg-gradient-to-br from-accent/10 to-card border-accent/20' : ''} ${className}`}
    >
      {/* Background glow for hero */}
      {isHero && (
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
      )}

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <p className={`label-text ${card.alert ? 'text-danger/80' : ''}`}>{card.label}</p>
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border ${iconBgMap[card.color]} ${card.alert ? 'border-danger/20' : 'border-transparent'}`}
          >
            <Icon size={18} />
          </div>
        </div>

        <p
          className={`font-mono-nums font-bold leading-none mb-2 ${isHero ? 'text-4xl text-accent' : 'text-3xl text-foreground'}`}
        >
          {card.value}
        </p>

        <p className="text-xs text-muted-foreground mb-3">{card.subtext}</p>

        <div className="flex items-center gap-1.5">
          {card.trend === 'up' && !card.alert && <TrendingUp size={12} className="text-accent" />}
          {card.trend === 'up' && card.alert && <TrendingUp size={12} className="text-danger" />}
          {card.trend === 'down' && <TrendingDown size={12} className="text-warning" />}
          {card.trend === 'neutral' && <Minus size={12} className="text-muted-foreground" />}
          <span
            className={`text-xs font-medium ${
              card.trend === 'up' && !card.alert
                ? 'text-accent'
                : card.trend === 'up' && card.alert
                  ? 'text-danger'
                  : card.trend === 'down'
                    ? 'text-warning'
                    : 'text-muted-foreground'
            }`}
          >
            {card.trendValue}
          </span>
        </div>
      </div>
    </div>
  );
}
