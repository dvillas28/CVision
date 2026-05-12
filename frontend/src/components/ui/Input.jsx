import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

export const Input = forwardRef(
  ({ id, label, helperText, error, className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label ? (
          <label htmlFor={id} className="block font-heading text-label-md text-primary/80">
            {label}
          </label>
        ) : null}
        <input
          id={id}
          ref={ref}
          className={cn(
            'h-11 w-full rounded border border-field-border bg-white px-3 text-body-md text-on-surface outline-none transition-[border-color,box-shadow]',
            'placeholder:text-on-surface-variant/70 focus:border-ai-accent focus:border-2 focus:shadow-focus',
            error && 'border-error focus:border-error',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={helperText || error ? `${id}-message` : undefined}
          {...props}
        />
        {helperText || error ? (
          <p
            id={`${id}-message`}
            className={cn('text-body-sm', error ? 'text-error' : 'text-on-surface-variant')}
          >
            {error || helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
