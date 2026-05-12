import { Outlet } from 'react-router-dom';

export function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      {children || <Outlet />}
    </div>
  );
}
