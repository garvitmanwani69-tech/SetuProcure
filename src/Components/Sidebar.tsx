'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/Components/UI/AppLogo';
import {
  LayoutDashboard,
  Building2,
  Target,
  FileText,
  Wallet,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Layers,
  ClipboardCheck,
  FolderOpen,
  TrendingUp,
  Shield,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  role: 'government' | 'startup';
}

const govNavItems = [
  {
    group: 'Overview',
    items: [
      { label: 'Portfolio Dashboard', href: '/', icon: LayoutDashboard, badge: null },
      { label: 'All Startups', href: '/government-dashboard', icon: Building2, badge: '12' },
    ],
  },
  {
    group: 'Management',
    items: [
      { label: 'Funding Stages', href: '/government-dashboard', icon: Layers, badge: null },
      { label: 'Milestones', href: '/government-dashboard', icon: Target, badge: '5' },
      {
        label: 'Submissions Review',
        href: '/government-dashboard',
        icon: ClipboardCheck,
        badge: '3',
      },
      { label: 'Document Vault', href: '/government-dashboard', icon: FolderOpen, badge: null },
    ],
  },
  {
    group: 'Analytics',
    items: [
      { label: 'Performance Reports', href: '/government-dashboard', icon: BarChart3, badge: null },
      { label: 'Funding Audit Trail', href: '/government-dashboard', icon: Shield, badge: null },
    ],
  },
];

const startupNavItems = [
  {
    group: 'My Program',
    items: [
      { label: 'My Dashboard', href: '/startup-portal', icon: LayoutDashboard, badge: null },
      { label: 'Milestones', href: '/startup-portal', icon: Target, badge: '2' },
      { label: 'Submit Progress', href: '/startup-portal', icon: FileText, badge: null },
    ],
  },
  {
    group: 'Funding',
    items: [
      { label: 'Funding Timeline', href: '/startup-portal', icon: Wallet, badge: null },
      { label: 'My Documents', href: '/startup-portal', icon: FolderOpen, badge: null },
    ],
  },
  {
    group: 'Insights',
    items: [
      { label: 'Growth Analytics', href: '/startup-portal', icon: TrendingUp, badge: null },
      { label: 'Notifications', href: '/startup-portal', icon: Bell, badge: '4' },
    ],
  },
];

export default function Sidebar({ collapsed, mobileOpen, onMobileClose, role }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role === 'government' ? govNavItems : startupNavItems;

  const sidebarWidth = collapsed ? 'w-16' : 'w-60';

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col ${sidebarWidth} sidebar-transition bg-card border-r border-border flex-shrink-0 h-screen`}
      >
        <SidebarContent collapsed={collapsed} navItems={navItems} pathname={pathname} role={role} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent
          collapsed={false}
          navItems={navItems}
          pathname={pathname}
          role={role}
          onClose={onMobileClose}
        />
      </aside>
    </>
  );
}

function SidebarContent({
  collapsed,
  navItems,
  pathname,
  role,
  onClose,
}: {
  collapsed: boolean;
  navItems: typeof govNavItems;
  pathname: string;
  role: 'government' | 'startup';
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-border flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}
      >
        <AppLogo size={32} />
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm text-foreground tracking-tight leading-none">
              SetuProcure
            </span>
            <span className="text-2xs text-muted-foreground mt-0.5 uppercase tracking-widest">
              {role === 'government' ? 'Gov. Officer' : 'Startup Portal'}
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-6">
        {navItems.map((group) => (
          <div key={`group-${group.group}`}>
            {!collapsed && <p className="label-text px-3 mb-2">{group.group}</p>}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={`nav-${item.label}`}
                    href={item.href}
                    onClick={onClose}
                    title={collapsed ? item.label : undefined}
                    className={`nav-item relative ${isActive ? 'nav-item-active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-primary/20 text-primary text-2xs font-medium px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className={`border-t border-border px-3 py-4 space-y-0.5 flex-shrink-0`}>
        <Link
          href="/government-dashboard"
          className={`nav-item ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={18} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <Link
          href="/sign-up-login-screen"
          className={`nav-item text-danger hover:text-danger hover:bg-danger/10 ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Link>

        {!collapsed && (
          <div className="mt-3 px-3 py-3 bg-surface rounded-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-semibold">
                  {role === 'government' ? 'GO' : 'SF'}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {role === 'government' ? 'Garvit Manwani' : 'Ayan Sharma'}
                </p>
                <p className="text-2xs text-muted-foreground truncate">
                  {role === 'government' ? 'Program Officer' : 'Founder, FinFlow'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
