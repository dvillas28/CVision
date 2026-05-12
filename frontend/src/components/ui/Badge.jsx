import { cn } from '../../utils/cn.js';

const variants = {
  neutral: 'bg-chip text-on-surface-variant',
  primary: 'bg-primary-fixed text-on-primary-fixed',
  secondary: 'bg-secondary-fixed text-on-secondary-fixed',
  error: 'bg-error-container text-on-error-container',
};

export function Badge({ variant = 'neutral', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-sm px-2 font-heading text-label-sm',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
