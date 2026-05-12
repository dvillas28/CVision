import { cn } from '../../utils/cn.js';

export function Card({ as: Component = 'section', className, children, ...props }) {
  return (
    <Component
      className={cn('rounded border border-card-border bg-white p-6 shadow-card', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
