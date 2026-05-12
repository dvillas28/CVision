import { Outlet, useLocation } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { AuthCard } from '../components/auth/index.js';
import { InstitutionalFooter } from '../components/navigation/index.js';

export function AuthLayout({
  brand = 'CVision',
  description = 'Optimiza tu futuro profesional con inteligencia artificial avanzada.',
  children,
}) {
  const location = useLocation();
  const isRecover = location.pathname.includes('/recover');

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-surface">
      <main className="flex flex-1 items-center justify-center px-margin-mobile py-12 md:px-gutter">
        <div className="flex w-full max-w-[560px] flex-col gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-primary text-on-primary">
                <Eye aria-hidden="true" size={24} />
              </div>
              <span className="font-heading text-[32px] font-semibold leading-none tracking-[-0.01em] text-primary">
                {brand}
              </span>
            </div>
            <p className="max-w-[340px] text-body-md text-on-surface-variant">{description}</p>
          </div>

          <AuthCard showTabs={!isRecover}>{children || <Outlet />}</AuthCard>
        </div>
      </main>
      <InstitutionalFooter />
    </div>
  );
}
