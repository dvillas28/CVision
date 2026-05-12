import { useLocation } from 'react-router-dom';
import { Card } from '../ui/Card.jsx';
import { AuthTabs } from './AuthTabs.jsx';
import { cn } from '../../utils/cn.js';

export function AuthCard({ children, showTabs = true }) {
  const location = useLocation();
  const mode = location.pathname.includes('/register')
    ? 'register'
    : location.pathname.includes('/recover')
      ? 'recover'
      : 'login';

  return (
    <Card className={cn('auth-card-shell overflow-hidden rounded-xl p-0', `auth-mode-${mode}`)}>
      {showTabs ? <AuthTabs /> : null}
      <div
        key={location.pathname}
        className={cn('auth-panel-enter relative z-10 space-y-6 p-8 md:p-10', `auth-panel-${mode}`)}
      >
        {children}
      </div>
    </Card>
  );
}
