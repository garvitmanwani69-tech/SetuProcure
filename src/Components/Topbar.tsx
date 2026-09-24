'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
} from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
  onCollapseToggle: () => void;
  sidebarCollapsed: boolean;
  role: 'government' | 'startup';
  startupName?: string;
}

export default function Topbar({
  onMenuClick,
  onCollapseToggle,
  sidebarCollapsed,
  role,
  startupName,
}: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    {
      id: 'notif-001',
      title: 'Milestone Achieved',
      body: 'FinFlow Pvt Ltd reached Revenue Target — Stage 2',
      time: '12 min ago',
      unread: true,
      type: 'success',
    },
    {
      id: 'notif-002',
      title: 'Submission Pending Review',
      body: 'AgroSense submitted Q3 progress report',
      time: '1 hr ago',
      unread: true,
      type: 'info',
    },
    {
      id: 'notif-003',
      title: 'Funding Release Approved',
      body: 'Stage 3 disbursement of ₹45L approved for MedTrack',
      time: '3 hr ago',
      unread: false,
      type: 'success',
    },
    {
      id: 'notif-004',
      title: 'Below Target Alert',
      body: 'GreenHarvest Q3 growth at 8.2% vs 15% target',
      time: '1 day ago',
      unread: false,
      type: 'warning',
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-3 flex-shrink-0 z-30">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={onCollapseToggle}
        className="hidden lg:flex p-2 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      {/* Breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">SetuProcure</span>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium">
          {role === 'government' ? 'Portfolio Dashboard' : startupName || 'Startup Portal'}
        </span>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer w-56">
        <Search size={14} />
        <span className="flex-1">Search startups...</span>
        <kbd className="text-2xs bg-muted px-1.5 py-0.5 rounded border border-border font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Last updated */}
      <div className="hidden lg:flex items-center gap-1.5 text-2xs text-muted-foreground">
        <RefreshCw size={11} />
        <span>Updated 2 min ago</span>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full pulse-dot" />
          )}
        </button>

        {notifOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-modal z-50 fade-in overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-semibold text-foreground">Notifications</span>
                <span className="text-2xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              </div>
              <div className="divide-y divide-border max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-surface transition-colors cursor-pointer ${n.unread ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          n.type === 'success'
                            ? 'bg-accent'
                            : n.type === 'warning'
                              ? 'bg-warning'
                              : 'bg-primary'
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {n.body}
                        </p>
                        <p className="text-2xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-border">
                <button className="text-xs text-primary hover:text-blue-400 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User avatar */}
      <Link
        href="/sign-up-login-screen"
        className="flex items-center gap-2 hover:bg-surface rounded-lg px-2 py-1.5 transition-colors group"
      >
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-primary text-xs font-semibold">
            {role === 'government' ? 'GM' : 'AS'}
          </span>
        </div>
        <span className="hidden md:block text-sm font-medium text-foreground">
          {role === 'government' ? 'Garvit M.' : 'Ayan S.'}
        </span>
        <ChevronDown
          size={14}
          className="text-muted-foreground group-hover:text-foreground transition-colors"
        />
      </Link>
    </header>
  );
}
