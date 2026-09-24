'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const StartupRevenueChart = dynamic(() => import('./charts/StartupRevenueChart'), { ssr: false });

export default function StartupCharts() {
  return (
    <div className="card-base p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-header">Revenue & Growth Trend</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly performance vs. milestones</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-primary rounded-full" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-accent rounded-full" />
            <span className="text-muted-foreground">Growth %</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-warning/60 rounded-full border-t border-dashed border-warning" />
            <span className="text-muted-foreground">Target</span>
          </div>
        </div>
      </div>
      <StartupRevenueChart />
    </div>
  );
}
