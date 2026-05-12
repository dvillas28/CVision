import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { InstitutionalFooter, Sidebar, Topbar } from '../components/navigation/index.js';

const defaultUser = {
  name: 'Usuario CVision',
  role: 'Chile Employment Portal',
  initials: 'CV',
};

const defaultCreateCta = {
  label: 'Create New CV',
  shortLabel: 'New CV',
  to: '/dashboard/cvs/new',
};

const adminUser = {
  name: 'Admin SENCE',
  role: 'Global Moderator',
  initials: 'AS',
};

export function DashboardLayout({
  title,
  user,
  actions,
  navigationItems,
  secondaryNavigationItems,
  createCta = defaultCreateCta,
  footerProps,
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/dashboard/admin');
  const resolvedTitle = title ?? (isAdmin ? 'Admin Overview' : 'Dashboard');
  const resolvedUser = user ?? (isAdmin ? adminUser : defaultUser);
  const resolvedFooterProps = {
    ...(isAdmin
      ? {
          brand: 'CVision Admin',
        }
      : {}),
    ...footerProps,
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface">
      <Sidebar
        items={navigationItems}
        secondaryItems={secondaryNavigationItems}
        cta={createCta}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[160px]">
        <Topbar title={resolvedTitle} actions={actions} user={resolvedUser} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="w-full flex-1 bg-background px-margin-mobile py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:px-gutter lg:px-8">
          {children || <Outlet />}
        </main>
        <InstitutionalFooter {...resolvedFooterProps} />
      </div>
    </div>
  );
}
