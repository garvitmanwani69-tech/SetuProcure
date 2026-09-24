import React from 'react';
import AppLayout from '@/Components/AppLayout';
import StartupStageHeader from './StartupStageHeader';
import MilestoneCards from './MilestoneCards';
import SubmissionForm from './SubmissionForm';
import StartupCharts from './StartupCharts';
import FundingTimeline from './FundingTimeline';
import SubmissionHistory from './SubmissionHistory';

export default function StartupPortalPage() {
  return (
    <AppLayout role="startup" startupName="FinFlow Pvt Ltd">
      <div className="space-y-6 fade-in">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-semibold text-foreground">FinFlow Pvt Ltd</h1>
              <span className="status-badge bg-accent/15 text-accent border border-accent/25 text-2xs">
                <span className="w-1.5 h-1.5 bg-accent rounded-full pulse-dot" />
                Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Stage 2 · Fintech · DPIIT Innovation Program FY 2025–26
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground bg-surface border border-border px-3 py-1.5 rounded-full">
              Program ID:{' '}
              <span className="font-mono-nums text-foreground ml-1">DPIIT-FIN-2024-001</span>
            </div>
          </div>
        </div>

        {/* Stage progress header */}
        <StartupStageHeader />

        {/* Milestone cards */}
        <MilestoneCards />

        {/* Charts + Submission form */}
        <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 2xl:col-span-3">
            <StartupCharts />
          </div>
          <div className="xl:col-span-2 2xl:col-span-2">
            <SubmissionForm />
          </div>
        </div>

        {/* Funding timeline + Submission history */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FundingTimeline />
          <SubmissionHistory />
        </div>
      </div>
    </AppLayout>
  );
}
