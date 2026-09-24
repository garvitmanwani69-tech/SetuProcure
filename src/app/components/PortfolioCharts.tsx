'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const PortfolioRevenueChart = dynamic(() => import('./charts/PortfolioRevenueChart'), {
  ssr: false,
});
const MilestoneDistributionChart = dynamic(() => import('./charts/MilestoneDistributionChart'), {
  ssr: false,
});
const SectorPerformanceChart = dynamic(() => import('./charts/SectorPerformanceChart'), {
  ssr: false,
});

export default function PortfolioCharts() {
  const [revenueRange, setRevenueRange] = useState<'6m' | '12m' | 'all'>('12m');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      {/* Revenue trend — spans 3 of 5 cols */}
      <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-3 card-base p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="section-header">Portfolio Revenue Trend</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Aggregate revenue across all funded startups
            </p>
          </div>
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
            {(['6m', '12m', 'all'] as const).map((r) => (
              <button
                key={`range-${r}`}
                onClick={() => setRevenueRange(r)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                  revenueRange === r
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r === 'all' ? 'All' : r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <PortfolioRevenueChart range={revenueRange} />
      </div>

      {/* Milestone distribution */}
      <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 card-base p-5">
        <div className="mb-4">
          <h2 className="section-header">Milestone Status</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Distribution across all stages</p>
        </div>
        <MilestoneDistributionChart />
      </div>

      {/* Sector performance */}
      <div className="lg:col-span-3 xl:col-span-1 2xl:col-span-1 card-base p-5">
        <div className="mb-4">
          <h2 className="section-header">Sector Achievement</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Milestone rate by sector</p>
        </div>
        <SectorPerformanceChart />
      </div>
    </div>
  );
}
