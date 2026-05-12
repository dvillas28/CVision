import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

const variants = {
  primary:
    'rounded-full border border-primary bg-primary text-on-primary shadow-card hover:bg-primary-container focus-visible:shadow-focus',
  secondary:
    'rounded border border-primary bg-transparent text-primary hover:bg-primary-fixed focus-visible:shadow-focus',
  ghost:
    'rounded border border-transparent bg-transparent text-secondary hover:bg-secondary-fixed focus-visible:shadow-focus',
};

const sizes = {
  sm: 'h-9 px-4 text-label-sm',
  md: 'h-10 px-5 text-label-md',
  lg: 'h-12 px-6 text-label-md',
};

export const Button = forwardRef(
  ({ as: Component = 'button', variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';
