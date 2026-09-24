import React from 'react';
import AppLayout from '@/Components/AppLayout';
import KPIBentoGrid from './components/KPIBentoGrid';
import PortfolioCharts from './components/PortfolioCharts';
import StartupTable from './components/StartupTable';
import PendingApprovalsPanel from './components/PendingApprovalsPanel';

export default function GovernmentDashboardPage() {
  return (
    <AppLayout role="government">
      <div className="space-y-6 fade-in">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Portfolio Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Startup funding & milestone overview — FY 2025–26 · DPIIT Innovation Program
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-accent rounded-full pulse-dot" />
              Live Data
            </div>
            <button className="btn-primary text-sm">
              <span>+ Register Startup</span>
            </button>
          </div>
        </div>

        {/* KPI Bento Grid */}
        <KPIBentoGrid />

        {/* Charts row */}
        <PortfolioCharts />

        {/* Table + Approvals */}
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div className="xl:col-span-2 2xl:col-span-3">
            <StartupTable />
          </div>
          <div className="xl:col-span-1">
            <PendingApprovalsPanel />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
