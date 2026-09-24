import React from 'react';
import AppLayout from '@/Components/AppLayout';
import GovStartupList from './GovStartupList';
import FundingPipeline from './FundingPipeline';
import AuditTrail from './AuditTrail';

export default function GovernmentDashboardDetailPage() {
  return (
    <AppLayout role="government">
      <div className="space-y-6 fade-in">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">All Startups</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Complete portfolio management — DPIIT Innovation Program FY 2025–26
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="btn-secondary text-sm">Export Report</button>
            <button className="btn-primary text-sm">+ Register Startup</button>
          </div>
        </div>

        <FundingPipeline />

        <GovStartupList />

        <AuditTrail />
      </div>
    </AppLayout>
  );
}
