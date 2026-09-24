'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronUp,
  ChevronDown,
  Eye,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Building2,
} from 'lucide-react';
import StatusBadge from '@/Components/UI/StatusBadge';

const startups = [
  {
    id: 'startup-001',
    name: 'FinFlow Pvt Ltd',
    sector: 'Fintech',
    founder: 'Arjun Mehta',
    stage: 'Stage 2',
    fundingCommitted: '₹1.5Cr',
    fundingDisbursed: '₹85L',
    milestoneStatus: 'achieved' as const,
    lastSubmission: '18 Sep 2025',
    revenueGrowth: '+34.2%',
    overallStatus: 'active' as const,
    city: 'Bengaluru',
    registeredDate: '12 Mar 2024',
  },
  {
    id: 'startup-002',
    name: 'AgroSense Technologies',
    sector: 'Agritech',
    founder: 'Kavitha Nair',
    stage: 'Stage 1',
    fundingCommitted: '₹75L',
    fundingDisbursed: '₹30L',
    milestoneStatus: 'in-progress' as const,
    lastSubmission: '20 Sep 2025',
    revenueGrowth: '+18.6%',
    overallStatus: 'active' as const,
    city: 'Pune',
    registeredDate: '04 Jun 2024',
  },
  {
    id: 'startup-003',
    name: 'MedTrack Solutions',
    sector: 'Healthtech',
    founder: 'Rohan Gupta',
    stage: 'Stage 3',
    fundingCommitted: '₹2.2Cr',
    fundingDisbursed: '₹1.8Cr',
    milestoneStatus: 'achieved' as const,
    lastSubmission: '15 Sep 2025',
    revenueGrowth: '+29.1%',
    overallStatus: 'under-review' as const,
    city: 'Mumbai',
    registeredDate: '22 Jan 2024',
  },
  {
    id: 'startup-004',
    name: 'GreenHarvest Farms',
    sector: 'Agritech',
    founder: 'Sunita Reddy',
    stage: 'Stage 1',
    fundingCommitted: '₹60L',
    fundingDisbursed: '₹20L',
    milestoneStatus: 'below-target' as const,
    lastSubmission: '10 Sep 2025',
    revenueGrowth: '+8.2%',
    overallStatus: 'active' as const,
    city: 'Hyderabad',
    registeredDate: '15 Aug 2024',
  },
  {
    id: 'startup-005',
    name: 'EduPath Learning',
    sector: 'Edtech',
    founder: 'Vikram Joshi',
    stage: 'Stage 2',
    fundingCommitted: '₹1.0Cr',
    fundingDisbursed: '₹55L',
    milestoneStatus: 'in-progress' as const,
    lastSubmission: '19 Sep 2025',
    revenueGrowth: '+22.3%',
    overallStatus: 'active' as const,
    city: 'Delhi',
    registeredDate: '07 Nov 2023',
  },
  {
    id: 'startup-006',
    name: 'PayQuick India',
    sector: 'Fintech',
    founder: 'Neha Sharma',
    stage: 'Stage 1',
    fundingCommitted: '₹80L',
    fundingDisbursed: '₹0',
    milestoneStatus: 'pending' as const,
    lastSubmission: '—',
    revenueGrowth: '—',
    overallStatus: 'pending' as const,
    city: 'Chennai',
    registeredDate: '03 Sep 2025',
  },
  {
    id: 'startup-007',
    name: 'DrugLogic Pharmatech',
    sector: 'Healthtech',
    founder: 'Aditya Bose',
    stage: 'Stage 2',
    fundingCommitted: '₹1.3Cr',
    fundingDisbursed: '₹70L',
    milestoneStatus: 'below-target' as const,
    lastSubmission: '08 Sep 2025',
    revenueGrowth: '+11.4%',
    overallStatus: 'active' as const,
    city: 'Kolkata',
    registeredDate: '18 Feb 2024',
  },
  {
    id: 'startup-008',
    name: 'CropShield AI',
    sector: 'Agritech',
    founder: 'Preethi Menon',
    stage: 'Stage 1',
    fundingCommitted: '₹65L',
    fundingDisbursed: '₹35L',
    milestoneStatus: 'achieved' as const,
    lastSubmission: '21 Sep 2025',
    revenueGrowth: '+41.7%',
    overallStatus: 'active' as const,
    city: 'Coimbatore',
    registeredDate: '30 Apr 2024',
  },
  {
    id: 'startup-009',
    name: 'NudgeWell Health',
    sector: 'Healthtech',
    founder: 'Sanjay Pillai',
    stage: 'Stage 1',
    fundingCommitted: '₹50L',
    fundingDisbursed: '₹25L',
    milestoneStatus: 'in-progress' as const,
    lastSubmission: '17 Sep 2025',
    revenueGrowth: '+15.9%',
    overallStatus: 'active' as const,
    city: 'Kochi',
    registeredDate: '12 Jul 2024',
  },
  {
    id: 'startup-010',
    name: 'LendSmart Finance',
    sector: 'Fintech',
    founder: 'Deepika Rao',
    stage: 'Stage 3',
    fundingCommitted: '₹3.0Cr',
    fundingDisbursed: '₹2.4Cr',
    milestoneStatus: 'achieved' as const,
    lastSubmission: '22 Sep 2025',
    revenueGrowth: '+38.5%',
    overallStatus: 'disbursed' as const,
    city: 'Bengaluru',
    registeredDate: '10 Oct 2023',
  },
];

const sectorColors: Record<string, string> = {
  Fintech: 'bg-primary/15 text-primary',
  Agritech: 'bg-accent/15 text-accent',
  Healthtech: 'bg-warning/15 text-warning',
  Edtech: 'bg-purple-500/15 text-purple-400',
};

type SortKey = 'name' | 'sector' | 'stage' | 'milestoneStatus';
type SortDir = 'asc' | 'desc';

export default function StartupTable() {
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    return startups
      .filter((s) => {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.founder.toLowerCase().includes(q) ||
          s.sector.toLowerCase().includes(q)
        );
      })
      .filter((s) => sectorFilter === 'all' || s.sector === sectorFilter)
      .filter((s) => statusFilter === 'all' || s.milestoneStatus === statusFilter)
      .sort((a, b) => {
        const av = a[sortKey] as string;
        const bv = b[sortKey] as string;
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, sectorFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const toggleAll = () => {
    if (selectedRows.size === paged.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(paged.map((s) => s.id)));
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="opacity-20" />;
    return sortDir === 'asc' ? (
      <ChevronUp size={12} className="text-primary" />
    ) : (
      <ChevronDown size={12} className="text-primary" />
    );
  };

  return (
    <div className="card-base overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
        <div>
          <h2 className="section-header">Funded Startups</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} startups · FY 2025–26
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 text-sm w-52">
            <Search size={14} className="text-muted-foreground flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search startups..."
              className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm flex-1 min-w-0"
            />
          </div>

          {/* Sector filter */}
          <select
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value);
              setPage(1);
            }}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer"
          >
            <option value="all">All Sectors</option>
            <option value="Fintech">Fintech</option>
            <option value="Agritech">Agritech</option>
            <option value="Healthtech">Healthtech</option>
            <option value="Edtech">Edtech</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="achieved">Achieved</option>
            <option value="in-progress">In Progress</option>
            <option value="below-target">Below Target</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedRows.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/10 border-b border-primary/20 slide-up">
          <span className="text-sm font-medium text-primary">{selectedRows.size} selected</span>
          <div className="h-4 w-px bg-primary/30" />
          <button className="text-xs text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <CheckCircle2 size={14} />
            Approve Selected
          </button>
          <button className="text-xs text-danger hover:text-red-400 transition-colors flex items-center gap-1.5">
            <XCircle size={14} />
            Flag for Review
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[900px]">
          <thead className="bg-surface/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paged.length && paged.length > 0}
                  onChange={toggleAll}
                  className="rounded border-border accent-primary cursor-pointer"
                  aria-label="Select all rows"
                />
              </th>
              {[
                { key: 'name', label: 'Startup' },
                { key: 'sector', label: 'Sector' },
                { key: null, label: 'Founder' },
                { key: 'stage', label: 'Stage' },
                { key: null, label: 'Committed' },
                { key: null, label: 'Disbursed' },
                { key: 'milestoneStatus', label: 'Milestone' },
                { key: null, label: 'Growth' },
                { key: null, label: 'Last Submission' },
                { key: null, label: '' },
              ].map((col, i) => (
                <th
                  key={`th-${i}`}
                  className={`table-header text-left ${col.key ? 'cursor-pointer hover:text-foreground transition-colors select-none' : ''}`}
                  onClick={() => col.key && handleSort(col.key as SortKey)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.key && <SortIcon col={col.key as SortKey} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Building2 size={32} className="text-muted-foreground/40" />
                    <p className="text-sm font-medium text-muted-foreground">
                      No startups match your filters
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting the sector or status filter
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((startup) => (
                <tr
                  key={startup.id}
                  className={`hover:bg-surface/50 transition-colors group ${
                    selectedRows.has(startup.id) ? 'bg-primary/5' : ''
                  } ${startup.milestoneStatus === 'below-target' ? 'border-l-2 border-l-danger' : ''}`}
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(startup.id)}
                      onChange={() => toggleRow(startup.id)}
                      className="rounded border-border accent-primary cursor-pointer"
                      aria-label={`Select ${startup.name}`}
                    />
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-foreground">{startup.name}</p>
                      <p className="text-xs text-muted-foreground">{startup.city}</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span
                      className={`status-badge text-2xs ${sectorColors[startup.sector] || 'bg-muted text-muted-foreground'}`}
                    >
                      {startup.sector}
                    </span>
                  </td>
                  <td className="table-cell text-muted-foreground">{startup.founder}</td>
                  <td className="table-cell">
                    <span className="font-mono-nums text-xs bg-surface px-2 py-1 rounded-md border border-border text-foreground">
                      {startup.stage}
                    </span>
                  </td>
                  <td className="table-cell font-mono-nums text-sm">{startup.fundingCommitted}</td>
                  <td className="table-cell font-mono-nums text-sm text-accent">
                    {startup.fundingDisbursed}
                  </td>
                  <td className="table-cell">
                    <StatusBadge status={startup.milestoneStatus} size="sm" />
                  </td>
                  <td className="table-cell">
                    <span
                      className={`font-mono-nums text-sm font-medium ${
                        startup.revenueGrowth === '—'
                          ? 'text-muted-foreground'
                          : parseFloat(startup.revenueGrowth) >= 20
                            ? 'text-accent'
                            : parseFloat(startup.revenueGrowth) >= 12
                              ? 'text-primary'
                              : 'text-warning'
                      }`}
                    >
                      {startup.revenueGrowth}
                    </span>
                  </td>
                  <td className="table-cell text-muted-foreground text-xs">
                    {startup.lastSubmission}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href="/startup-portal"
                        title="View startup details"
                        className="p-1.5 rounded-lg hover:bg-primary/15 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Eye size={14} />
                      </Link>
                      <button
                        title="More actions"
                        className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Show</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="bg-surface border border-border rounded-md px-2 py-1 text-foreground outline-none text-xs cursor-pointer"
          >
            {[5, 8, 10, 20].map((n) => (
              <option key={`perpage-${n}`} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>per page · {filtered.length} total</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={`page-${i + 1}`}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                page === i + 1
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
