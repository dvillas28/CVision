import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

const tabs = [
  { label: 'Log In', to: '/auth', end: true },
  { label: 'Sign up', to: '/auth/register' },
];

export function AuthTabs() {
  return (
    <div className="grid grid-cols-2 border-b border-outline-variant" role="tablist" aria-label="Opciones de acceso">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            cn(
              'relative py-4 text-center font-heading text-label-md transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300',
              isActive
                ? 'text-primary after:scale-x-100'
                : 'text-on-surface-variant after:scale-x-0 hover:bg-surface-container-low hover:text-primary',
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
